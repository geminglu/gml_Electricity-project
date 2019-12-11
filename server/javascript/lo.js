import "./jquery-1.12.4.js";
import "./jquery_cookie.js";
// import { disconnect } from "cluster";


$(".top1").load("../html/header.html")
$(".footer1").load("../html/footer.html")
$(".sidebar1").load("../html/sidebar.html")




class Ulogin{
    constructor () {
        this.text = document.querySelector(".us");
        this.pass = document.querySelector(".pa");
        this.but = document.querySelector(".but");
        this.ts = document.querySelector(".tishi");
        this.coo = $.cookie("userMsg") ? JSON.parse($.cookie("userMsg")) : [];
        console.log(this.coo)
        this.addEvent();
        this.getCookie();
    }
    // 读取cookie
    getCookie() {
        if (this.coo.length >= 1) {
            this.u = this.coo[this.coo.length-1].user;
            this.p = this.coo[this.coo.length-1].pass;
            this.text.value = this.u
            this.pass.value = this.p
        }
    }
    addEvent() {
        var that = this;
        this.but.onclick = ()=>{
            for (let i=0;i<that.coo.length;i++) {
                if (that.coo[i].user == this.text.value && that.coo[i].pass == this.pass.value) {
                    that.coo[i].onoff = 1;
                    $.cookie("userMsg",JSON.stringify(that.coo),{ expires: 7, path: '/' })
                    that.ts.innerHTML = "";
                    location.href = "../index.html";
                    break;
                }else{
                    that.ts.innerHTML = "用户名或密码错误"
                }
            }
            if (that.coo.length == 0) {
                that.ts.innerHTML = "用户名或密码错误"
            }
        }
    }
}


new Ulogin();