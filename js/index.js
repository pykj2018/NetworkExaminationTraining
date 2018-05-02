/**********************************
 * @description 工具对象,所有工具方法
 **********************************/

var m_util = {

}

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
 * @method removeItem
 * @method unique
 * @method bind 事件触发方法
 *******************************************/
//数组存在object对象里 方便多页面的数组管理和调用 成!
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
    arrId: null,
    arrName: null,
    catchArr: [],
    init: function (config) {
        this.$ = config.$;
        this.clickBtn = this.$(config.clickBtn);
        this.tableName = config.tableName;
        this.fatherIframe = config.fatherIframe;
        this.dId = config.dId;
        this.arr = config.arr;
        this.table = config.table;
        this.parent = config.parent;
        this.arrId = config.arrId;
        this.arrName = config.arrName;
        return this;
    },
    bind: function () {
        var self = this;
        this.clickBtn.on('click', function () {
            var index = window.parent.layer.getFrameIndex(window.name)
            var checkStatus = self.table.checkStatus(self.tableName);
            var data = checkStatus.data;
            self.render(data);
            window.parent.layer.close(index);
        })
    },
    getFinalData: function (data) {
        var catchArr = [];
        for (let i = 0; i < data.length; i++) { //遍历获取id
            catchArr.push({
                'id': data[i][this.arrId],
                'name': data[i][this.arrId]
            });
        }
        return catchArr;
    },
    render: function (data) {
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
    unique: function (array) {
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

}

//删除子项 arr格式为数组对象 对比属性为id
function removeItem(arr, e) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == e) {
            arr.splice(i, 1);
            // console.table(arr);
            break;
        }
    }
}


/*****************************************************************
 * @description 获取父控件内容
 * @param parentIframe 父ID
 * @param itemId 内容ID
 * @param isSetSession {boolean} 是否设置session
 * @method init 初始化获取结果 return a == allContentArr
 * @method getAllContent 获取所有元素 return false or allContentArr
 * @method setArrInSession session操作
 *****************************************************************/
var getFatherIframeContent = {
    parentIframe: null,
    itemId: null,
    isSetSession: false,
    allContentArr: [],
    init: function (config) {
        this.parentIframe = $('#' + config.parentIframe);
        this.itemId = config.itemId;
        this.isSetSession = config.isSetSession;
        this.setArrInSession(config.parentIframe);
        this.allContentArr = this.getAllContent();
        return this.allContentArr;
    },
    getAllContent: function () {
        var _itemId = this.parentIframe.find(this.itemId),
            arr = [];
        for (var i = 0; i < _itemId.length; i++) {
            arr.push(_itemId.eq(i).text());
        }
        return arr.length === 0 ? [] : arr;
    },
    setArrInSession: function (fatherName) {
        var arr = this.getAllContent()
        sessionStorage.setItem(fatherName, arr);
    }
}
/****************************************
 * @description 避免重复方法按钮避免重复提交
 * @param btn 传入要禁用的按钮
 ****************************************/
function avoidDuplicationOfSubmission(btn) {
    btn.addClass('layui-btn layui-btn-disabled');
    btn.attr('disabled', true);
}


/** 
 * @description 添加题目组件传入select 对比相应option获取dom细节
 * 
 */
var addExercises = {
    selectName: null,
    contentName: null,
    form: null,
    init: function (config) {
        this.selectName = 'select(' + config.selectName + ')';
        this.contentName = config.contentName;
        this.form = config.form;
        this.bind();
        return this;
    },
    bind: function () {
        var self = this;
        this.form.on(this.selectName, function (data) {
            var optionVal = data.value;
            self.render(optionVal);
        });
    },
    render: function (optionVal) {
        if (optionVal === '0') {
            // 单选题 
            questionSet.qSingleChoice();
            console.log('单选');
        } else if (optionVal === '1') {
            // 多选
            questionSet.qMultipleChoice()
            console.log('多选');
        } else if (optionVal === '2') {
            // 判断
            questionSet.qJudgment()
            console.log('判断');
        } else if (optionVal === '3') {
            // 填空
            questionSet.qCompletion()
            console.log('填空');
        } else if (optionVal === '4') {
            // 问答
            questionSet.qAnswer()
            console.log('问答');
        } else {
            // 暂无题型
            console.log('暂无');
        }
    }

}
/**
 * @description 题目集合
 */
var questionSet = {
    qSingleChoice: function () {
        console.log(1);
    },
    qMultipleChoice: function () {
        console.log(2);
    },
    qJudgment: function () {
        console.log(3);
    },
    qCompletion: function () {
        console.log(4);
    },
    qAnswer: function () {
        console.log(5);
    }

}