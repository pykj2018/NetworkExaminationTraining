
/**
 * @description 富文本设置
 * @method init 初始化
 * @method getContent 获取富文本内容
 */
var editorConfig = {
    config: null,
    E: window.wangEditor,
    editor: null,
    _create: function (config) {
        var editor = this.editor;
        editor = new this.E(config);
        // editor.customConfig.uploadImgServer = '/upload'
        editor.customConfig.zIndex = 1;
        editor.customConfig.height = '150';
        editor.customConfig.uploadImgShowBase64 = true;
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

// $('.layui-card-header').on('click', function () {
//     editorConfig.getContent();
// })