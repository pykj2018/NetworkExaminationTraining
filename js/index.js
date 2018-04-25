/******************************************
 * @description 添加表格内容到父级ifram的对象
 * @param clickBtn 事件触发按钮(必填)
 * @param tableName 操作的表(必填)
 * @param fatherIframe 父级iframe(必填)
 * @param table 全局table(必填)
 * @param parent 全局parent(必填)
 * @param dId 绑定的删除按钮id
 * @param arr 操作的数组名称，需跟数组名称一样，不可以自定义
 * @param $ layui内的jq对象 如果没有则在调用页面引入jq即可
 * @method bind 事件触发方法
 * @author cjh
 *******************************************/
//数组存在object对象里 方便多页面的数组管理和调用 成不成你觉得？
var object = {
    userArr: [],
    departmentArr: []
}

var addInfoFromTableToIframe = {
    table: null,
    parent: null,
    clickBtn: null,
    tableName: null,
    fatherIframe: null,
    dId: null,
    arr: null,
    $: null,
    catchArr: [],
    init: function(config) {
        this.$ = config.$;
        this.clickBtn = this.$(config.clickBtn);
        this.tableName = config.tableName;
        this.fatherIframe = config.fatherIframe;
        this.dId = config.dId;
        this.arr = config.arr;
        this.table = config.table;
        this.parent = config.parent;
        return this;
    },
    bind: function() {
        var self = this;
        this.clickBtn.on('click', function() {
            var checkStatus = self.table.checkStatus(self.tableName);
            var data = checkStatus.data;
            self.render(data);
        })
    },
    getFinalData: function(data) {
        var catchArr = [];
        for (let i = 0; i < data.length; i++) { //遍历获取id
            catchArr.push({
                'id': data[i].id,
                'name': data[i].title
            });
        }
        return catchArr;
    },
    render: function(data) {
        var catchArr = this.getFinalData(data);
        this.parent.object[this.arr] = this.unique(this.parent.object[this.arr].concat(catchArr)); //更新父层ifream，存储数据
        this.fatherIframe.empty(); //清空父元素，重新写入
        for (var i = 0; i < this.parent.object[this.arr].length; i++) {
            domStr = '<div class="layui-inline item userItm"><span class="itemId" style="display:none">' +
                this.parent.object[this.arr][i].id + '</span><span style="margin-right:5px">' +
                this.parent.object[this.arr][i].id + '</span><button id="' +
                this.dId + '" class="layui-btn layui-btn-primary layui-btn-sm"><i class="layui-icon" style="font-size:12px"></i></button></div>';
            this.fatherIframe.append(domStr);
        }
    },
    //验证去重
    unique: function(array) {
        itemToStrArr = array.map(function(i) {
            return JSON.stringify(i);
        })
        var n = [];
        for (let i = 0; i < itemToStrArr.length; i++) {
            if (n.indexOf(itemToStrArr[i]) == -1) {
                n.push(itemToStrArr[i]);
            }
        }
        return n.map(function(i) {
            return JSON.parse(i);
        })
    }

}

function getFatherIframeContentDepartment() {
    var parentIframe = $('#parentIframeDepartment'),
        allReceiveDepartment = [],
        itemId = parentIframe.find(".itemId");
    for (var i = 0; i < itemId.length; i++) {
        allReceiveDepartment.push(itemId.eq(i).text());
    }
    if (allReceiveDepartment.length === 0) {
        return false;
    } else {
        console.log(allReceiveDepartment);
        return allReceiveDepartment;
    }
};

//删除子项 arr格式为数组对象 对比属性为id
function removeItem(arr, e) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == e) {
            arr.splice(i, 1);
            console.log(arr[i], e);
            // console.table(arr);
            break;
        }
    }
}