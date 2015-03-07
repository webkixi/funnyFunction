var funnyFunction = {
    //数字相关
    math: {
        //四舍五入
        decimal: function(num, v) {
            var vv = Math.pow(10, v);
            return Math.round(num * vv) / vv;
        },
        //精确相乘
        accMul: function(arg1, arg2) {
            var m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length
            } catch (e) {}
            try {
                m += s2.split(".")[1].length
            } catch (e) {}
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
        },
        //千位分隔符
        //如123456789 返回123,456,789
        milliDivision: function(s) {
            var num = s + "";
            var re = /(-?\d+)(\d{3})/;
            while (re.test(num)) {
                num = num.replace(re, "$1,$2");
            }
            return num;
        },
        //对象数量
        objectSize: function(obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        }
    },
    //字符串相关
    string: {
        //返回URL参数
        urlParam: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return window.unescape(r[2]);
            return null;
        },
        //返回当前url完整路口
        urlFullPath: function() {
            return window.location.protocol + "//" + window.location.host + window.location.pathname;
        }
    },
    //日期相关
    date: {
        //返回两个日期之间的天数差
        diff: function(date1, date2) {
            var type1 = typeof date1,
                type2 = typeof date2;
            if (type1 == 'string')
                date1 = stringToTime(date1);
            else if (date1.getTime)
                date1 = date1.getTime();
            if (type2 == 'string')
                date2 = stringToTime(date2);
            else if (date2.getTime)
                date2 = date2.getTime();
            return (date2 - date1) / (1000 * 60 * 60 * 24);
        },
        //字符串转换成日期
        stringToTime: function() {
            var f = window.string.split(' ', 2);
            var d = (f[0] ? f[0] : '').split('-', 3);
            var t = (f[1] ? f[1] : '').split(':', 3);
            return (new Date(
                parseInt(d[0], 10) || null, (parseInt(d[1], 10) || 1) - 1,
                parseInt(d[2], 10) || null,
                parseInt(t[0], 10) || null,
                parseInt(t[1], 10) || null,
                parseInt(t[2], 10) || null
            )).getTime();
        }
    },
    array: {
        //去重
        unique: function() {
            var ret = [];
            var hash = {};

            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                var key = typeof(item) + item;
                if (hash[key] !== 1) {
                    ret.push(item);
                    hash[key] = 1;
                }
            }
            return ret;
        },
    },
    fn: {
    	//调用对象所有方法,arguments:过滤方法名
        call: function(obj) {
            var arg, sum = 0,
                name = '',
                fn;
            for (var fname in obj) {
            	sum = 0;
                for (var i = 1; i < arguments.length; i++) {
                    arg = arguments[i];
                    if (fname === arg) {
                        sum++;
                    }
                }
                if (sum === 0) {
                    fn = obj[fname];
                    if (typeof fn === 'function') {
                        fn();
                    } 
                }
            };
        }
    }
}
