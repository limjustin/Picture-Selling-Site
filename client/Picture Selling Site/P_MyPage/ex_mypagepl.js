FlowRouter.template('/ex_mypagepl/:_id', 'ex_mypagepl');

Template.ex_mypagepl.helpers({
  board: function() {
    var _id = FlowRouter.getParam('_id')
    return Meteor.picture.findOne({_id: _id}); // users랑 user()의 차이점?
  },
  link: function() {
    // return DB_FILES.findOne({_id: this.file_id}).link();
    return Meteor.picture().file_id;
  }
});


// Template.ex_carousel.helpers({
//   tags: function() {
//       // return DB_PIC.find({tags: '야경'}).fetch(); // 이런 형식으로 들어가야 함!!
//       return DB_PIC.find({tags: Session.get('tag')}).fetch(); // Session으로 들어가야하네...중요 왜? 이유 알기
//    // 실행 순서 3 : 화면이 그려질 때 실행되는 함수. Session 값을 받아올 수 있음. Session은 순서 상관없이 언제든지 값을 즉각즉각 받아올 수 있다는 것이 가장 큰 장점
//   },
//   link: function() {
//       return DB_FILES.findOne({_id: this.file_id}).link(); // 왜 DB_FILES임?
//   }
// });

// Template.ex_mypage.helpers({
//   board: function() {
//     var _id = FlowRouter.getParam('_id')
//     return Meteor.users.findOne({_id: _id}); // users랑 user()의 차이점?
//   },
//   link: function() {
//     // return DB_FILES.findOne({_id: this.file_id}).link();
//     return Meteor.user().profile.profile_picture;
//   },
//   name: function() {
//     return Meteor.user().profile.name;
//   },
//   title: function() {
//     return Meteor.user().profile.introduce;
//   }
  
// });