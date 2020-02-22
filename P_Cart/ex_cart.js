FlowRouter.template('/ex_cart','ex_cart'); // 아이디 붙어야 되나...? 메테오 불러올꺼니까 안해도 될 듯?

Template.ex_cart.onRendered(function() {
  Session.set('init_cart_session', []); // 배열의 선택 유무
  Session.set('sum', 0); // 전체 가격
  Session.set('init_remove_arr', []); // 배열 삭제할 때 쓰는 배열 // 왜애애 다른 메뉴 갔다오면 이러는 거야 왜 안보이는 거야
});

var index = 0;
var cart_number = 1;

Template.ex_cart.helpers({
  cart: function() {
    Session.set('init_remove_arr', Meteor.user().profile.cart); // 장바구니에 모든 장바구니 원소들 추가
    // console.log(Session.get('initial_arr'));
    return Meteor.user().profile.cart; // 장바구니 정보 가져오고... 거기에 이제 가져온 정보에 정보를 가져와야 함
  },
  incart: function() {
    var userInfo = Meteor.user().profile;
    return DB_PIC.findAll({_id: userInfo.cart[index++]}); // index는 후위증가!! 불러온 장바구니 id를 배열 index 돌려서 찾기!!
  },
  link: function() {
    return DB_FILES.findOne({_id: this.file_id}).link(); // 사진 링크 불러오기.
  },
  cart_number: function(){
    return cart_number++;
  },
  sum: function() {
    return Session.get('sum');
  }
});

Template.ex_cart.events({
  'click #btn-remove': function() {
    if(confirm('삭제 하시겠습니까?')) {
      DB_POSTS.remove({_id: this._id}); // 현재 어떤 줄에 속해있는지 아니까
      alert('삭제 되었습니다.');
    }
  },

  'click #input_check': function(evt) {
    if ( $(evt.target).prop('checked') ) { 

      // 영서 보기 쉽게 주석 나중에 다 써주기 + 구분도 보기 쉽게 지어놓기 + 코드 깔끔하게
     
      // 체크한 것의 id를 세션에 저장
      // console.log("checked");
      // console.log($(evt.target).attr('value'))
      var update_cart_session = Session.get('init_cart_session');
      update_cart_session.push($(evt.target).attr('value1'));
      Session.set('init_cart_session', update_cart_session);

      var update_remove_arr = Session.get('init_remove_arr');
      update_remove_arr.splice(update_remove_arr.indexOf($(evt.target).attr('value1')),1);
      Session.set('init_remove_arr', update_remove_arr);
      console.log(Session.get('init_remove_arr'));
      
      // 0 값을 세션에 저장
      var cash = $(evt.target).attr('value2');
      Session.set('sum', Session.get('sum') + parseInt(cash));
      // console.log(Session.get('sum'));
      // console.log(Session.get('sum'));
      // console.log(parseInt(cash));
      // console.log(parseInt($(evt.target).attr('value2')));
      // console.log(parseInt($(evt.target).attr('value2'))+parseInt($(evt.target).attr('value2')));
      // console.log(Session.get('cart_session'));

    } else { 
      // 체크한 것의 id를 찾아서 세션에서 제거 // indexOf 그거 쓰면 될 듯
      // console.log("unchecked"); 
      var update_cart_session = Session.get('init_cart_session');
      update_cart_session.splice(update_cart_session.indexOf($(evt.target).attr('value1')),1);
      Session.set('init_cart_session', update_cart_session);

      var update_remove_arr = Session.get('init_remove_arr');
      update_remove_arr.push($(evt.target).attr('value1')); // 순서 섞이지만 딱히 상관은 없을 듯...
      Session.set('init_remove_arr', update_remove_arr);
      console.log(Session.get('init_remove_arr'));

      var cash = $(evt.target).attr('value2');
      Session.set('sum', Session.get('sum') - parseInt(cash));
      // console.log(Session.get('sum'));
      // console.log(Session.get('cart_session'));
    }
  },

  // 'click #btn-buyincart': function() {
  //   var userInfo = Meteor.user(); // 사용자 정보 가져오기
  //   Meteor.users.update({_id: userInfo._id}, {
  //     $set: {
  //       'profile.cart': Session.get('init_remove_arr')
  //     }
  //   });
  //   alert('구매를 완료하였습니다.');
  // },
  
});
