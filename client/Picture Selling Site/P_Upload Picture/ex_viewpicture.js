FlowRouter.template('/ex_viewpicture/:_id', 'ex_viewpicture');

Template.ex_viewpicture.onCreated(function() {
  var _id = FlowRouter.getParam('_id')
});

Template.ex_viewpicture.helpers({
  board: function() {
    var _id = FlowRouter.getParam('_id')
    return DB_PIC.findOne({_id: _id}); // DB_PIC에 올린 사진 정보를 불러오는 역할.
  },
  link: function() {
    return DB_FILES.findOne({_id: this.file_id}).link(); // 사진 링크 불러오기.
  },
});