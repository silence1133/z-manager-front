export const digitUppercase = function (n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};

export const payWays = [{
    value: '0',
    label: '现金'
}, {
    value: '1',
    label: '微信'
}, {
    value: '2',
    label: '支付宝'
}, {
    value: '3',
    label: '银行转账'
}, {
    value: '4',
    label: '刷卡'
}];

export const feeTypes = [{
    value: '0',
    label: '租金'
}, {
    value: '1',
    label: '物业'
}, {
    value: '2',
    label: '水费'
}, {
    value: '3',
    label: '电费'
}];


//格式化日期
export const dateFormat = function (dateObj, fmt) {
    var o = {
        "y+": dateObj.getFullYear(),
        "M+": dateObj.getMonth() + 1,                 //月份
        "d+": dateObj.getDate(),                    //日
        "h+": dateObj.getHours(),                   //小时
        "m+": dateObj.getMinutes(),                 //分
        "s+": dateObj.getSeconds(),                 //秒
        "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度
        "S+": dateObj.getMilliseconds()             //毫秒
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if (k == "S+") {
                var lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            }
            else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
}


export const isNumber = function (val) {

    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }

}
