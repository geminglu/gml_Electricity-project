"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./jquery-1.12.4.js");

require("./jquery_cookie.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(".top1").load("../html/header.html");
$(".sidebar1").load("../html/sidebar.html");

var Car = function () {
    function Car() {
        _classCallCheck(this, Car);

        // 获取元素
        this.tby = document.querySelector(".tbody");
        this.totalValue = document.querySelector(".totalValue");
        this.load();
        this.addEvent();
    }
    // 请求数据


    _createClass(Car, [{
        key: "load",
        value: function load() {
            var that = this;
            $.ajax({
                url: "../data/data.json",
                success: function success(a) {
                    that.res = a;
                    // json数据请求成功后获取cookie
                    that.getCookie();
                },
                dataType: "json"
            });
        }
        // 获取cookie

    }, {
        key: "getCookie",
        value: function getCookie() {
            // 如果cookie里面有数据就解析数据如果没有数据就返回一个空数组
            this.goods = $.cookie("goodsCookie") ? JSON.parse($.cookie("goodsCookie")) : [];
            this.display();
        }
        // 渲染页面

    }, {
        key: "display",
        value: function display() {
            // console.log(this.goods)
            // console.log(this.goods[1].id)
            // console.log(this.res[1].doosid)
            var str = "";
            for (var i = 0; i < this.goods.length; i++) {
                for (var j = 0; j < this.res.length; j++) {
                    // 如果cookie里的数据和json的数据匹配成功就渲染页面
                    if (this.goods[i].id == this.res[j].doosid) {
                        str += "<tr id=\"" + this.res[j].doosid + "\" class=\"list\">\n                        <td class=\"check\"><input type=\"checkbox\" class=\"checkbox\" checked /></td>\n                        <td><img src=\"" + this.res[j].img + "\" /></td>\n                        <td>" + this.res[j].name + "</td>\n                        <td class=\"jg\">" + this.res[j].jiage + "</td>\n                        <td><input type=\"number\" class=\"num\" min=1 value=\"" + this.goods[i].num + "\" /></td>\n                        <td class=\"subtotal\"><span>00.00</span></td>\n                        <td><input type=\"button\" class=\"del\" value=\"\u5220\u9664\"></td>\n                    </tr>";
                        break;
                    }
                }
            }
            this.tby.innerHTML = str;
            console.log(this.tby);
            // 小计,必须要在页面数据加载成功后执行，否则获取不到页面元素
            this.total();
            // 选项
            this.Operation();
            // 总价
            this.totalPrices();
        }
    }, {
        key: "addEvent",
        value: function addEvent() {
            var _this = this;

            this.tby.onclick = function (eve) {
                var e = eve || window.event;
                _this.target = e.target || e.srcElement;
                // 删除按钮
                if (_this.target.className == "del") {
                    // 删除父级
                    _this.target.parentNode.parentNode.remove();
                    _this.delCookie(_this.target);
                }
                // 数量
                if (_this.target.className == "num") {
                    _this.num_Vlu = _this.target.value;
                    _this.upCookie();
                }
                // 重新计算小计
                _this.total();
            };
        }
    }, {
        key: "delCookie",
        value: function delCookie() {
            // 每次点击都需要获取新的cookie，因为商品列表修改后没有刷新购物车页面就修改了购物车的数据，这时修改的还是旧的cookie数据，所以在修改时就要获取最新的cookie
            this.co = JSON.parse($.cookie("goodsCookie"));
            console.log(this.co);
            // 用cookie的数据与每一个购物车列表对比
            for (var i = 0; i < this.co.length; i++) {
                if (this.target.parentNode.parentNode.id == this.co[i].id) {
                    // 如果匹配到了就删除cookie里的相应数据
                    this.co.splice([i], 1);
                    // 数据只有一条不会重复的，只要匹配到就不用在匹配了
                    break;
                }
            }
            // 将新的cookie数据存到cookie里
            $.cookie("goodsCookie", JSON.stringify(this.co), { expires: 7, path: '/' });
        }
    }, {
        key: "upCookie",
        value: function upCookie() {
            // 获取新cookie数据
            this.uco = JSON.parse($.cookie("goodsCookie"));
            // 用cookie的数据与每一个购物车列表对比
            for (var i = 0; i < this.uco.length; i++) {
                if (this.target.parentNode.parentNode.id == this.uco[i].id) {
                    // 如果匹配到了就修改cookie里的num
                    this.uco[i].num = this.target.value;
                    // 数据只有一条不会重复的，只要匹配到就不用在匹配了
                    break;
                }
            }
            // 将新的cookie数据存到cookie里
            $.cookie("goodsCookie", JSON.stringify(this.uco), { expires: 7, path: '/' });
        }
        // 小计

    }, {
        key: "total",
        value: function total() {
            this.str = 0;
            for (var i = 0; i < this.tby.children.length; i++) {
                var j = this.tby.children[i].querySelector(".jg").innerHTML;
                var s = this.tby.children[i].querySelector(".num").value;
                // 小计
                var w = this.tby.children[i].querySelector(".subtotal").querySelector("span").innerHTML = j * s;
                // 总价
                this.str += w;
            }
            this.totalValue.children[0].innerHTML = this.str;
        }
    }, {
        key: "totalPrices",
        value: function totalPrices() {}
        // 选项

    }, {
        key: "Operation",
        value: function Operation() {
            $.fn.extend({
                // 有一个为false就返回false
                selectAll: function selectAll() {
                    // 默认为true
                    var flag = true;
                    // 遍历这个数组
                    this.each(function (index, item) {
                        // 如果有一个为false就为false
                        if (item.checked === false) {
                            flag = false;
                        }
                    });
                    return flag;
                },
                // 反选
                toggleSelect: function toggleSelect() {
                    this.each(function (index, item) {
                        // 复制当前相反的状态
                        item.checked = !item.checked;
                    });
                },
                // 取消
                cancel: function cancel() {
                    this.each(function (index, item) {
                        item.checked = false;
                    });
                }
            });
            // 全选
            $(".checkall").change(function () {
                $('.checkbox').prop('checked', this.checked);
                // 总价
                that.totalPrices();
            });
            var that = this;
            $('.checkbox').change(function () {
                $(".checkall").prop('checked', $('.checkbox').selectAll());
                // 总价
                that.totalPrices();
            });
            // 反选
            $(".antitone").click(function () {
                $('.checkbox').toggleSelect();
                // 这两行代码顺序不能乱
                $(".checkall").prop('checked', $('.checkbox').selectAll());
                // 总价
                that.totalPrices();
            });
            // 取消
            $(".cancel").click(function () {
                $('.checkbox').cancel();
                $(".checkall").prop('checked', $('.checkbox').selectAll());
                // 总价
                that.totalPrices();
            });
        }
    }]);

    return Car;
}();

new Car();