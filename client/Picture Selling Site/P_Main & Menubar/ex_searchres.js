FlowRouter.template('/ex_searchres', 'ex_searchres');

Template.ex_searchres.helpers({
    lists: function() {
        // CONTENTS 데이터베이스를 화면에 전달
        // return DB_PIC.find({tags: '야경'}).fetch();
        return DB_PIC.find({tags: '야경'}).fetch();
    },
    createdAt: function() {
        // 화면에 보이는 날짜 데이터를 정해진 포맷으로 변환하여 전달
        return this.DB_PIC.createdAt.toStringHMS();
    },
    link: function() {
        // 저장 된 이미지 링크를 반환함
        return DB_PIC.findOne({_id: this.file_id}).link();
    }
});

Template.ex_searchres.events({
    'keyup #inp-search': function(evt, tmpl) {
        if (evt.which === 13) {
          var searchtemp = $('#inp-search').val();
          evt.preventDefault();
          return $('[name=btnSearch]').trigger('click');
        }
    }
});