FlowRouter.template('/ex_uploadpicture', 'ex_uploadpicture');

Template.ex_uploadpicture.onRendered(function() {
  
  // tag_arr을 빈 String 으로 만들어주기
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

var count = 0;

Template.ex_uploadpicture.helpers({
  tag_list: function() { // 전체 Session을 다 띄워주는 역할
    return Session.get('tag_arr'); // 전체 세션
  },

  name: function() { // 받은 tag의 Session만 바로바로 띄워주는 역할
    return $('#inp-tag').val(); // 부분 세션
  },

  count: function() { // 들어갈때 마다 매번 인덱스가 1씩 증가해야함
    return count++;
  },
});

Template.ex_uploadpicture.events({
  'click #btn-save-tag': function(){    
    // tag_arr : 처음 배열
    // tag_update : 입력된 태그 값들이 들어가는 업데이트된 배열
    var tag_update = Session.get('tag_arr'); // 태그 등록 버튼을 누르면 태그에 Session값 저장. 처음에는 빈 배열
    tag_update.push($('#inp-tag').val()); // input 값을 가져와서 빈 배열(태그)에 추가(push)
    Session.set('tag_arr', tag_update); // Session 값을 업데이트
  },

  'click #btn-remove-tag': function(evt) {
    // 아이디어
    // 1. 해당하는 태그 값을 가져와야 함
    // 2. 세션에서 ★해당하는 태그 값★을 지워야함
    // 3. 세션 빈 배열 없이 다시 업데이트
    var tag_update = Session.get('tag_arr');
    tag_update.splice(tag_update.indexOf($(evt.target).attr('value')),1); // indexOf로 선택한 태그의 이름을 가진 배열을 찾아와 제거했다!!
                      // 뜻 : tag_update에서 $(evt.target).attr('value')와 똑같은 이름을 가진 원소를 찾아 제거하세요!!
    Session.set('tag_arr', tag_update);
  },

  'click #btn-save': function(evt, inst) {
    evt.preventDefault();
    var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기
    var file_id = DB_FILES.insertFile(file);

    // 사진 부가 설명 저장
    var name = $('#inp-name').val();
    var price = $('#inp-price').val();
    var place = $('#inp-place').val();
    var introduce = $('#inp-introduce').val();

    var tag_update = Session.get('tag_arr');
    Session.set('tag_arr', tag_update);
    DB_PIC.insert({
      createdAt: new Date(),
      file_id: file_id,
      name: name,
      tags: tag_update, // 최종 tag의 Session을 담는다!!
      price: price,
      place: place,
      introduce: introduce,
      userInfo: Meteor.user().emails[0].address // 사용자 이메일은 바로 저장할 수 밖에 없음...
    });

    // 저장 후 화면 정리
    $('#inp-file').val('');
    $('#inp-name').val('');
    $('#inp-tags').val('');
    $('#inp-price').val('');
    $('#inp-place').val('');
    $('#inp-introduce').val('');
    alert('저장하였습니다.');
    FlowRouter.go('/ex_carousel')
  },
});

// 좀 중요한 거 정리 //
// $(evt.target).attr('count') // 지금 눌려진 녀석
// // 현재 눌러진 버튼을 가져와
// // 거기에 count를 가져오고
// // 전체에 몇번째인지 알 수 있음
