
/**
 * @description 富文本设置
 * @method init 初始化
 * @method getContent 获取富文本内容
 */
function EditorConfig(config) {
    this.config = config;
    this.E = window.wangEditor;
    this.editor = new this.E(config);
    this._create = function () {
        // this.editor.customConfig.uploadImgServer = '/upload'
        this.editor.customConfig.zIndex = 1;
        this.editor.customConfig.height = '150';
        this.editor.customConfig.uploadImgShowBase64 = true;
        this.editor.create();
    }
    this.getContent = function () {
        var con = this.editor.txt.html();
        // console.log(con)
        return con;
    }
}
