FlowRouter.template('/ex_cashcharge','ex_cashcharge');

Template.ex_cashcharge.helpers({
    board: function() {
        var _id = FlowRouter.getParam('_id')
        return Meteor.users.findOne({_id: _id}); // users랑 user()의 차이점?
      },
      link: function() {
        // return DB_FILES.findOne({_id: this.file_id}).link();
        return Meteor.user().profile.profile_picture; // 일단 .link() 붙는걸로 가자
      },
      name: function() {
        return Meteor.user().profile.name;
      },
      cash: function() {
        return Meteor.user().profile.cash;
      }
  });

  Template.ex_cashcharge.events({
    'click #mybtn': function() {
      var modal = document.getElementById('myModal');
      var btn = document.getElementById("mybtn");
      modal.style.display = "block";
    },
    'click #myclose': function() {
      var modal = document.getElementById('myModal');
      var span = document.getElementsByClassName("myclose")[0]; 
      modal.style.display = "none";
    },
    'click #btn-charge': function() {
      var input_cash = $('#inp-cash').val(); // input 값을 input_cash 변수에 저장

      // 메인화면에서...
      // 사진 id를 가져와서 사진만 띄우면 됨.

      var userInfo = Meteor.user();
      var temp = parseInt(Meteor.user().profile.cash) + parseInt(input_cash);
      Meteor.users.update({_id: userInfo._id}, {
        $set: {
          'profile.cash': temp
        }
      });

      $('#inp-cash').val(''); // input 창 정리
    }
  });