FlowRouter.template('/ex_mypage/:_id', 'ex_mypage');

Template.ex_mypage.onCreated(function() {
  var _id = FlowRouter.getParam('_id')
  DB_POSTS.update({_id: _id}, {
    $inc: {readCount: 1}  //조회수 1 증가 업데이트
  });
});

Template.ex_mypage.helpers({
  board: function() {
    var _id = FlowRouter.getParam('_id')
    return Meteor.users.findOne({_id: _id});
  },
  link: function() {
    return Meteor.user().profile.profile_picture;
  },
  name: function() {
    return Meteor.user().profile.name;
  },
  title: function() {
    return Meteor.user().profile.introduce;
  }
});

