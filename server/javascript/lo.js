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
        this.coo = $.cookie("userMsg")
        this.addEvent();
        this.getCookie();
    }
    // 读取cookie
    getCookie() {
        if (JSON.parse(this.coo).length >= 1) {
            this.u = JSON.parse(this.coo)[0].user;
            this.p = JSON.parse(this.coo)[0].pass;
            this.text.value = this.u
            this.pass.value = this.p
        }
    }
    addEvent() {
        var that = this;
        this.but.onclick = ()=>{
            var y = JSON.parse(that.coo).every(function (item,index,arr) {
               return (item.user == that.text.value && item.pass == that.pass.value)
            
            })
            if (y) {
                console.log(y)
                that.logtype();
                location.href = "../index.html";
            }else{
                that.ts.innerHTML = "用户名或密码错误"
            }
        }
    }
    logtype(){
        JSON.parse(this.coo)[0].onoff = 1;
    }
}


new Ulogin();