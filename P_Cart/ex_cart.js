FlowRouter.template('/ex_cart','ex_cart'); // 아이디 붙어야 되나...? 메테오 불러올꺼니까 안해도 될 듯

Template.ex_cart.onRendered(function() {
  Session.set('sum', 0); // 장바구니에 있는 사진들 가격 합 구할 수 있게 해주는 세션
  Session.set('init_cart_session', []); // checkbox와 연관해서 쓰는 세션, 배열을 선택하는 세션
  Session.set('init_remove_arr', []); // "전체 장바구니 배열"이라고 보면 된다!!
});

var index = 0;
var cart_number = 1;

// 아이디어 //
// init_cart_session은 "checkbox 누른 사진 가격들의 총합을 구할 수 있게" 만들어 놓은 세션

// 아이디어 //
// init_remove_arr은 예를들어 A,B,C,D,E 5개중에서 A,D,E 를 구매했다고 하면 장바구니에는 B,C 가 남아야 한다.
// 따라서, init_remove_arr에 처음에는 A,B,C,D,E 5개가 모두 들어가 있고, checkbox를 선택할 때 마다 선택한 요소가 빠지게 하였다.
// A,D,E를 클릭했다면 A,B,C,D,E에서 A,D,E 가 빠지고 B,C 만 남게 되며, 최종적으로 구매하기 버튼을 눌렀을 때 init_remove_arr에는 B,C 만 남게 된다.
// 결과적으로 B,C 만 남아있는 배열을 우리가 등록한 유저정보(Meteor.user().profile.cart)에 저장하는 것이당 (init_cart_session의 반대라고 생각하면 편해)
// 정리 : init_remove_arr이 장바구니DB라고 생각하고, 체크된 상태일때는 구매만 하면 장바구니 DB에서 나갈꺼니까 "체크된 상태일 때는 제외한다" 라고 생각하면 편할꺼야

Template.ex_cart.helpers({
  cart: function() { // 장바구니 불러오기
    Session.set('init_remove_arr', Meteor.user().profile.cart); // 장바구니에 모든 장바구니 원소들 추가
    return Meteor.user().profile.cart; // 장바구니 정보 가져오고... 거기에 이제 가져온 정보(장바구니)의 정보(장바구니 내 요소)를 가져와야 함
  },

  incart: function() { // 장바구니 내 각각의 요소들 하나씩 짚어가기
    var userInfo = Meteor.user().profile; // 유저정보 불러오고 
    return DB_PIC.findAll({_id: userInfo.cart[index++]}); // cart는 배열로 저장되어 있으므로, 인덱스를 0부터 늘려가면서 각각 요소들의 정보를 전부 뽑아오기 
                                                          // index는 위에서 0으로 초기화해줬고, 후위증가 해야함!!
  },

  link: function() {
    return DB_FILES.findOne({_id: this.file_id}).link(); // 사진 링크 불러오기.
  },

  cart_number: function(){ // 장바구니 순서
    return cart_number++;
  },

  sum: function() { // checkbox 선택한 것들의 합을 return 하는 함수
    return Session.get('sum');
  },
});

Template.ex_cart.events({
  'click #input_check': function(evt) {
    if ( $(evt.target).prop('checked') ) {  // 뜻 : 누른 이벤트의 체크박스 상태가 'checked' 되어 있을 때 즉, 값이 1이라고 보면 돼     

      // 체크 한 상태일때는 Session 배열에 추가!!
      var update_cart_session = Session.get('init_cart_session');
      update_cart_session.push($(evt.target).attr('value1')); // value1에는 id를 저장해 두었음
      Session.set('init_cart_session', update_cart_session);

      // 체크 한 상태일때는 구매할거니까 즉, 장바구니 DB에서 나갈꺼니까 제거
      var update_remove_arr = Session.get('init_remove_arr');
      update_remove_arr.splice(update_remove_arr.indexOf($(evt.target).attr('value1')),1);
      Session.set('init_remove_arr', update_remove_arr);
      
      // 선택한 사진들 가격 총합 구하기
      var cash = $(evt.target).attr('value2'); // value2에는 사진 가격을 저장해 두었음
      Session.set('sum', Session.get('sum') + parseInt(cash));

    } else {  // 뜻 : 누른 이벤트의 체크박스 상태가 'checked' 되어 있지 않을 때 즉, 값이 0이라고 보면 돼 
      
      // 체크 안한 상태일때는 Session 배열에서 삭제!!
      var update_cart_session = Session.get('init_cart_session');
      update_cart_session.splice(update_cart_session.indexOf($(evt.target).attr('value1')),1);
      Session.set('init_cart_session', update_cart_session);

      // 체크 안 한 상태일때는 아직 구매 안할꺼니까, 장바구니 DB에 남아 있어야겠지??
      var update_remove_arr = Session.get('init_remove_arr');
      update_remove_arr.push($(evt.target).attr('value1')); // 순서 섞이지만 딱히 상관은 없을 듯...
      Session.set('init_remove_arr', update_remove_arr);

      // 선택 안 한 사진들의 가격은 총합에서 빼야 되겠지??
      var cash = $(evt.target).attr('value2');
      Session.set('sum', Session.get('sum') - parseInt(cash));

    }
  },

  'click #btn-buyincart': function() { // 이 코드 고쳐야 함!!
    var userInfo = Meteor.user(); // 사용자 정보 가져오기
    Meteor.users.update({_id: userInfo._id}, {
      $set: {
        'profile.cart': Session.get('init_remove_arr') // 왜 안보일까...
      }
    });
    alert('구매를 완료하였습니다.');
  },
  
});
