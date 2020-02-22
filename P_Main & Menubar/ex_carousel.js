FlowRouter.template('/ex_carousel', 'ex_carousel');

Template.ex_carousel.onRendered(function() {

    Session.set('tag', ''); // 실행 순서 1 : 시작하자마자 가장 먼저 실행되는 함수. tag가 빈 String으로 초기화
    Session.set('picture_link', '');
    Session.set('link_id', '');

});

var count = 0;

// "Session은 변수 공유" 줠라 중요
// 디버깅 할 때, 항상 Console 창 켜놓고 코딩하기 그리고 주석 쳐가면서 어디가 오류인지 항상 확인해보기

// 내가 실수했던 점 (핵심 : Session이랑 디버깅 연습)
// 1. events에서 받은 변수를 helpers에서 받을 생각을 하니까 잘 안됬음.
// 2. Session은 변수를 공유해주는 역할이어서 Session을 통해 events에 있는 변수를 helpers에서 사용할 수 있게 됨.
// 3. find에서 Session을 쓰는 이유는 tag라는 Session에 input 값을 받아놨기 때문에 사용할 수 있고, 그냥 input 값을 넣어버리면 변수 공유가 안 되기 때문에 Session을 사용해야 함.
// 4. html 코드에서 input 창을 감싸고 있는게 <form>이었는데 <form> 형식으로 받으니까 새로고침이 되고 받은 데이터가 다시 사라져버림. <form> 태그의 역할 자세히 다시 찾아보기

Template.ex_carousel.helpers({
    tags: function() {

        // return DB_PIC.find({tags: '야경'}).fetch(); // 이런 형식으로 들어가야 함!!
        return DB_PIC.find({tags: Session.get('tag')}).fetch(); // Session으로 들어가야하네...중요 왜? 이유 알기
                                                                // 실행 순서 3 : 화면이 그려질 때 실행되는 함수. Session 값을 받아올 수 있음. Session은 순서 상관없이 언제든지 값을 즉각즉각 받아올 수 있다는 것이 가장 큰 장점
    },
    link: function() {
        return DB_FILES.findOne({_id: this.file_id}).link();
    },
    
    link_id: function() {
        return Session.get('link_id'); 
    },

    modal_picture: function() {
        return Session.get('picture_link');
    },
});

Template.ex_carousel.events({
    'keyup #inp-search': function(evt) {
        if(evt.which === 13){
            Session.set('tag', $('#inp-search').val()); // 실행 순서 2 : enter키가 눌려지면 실행되는 함수. tag라는 Session 값이 input값으로 set됨
        }
    },
    'click #mybtn': function(evt) {
        Session.set('link_id', this._id);
        Session.set('picture_link', $(evt.target).parent().attr('value')); // this
        var modal = document.getElementById('myModal');
        var btn = document.getElementById("mybtn");
        modal.style.display = "block";
      },
      'click #myclose': function() {
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("myclose"); 
        modal.style.display = "none";
      },
});