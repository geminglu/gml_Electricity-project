// var url = "http://127.0.0.1/JavaScript/ajax/date/test.text";
// document.onclick = function () {
//     ajaxGet(url,function (res) {
//         console.log(res);
//     },{
//         user:"root",
//         pass:"3regfer243245",
//         age:12,
//     });
// }



function ajaxGet(url,cb,date) {
    date = date || {};
    var d = new Date();
    var str = "";
    for (var i in date) {
        str += i + "=" + date[i] + "&";
    }
    url = url + "?" + str + "__qft=" + d.getTime;
    var xhr = new XMLHttpRequest();
    xhr.open("get",url,true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cb(xhr.responseText);
        }
    }
    xhr.send(null);
}