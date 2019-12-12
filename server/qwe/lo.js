"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./jquery-1.12.4.js");

require("./jquery_cookie.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import { disconnect } from "cluster";


$(".top1").load("../html/header.html");
$(".footer1").load("../html/footer.html");
$(".sidebar1").load("../html/sidebar.html");

var Ulogin = function () {
    function Ulogin() {
        _classCallCheck(this, Ulogin);

        this.text = document.querySelector(".us");
        this.pass = document.querySelector(".pa");
        this.but = document.querySelector(".but");
        this.ts = document.querySelector(".tishi");
        this.coo = $.cookie("userMsg") ? JSON.parse($.cookie("userMsg")) : [];
        console.log(this.coo);
        this.addEvent();
        this.getCookie();
    }
    // 读取cookie


    _createClass(Ulogin, [{
        key: "getCookie",
        value: function getCookie() {
            if (this.coo.length >= 1) {
                this.u = this.coo[this.coo.length - 1].user;
                this.p = this.coo[this.coo.length - 1].pass;
                this.text.value = this.u;
                this.pass.value = this.p;
            }
        }
    }, {
        key: "addEvent",
        value: function addEvent() {
            var _this = this;

            var that = this;
            this.but.onclick = function () {
                for (var i = 0; i < that.coo.length; i++) {
                    if (that.coo[i].user == _this.text.value && that.coo[i].pass == _this.pass.value) {
                        that.coo[i].onoff = 1;
                        $.cookie("userMsg", JSON.stringify(that.coo), { expires: 7, path: '/' });
                        that.ts.innerHTML = "";
                        location.href = "../index.html";
                        break;
                    } else {
                        that.ts.innerHTML = "用户名或密码错误";
                    }
                }
                if (that.coo.length == 0) {
                    that.ts.innerHTML = "用户名或密码错误";
                }
            };
        }
    }]);

    return Ulogin;
}();

new Ulogin();