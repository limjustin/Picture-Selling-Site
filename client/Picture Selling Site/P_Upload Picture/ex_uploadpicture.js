FlowRouter.template('/ex_uploadpicture', 'ex_uploadpicture');

Template.ex_uploadpicture.onRendered(function() {
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
  }
});

Template.ex_uploadpicture.events({
  'click #btn-save': function(evt, inst) {
    // 파일 먼저 저장
    var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
    var file_id = DB_FILES.insertFile(file);

    // 사진 부가 설명 저장
    var name = $('#inp-name').val();
    var tags = $('#inp-tags').val();
    var price = $('#inp-price').val();
    var place = $('#inp-place').val();
    var introduce = $('#inp-introduce').val();

    // DB 저장 시 파일의 _id와 name을 함께 저장
    DB_PIC.insert({    // 컨텐츠 DB에 저장
      createdAt: new Date(),          // 저장 시각
      file_id: file_id,                // 저장 된 파일의 _id
      name: name,
      tags: tags,
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