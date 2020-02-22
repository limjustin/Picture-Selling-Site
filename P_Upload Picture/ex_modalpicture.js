FlowRouter.template('/ex_modalpicture/:_id', 'ex_modalpicture');

Template.ex_modalpicture.onCreated(function() {
  var _id = FlowRouter.getParam('_id')
  Session.set('cart', []);
});

Template.ex_modalpicture.helpers({
  board: function() {
    var _id = FlowRouter.getParam('_id')
    return DB_PIC.findOne({_id: _id}); // DB_PIC에 올린 사진 정보를 불러오는 역할.
  },
  link: function() {
    return DB_FILES.findOne({_id: this.file_id}).link(); // 사진 링크 불러오기.
  },
  // userInfomation: function() {
  //   var _id = FlowRouter.getParam('_id');
  //   var info = DB_PIC.findOne({_id: _id}).userInfo; // userInfo 앞은 사진을 선택했다는 의미. 선택한 사진 사용자 아이디
  //   return Meteor.users.findOne({_id: info}).emails[0].address; // 현재 로그인 된 것만 가져올 수 있네...
  //   // return db.getCollection('users').find({_id: info}).emails[0].address;
  //   // return info;
  // }
});

Template.ex_modalpicture.events({
  'click #btn-cart': function() {
    // update는 쓰면 안 될거 같은데?
    // 하나를 수정하고 빼고 수정하고 빼는게 아니라 여러개를 넣어야 하니까...
    var userInfo = Meteor.user(); // 사용자 정보 가져오기
    var cart_update = Session.get('cart');
    cart_update.push(this._id);
    Session.set('cart', cart_update);
    Meteor.users.update({_id: userInfo._id}, {
      $push: {
        'profile.cart': this._id
      }
    });
    alert('장바구니에 등록되었습니다.');
  }
});