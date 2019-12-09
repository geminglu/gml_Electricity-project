// cookie的分装
function setCookie(key,value,options) {
    options = options || {};
    if(options.path) {
        var p = ";path="+options.path;
    }else{
        var p = "";
    }
    if(options.expires) {
        var d = new Date();
        d.setDate(d.getDate()+options.expires);
        var e = ";expires="+d
    }else{
        var e = "";
    }
    document.cookie = key + "=" + value + e + p;
}
// expires值是天
// setCookie("a","root",{
//     expires:4,
//     path:"123",
// });

// 获取cookie的值
function getCookie(key) {
    var value = '';
    var tmpArr = document.cookie.split("; ");
    tmpArr.forEach(item => {
        var tmp = item.split("=");
        if (tmp[0] === key) {
            value = tmp[1];
        }
    });
    return value;
}
// getCookie("d")

// 删除cookie
function delcookie(key) {
    setCookie(key,'1',-10);
}