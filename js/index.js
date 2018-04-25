/******************************************
 * @description 添加表格内容到父级ifram的对象
 * @param clickBtn 事件触发按钮(必填)
 * @param tableName 操作的表(必填)
 * @param fatherIframe 父级iframe(必填)
 * @param table 全局table(必填)
 * @param parent 全局parent(必填)
 * @method bind 事件触发方法
 * @author cjh
 *******************************************/
var addInfoFromTableToIframe = {
    table: null,
    parent: null,
    clickBtn: null,
    tableName: null,
    fatherIframe: null,
    catchArr: [],
    init: function (config) {
        this.clickBtn = $(config.clickBtn);
        this.tableName = config.tableName;
        this.fatherIframe = config.fatherIframe;
        this.table = config.table;
        this.parent = config.parent;
        return this;
    },
    bind: function () {
        var self = this;
        this.clickBtn.on('click', function () {
            var checkStatus = self.table.checkStatus(self.tableName);
            var data = checkStatus.data;
            console.log(data);
            self.render(data);
        })
    },
    getFinalData: function (data) {
        var catchArr = [];
        for (let i = 0; i < data.length; i++) { //遍历获取id
            catchArr.push({
                'id': data[i]['group_id'],
                'name': data[i]['group_name']
            });
        }
        return catchArr;
    },
    render: function (data) {
        var catchArr = this.getFinalData(data);
        fatherIframe = this.fatherIframe;
        var domStr = '<div class="item"><button class="layui-btn layui-btn-primary layui-btn-sm"><i class="layui-icon"></i></button></div>';
        this.parent.userArr = parent.unique(parent.userArr.concat(catchArr)); //更新父层ifream，存储数据
        this.fatherIframe.empty();
        for (var i = 0; i < this.parent.userArr.length; i++) {
            domStr = '<div class="layui-inline item userItm"><span class="itemId" style="display:none">' + parent.userArr[i].id + '</span><span style="margin-right:5px">' + parent.userArr[i].name + '</span><button id="delBtn_u" class="layui-btn layui-btn-primary layui-btn-sm"><i class="layui-icon" style="font-size:12px"></i></button></div>';
            this.fatherIframe.append(domStr);
        }
    }

}
/******************************************
 * @description 表格内容去重
 * @method ins
 * @method removeItem
 * @method unique
 *******************************************/
function ins(arr, e) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == e) return i;
    }
    return -1;
}
function removeItem(arr, e) {
    var index = ins(arr, e);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
function unique(array) {
    itemToStrArr = array.map(function (i) {
        return JSON.stringify(i);
    })
    var n = [];
    for (let i = 0; i < itemToStrArr.length; i++) {
        if (n.indexOf(itemToStrArr[i]) == -1) {
            n.push(itemToStrArr[i]);
        }
    }
    return n.map(function (i) {
        return JSON.parse(i);
    })
}

