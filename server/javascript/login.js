import "./jquery-1.12.4.js";
import "./jquery_cookie.js";


$(".top1").load("../html/header.html")
$(".footer1").load("../html/footer.html")
$(".sidebar1").load("../html/sidebar.html")


class register{
    constructor(){
        this.user = document.querySelector(".user");
        this.pass = document.querySelector(".password1");
        this.reg = document.querySelector(".reg");
        this.usery = document.querySelector(".usery");
        this.log = document.querySelector("#log");
        this.span = document.querySelector("#span");
            this.addEvent();
    }
    addEvent(){
        // 注册按钮事件
        var that = this;
        this.reg.onclick = function () {
            if (user.getAttribute("type") == "true" && tel.getAttribute("type") == "true" && email.getAttribute("type") == "true" && pass.getAttribute("type")) {
				but_ty = true;
				console.log(1)
                // 获取值
                that.u = that.user.value;
                that.p = that.pass.value;
                that.setMsg();
			}else{
                but_ty = false;
				console.log(2)
			}
        }
        // this.log.onclick = function () {
        //     location.href = "login.html";
        // }
    }
    setMsg(){
        // 判断cookie有没有没数据，有就返回并解析为对象，没有就给this.msg赋一个空数组[];
        this.msg = $.cookie("userMsg") ? JSON.parse($.cookie("userMsg")) : [];
        console.log(this.msg)
        // this.msg.length<1说明cookie没有数据，就直接给this.msg添加数据
        if (this.msg.length<1) {
            // 第一个用户
            this.msg.push({
                user:this.u,
                pass:this.p,
                onoff:0
            })
            this.success();
        }else{
            // cookie里有数据就要判断是否有重复的
            var type = this.msg.some((val,idx)=>{
                // 输入的用户名和cookie里的值对应就返回true
                return val.user === this.u;
            });
            if (type) {
                this.usery.innerHTML = "用户名已存在";
            }else{
                // 没重名直接注册
                this.msg.push({
                    user:this.u,
                    pass:this.p,
                    onoff:0
                })
                this.success();
            }
        }
        console.log(JSON.stringify(this.msg))
        $.cookie("userMsg",JSON.stringify(this.msg),{ expires: 7, path: '/' });
    }
    // 注册成功后跳转到登录页面
    success(){
        let r = confirm("注册成功是否跳转到登录页面")
        if (r) {
            location.href = "login.html";
        }
        // var i = 5;
        // var that = this;
        // var t = setInterval(()=>{
        //     i--;
        //     console.log(i);
        //     that.span.innerHTML = `注册成功，${i}秒后<a href="login.html">跳转到登录</a>`;
        // },1000);
        // setTimeout(()=>{
        //     clearInterval(t);
        //     location.href = "login.html";
        // },5000);
    }   
}
class Ulogin{

}

new register();
new Ulogin();