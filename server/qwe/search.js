"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./jquery-1.12.4.js");

require("./jquery_cookie.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(".top").load("../html/header.html", function () {

    new search({
        // 页面数据
        list: document.querySelector(".list"),
        // 上一页按钮
        btnL: document.querySelector(".btnL"),
        // 下一页按钮
        btnR: document.querySelector(".btnR"),
        // 导航栏
        pagWarp: document.querySelector(".pagWarp"),
        Page: document.querySelector(".pagWarp>ul"),
        skip: document.querySelector(".skip"),
        skip_but: document.querySelector(".skip li:nth-child(3) [type]"),
        skip_num: document.querySelector(".skip li:nth-child(2) [type]"),
        // 默认页，从0开始
        index: 0,
        // 每页显示的数量
        num: 4
    });
});
$(".footer1").load("../html/footer.html");
$(".sidebar1").load("../html/sidebar.html");

var search = function () {
    function search(options) {
        _classCallCheck(this, search);

        this.ul = $(".box3_main_right_2");
        this.ajaxs();

        this.url = options.url;
        this.list = options.list;
        this.btnL = options.btnL;
        this.btnR = options.btnR;
        // 跳转
        this.skip = options.skip;
        // 跳转文本框
        this.skip_num = options.skip_num;
        // 跳转按钮
        this.skip_but = options.skip_but;
        this.pagWarp = options.pagWarp;
        // 获取页面ul
        this.Page = options.Page;
        // 获取所有页面元素
        this.page_li = this.Page.children;
        // 如果index没有传参默认为0
        this.index = options.index || 0;
        // 如果num没有传参默认就为5，（一夜有五条数据）
        this.num = options.num || 5;
    }

    _createClass(search, [{
        key: "ajaxs",
        value: function ajaxs() {
            var that = this;
            $.ajax({
                url: "../data/data.json",
                success: function success(a) {
                    that.res = a;
                    that.display();
                    that.pagination();
                },
                dataType: "json"
            });
        }
    }, {
        key: "display",
        value: function display() {
            var str = "<h2>以下是您搜索到的数据</h2>";
            this.qwe = 0;
            for (var i = 0; i < this.res.length; i++) {
                for (var j = 0; j < this.res[i].label.length; j++) {
                    if ($.cookie("suosou") == this.res[i].label[j]) {
                        this.qwe++;
                    }
                }
            }
            for (var _i = this.index * this.num; _i < (this.index + 1) * this.num; _i++) {
                for (var _j = 0; _j < this.res[_i].label.length; _j++) {
                    if ($.cookie("suosou") == this.res[_i].label[_j]) {
                        str += "<li><a href=\"javascript:void(0)\" class=\"bgmobile\" id=\"" + this.res[_i].doosid + "\" style='background:url(" + this.res[_i].img + ")  no-repeat center 10px/65%'>\n                        <span class=\"s1\">\xA5<span class=\"s1_1\">" + this.res[_i].jiage + "</span></span>\n                        <s>\u5E02\u573A\u4EF7\uFF1A\uFFE5<span class=\"yuanjia\">" + this.res[_i].original + "</span></s>\n                        <span class=\"s3\">" + this.res[_i].name + "</span>\n                    </a></li>";
                    }
                }
            }
            this.ul.html(str);
            this.addEvent();
        }
    }, {
        key: "pagination",
        value: function pagination() {
            // 通过数据的总长度(this.res_l)和每页数据的数量(this.num)求出要显示多少页(this.maxnum)
            this.maxnum = Math.ceil(this.qwe / this.num);
            // 将页码数添加到页面上
            this.skip.firstElementChild.firstElementChild.innerHTML = this.maxnum;
            var str = "";
            for (var i = 0; i < this.maxnum; i++) {
                str += "\n                <li>" + (i + 1) + "</li>\n            ";
            }
            this.Page.innerHTML = str;
            // 给当前页码添加样式
            this.page_li[this.index].classList.add("activate");
        }
    }, {
        key: "addEvent",
        value: function addEvent() {
            var _this = this;

            $(".bgmobile").on("click", function () {
                $.cookie("spid", this.id, { expires: 7, path: '/' });
                location.href = "./detailPage.html";
            });

            var that = this;
            this.btnR.onclick = function () {
                that.index == that.maxnum - 1 ? that.index = 0 : that.index++;
                that.setActive();
            };
            this.btnL.onclick = function () {
                that.index == 0 ? that.index = that.maxnum - 1 : that.index--;
                that.setActive();
            };

            var _loop = function _loop(i) {
                _this.page_li[i].index = i;
                _this.page_li[i].onclick = function () {
                    that.index = that.page_li[i].index;
                    that.setActive();
                };
            };

            for (var i = 0; i < this.maxnum; i++) {
                _loop(i);
            }
            this.skip_but.onclick = function () {
                that.skip_num.style.color = "#000";
                // 必须在页码数量范围内才能跳转
                if (that.skip_num.value - 1 >= 0 && that.skip_num.value - 1 < that.maxnum) {
                    // 把输入的数赋值给索引(that.index);
                    that.index = that.skip_num.value - 1;
                    that.skip_num.value = "";
                    that.setActive();
                } else {
                    // 如果输入的数不在范围内就把文字便成红色
                    that.skip_num.style.color = "#f00";
                }
                // console.log(that.skip_num.value-1);
                // console.log(that.maxnum);
            };
        }

        // 重新渲染页面和页码

    }, {
        key: "setActive",
        value: function setActive() {
            this.display();
            for (var i = 0; i < this.maxnum; i++) {
                this.page_li[i].classList.remove("activate");
            }
            this.page_li[this.index].classList.add("activate");
        }
    }]);

    return search;
}();