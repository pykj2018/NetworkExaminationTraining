
// 实例化编辑器
var editorConfig = {
    config: null,
    E: window.wangEditor,
    editor: null,
    _create: function (config) {
        var editor = this.editor;
        editor = new this.E(config);
        editor.create();
    },
    init: function (config) {
        this._create(config);
        return this;
    },
    getContent: function () {
        var con = this.editor.txt.html();
        console.log(con);
    }
}
editorConfig.init('#myEditor');
$('.layui-card-header').on('click', function () {
    editorConfig.getContent();
})