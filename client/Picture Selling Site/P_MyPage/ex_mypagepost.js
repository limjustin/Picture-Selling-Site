FlowRouter.template('/ex_mypagepost/:_id', 'ex_mypagepost');

Template.ex_mypagepost.onCreated(function() {
  var _id = FlowRouter.getParam('_id')
  DB_POSTS.update({_id: _id}, {
    $inc: {readCount: 1}  //조회수 1 증가 업데이트
  });
});

Template.ex_mypagepost.helpers({
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