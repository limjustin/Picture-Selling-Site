FlowRouter.template('/ex_uploadpicture', 'ex_uploadpicture');

Template.ex_uploadpicture.onRendered(function() {
  Session.set('tag_arr', []);
  var upload = document.querySelector('#inp-file');
  var upload2 = document.querySelector('#preview');

   /* FileReader 객체 생성 */
  var reader = new FileReader();

      /* reader 시작시 함수 구현 */
  reader.onload = (function () {

      this.image = document.createElement('img');
      var vm = this;
      
      return function (e) {
          /* base64 인코딩 된 스트링 데이터 */
          vm.image.src = e.target.result
      }
  })()

  upload.addEventListener('change',function (e) {
      var get_file = e.target.files;

      if(get_file){
          reader.readAsDataURL(get_file[0]);
      }

      preview.appendChild(image);
  })

});

Template.ex_uploadpicture.helpers({
  contents: function() {
    // CONTENTS 데이터베이스를 화면에 전달
    return DB_UPLOAD.findAll();
  },
  createdAt: function() {
    // 화면에 보이는 날짜 데이터를 정해진 포맷으로 변환하여 전달
    return this.createdAt.toStringHMS();
  },
  link: function() {
    // 저장 된 이미지 링크를 반환
    return DB_FILES.findOne({_id: this.file_id}).link();
  },
  tag_list: function() { // 전체 Session을 다 띄워주는 역할
    // return Session.get(tag_update);
    return Session.get('tag_arr'); // 이게 아마 전체 세션 인듯
  },
  name: function() { // 받은 tag의 Session만 바로바로 띄워주는 역할
    return $('#inp-tag').val(); // 이거는 부분 세션
  },
});

Template.ex_uploadpicture.events({
  'click #btn-save-tag': function(){
    var tag_update = Session.get('tag_arr'); // 태그 등록 버튼을 누르면 tag에 session값 저장 처음에는 빈 배열
    tag_update.push($('#inp-tag').val()); // input 값을 가져와서 빈 배열 tag에 추가
    Session.set('tag_arr', tag_update); // Session 값을 tag로 대체
  },

  'click #btn-remove-tag': function() {
    // 1. 해당하는 태그 값을 가져와야 함
    // 2. 세션에서 해당하는 태그 값을 지워야함
    // 3. 세션 빈 배열 없이 다시 업데이트
    var tag_update = Session.get('tag_arr');
    tag_update.pop();
    Session.set('tag_arr', tag_update);

    // 정 안되면 대체해도 됨 '' 이거로 근데 아마 검색할 때 걸릴꺼야 // 전체 검색도 가능할 듯?
  },

  'click #btn-save': function(evt, inst) {
    // 파일 먼저 저장
    var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
    var file_id = DB_FILES.insertFile(file);

    // 사진 부가 설명 저장
    var name = $('#inp-name').val();
    // var tags = $('#inp-tags').val();
    var price = $('#inp-price').val();
    var place = $('#inp-place').val();
    var introduce = $('#inp-introduce').val();

    var tag_update = Session.get('tag_arr');
    Session.set('tag_arr', tag_update);

    // DB 저장 시 파일의 _id와 name을 함께 저장
    DB_PIC.insert({    // 컨텐츠 DB에 저장
      createdAt: new Date(),
      file_id: file_id,
      name: name,
      tags: tag_update, // 최종 tag의 Session을 담아
      price: price,
      place: place,
      introduce: introduce
    });

    // 저장 후 화면 정리
    $('#inp-file').val('');
    $('#inp-name').val('');
    $('#inp-tags').val('');
    $('#inp-price').val('');
    $('#inp-place').val('');
    $('#inp-introduce').val('');
    alert('저장하였습니다.');
  },
  'click #btn-remove': function() {
    if(confirm('삭제 하시겠습니까?')) {
      DB_UPLOAD.remove({_id: this._id});  // 선택 컨텐츠를 DB에서 삭제
      alert('삭제 되었습니다.');
    }
  }
});