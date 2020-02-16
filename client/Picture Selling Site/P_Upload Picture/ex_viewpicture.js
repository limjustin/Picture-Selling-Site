FlowRouter.template('/ex_viewpicture/:_id', 'ex_viewpicture');

Template.ex_viewpicture.onCreated(function() {
  var _id = FlowRouter.getParam('_id')
});

Template.ex_viewpicture.helpers({
  board: function() {
    var _id = FlowRouter.getParam('_id')
    return DB_PIC.findOne({_id: _id});
  },
  link: function() {
    // 사진 불러오는 코드
    return DB_FILES.findOne({_id: this.file_id}).link();
  },
});