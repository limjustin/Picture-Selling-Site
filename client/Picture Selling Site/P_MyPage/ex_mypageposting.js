FlowRouter.template('/ex_mypageposting/:_id', 'ex_mypageposting');


Template.ex_mypageposting.onRendered(function() {
  $('#editor').summernote({
    popover: {},
    minHeight: 200,
    maximumImageFileSize: 1048576*10
  });
});

Template.ex_mypageposting.helpers({
  post: function() {
    var _id = FlowRouter.getParam('_id'); // FlowRouter.getParam 사실 이해 안감
    if(_id === 'newPosting') {
      return {};    //새글 작성일때는 화면에 비어있는 데이터를 제공.
    }

    Meteor.setTimeout(function() { //화면 에디터에 편집 모드를 초기화 하기 위한 트릭
      $('#editor').summernote('reset')
    });

    return Meteor.users.findOne({_id: _id});
  },
  link: function() { // 저장된 이미지 링크 반환
    return Meteor.user().profile.profile_picture.link();
  }
});

Template.ex_mypageposting.events({
  'click #btn-save': function() {
    var file = $('#inp-file').prop('files')[0];
    var file_id = DB_FILES.insertFile(file);
    var name = $('#inp-name').val();
    var title = $('#inp-title').val();

    if(!title) {
      return alert('제목은 반드시 입력 해 주세요.');
    }
    var _id = FlowRouter.getParam('_id');
    if( _id === 'newPosting') {

    } else { // newPosting 아니니까 여기로 항상 실행되네 이거는 확인
      // var post = Meteor.users.findOne({_id: _id});
      // post.profile.profile_picture = file_id;
      // post.profile.name = name;
      // post.profile.introduce = title;

      // // Meteor.user().profile.update(this_id, {$set : {profile_picture: file_id, name: name, introduce: title}}); // Meteor.users.profile을 66번째줄이랑 맞춰줘야할지 고민
      // // DB_POSTS.update({_id: _id}, post);
      // Meteor.user().profile.update({_id: Meteor.userId()},{$set : {profile_picture: file_id, name: name, introduce: title}});

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var userInfo = Meteor.user();
      Meteor.users.update({_id: userInfo._id}, {
        $set: {
          'profile.profile_picture': file_id,
          'profile.name': name,
          'profile.introduce': title
        }
      });

    }

    alert('저장하였습니다.');
    $('#inp-file').val(''); // 이거 추가
    $('#inp-name').val('');
    $('#inp-title').val('');
    $('#editor').summernote('reset');
    window.history.back();
  },
})