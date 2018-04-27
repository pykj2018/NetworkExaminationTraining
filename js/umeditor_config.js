
//实例化编辑器
var umConfig = {
    um: UM.getEditor('myEditor'),
    getContent: function () {
        var arr = [];
        arr.push("使用editor.getContent()方法可以获得编辑器的内容");
        arr.push("内容为：");
        arr.push(UM.getEditor('myEditor').getContent());
        alert(arr.join("\n"));
    }
}
umConfig.um;
