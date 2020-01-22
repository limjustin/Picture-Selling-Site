FlowRouter.template('/ex_navbar', 'ex_navbar');

Template.ex_mypagepost.onCreated(function() {
    var _id = FlowRouter.getParam('_id')
});

Template.ex_navbar.helpers({
    link: function() { // 얘가 여기 있어야해?
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.file_id}).link();
    }
});

// 만약에 있으면 링크 첫번째 꺼를 불러오고
// 만약에 없으면 그냥 mypage창