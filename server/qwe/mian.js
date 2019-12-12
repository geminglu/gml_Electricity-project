"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./jquery-1.12.4.js");

require("./banner.js");

require("./jquery_cookie.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import { spawn } from "child_process";
$(".banner").banner($(".banner").find("img"), {
    but: false
});
$(".top").load("html/header.html", function (response, status, xhr) {
    // new lon();
});
$(".footer1").load("html/footer.html");
$(".sidebar1").load("html/sidebar.html", function (response, status, xhr) {
    $(".sjbdh").parent().on("click", function () {
        location.href = "html/cart.html";
    });
});

// 楼层
function floor() {
    if (window.scrollY >= $(".box1").offset().top) {
        // $(".floatWin").css("display","block").stop().animate({left:145},1000);
        $(".floatWin").show(500);
    } else {
        $(".floatWin").hide(500);
        // $(".floatWin").css("display","none").stop().animate({left:0},1000);
    }
    window.onscroll = function (e) {
        if (window.scrollY >= $(".box1").offset().top) {
            // $(".floatWin").css("display","block").stop().animate({left:145},1000);
            $(".floatWin").show("slow");
        } else {
            $(".floatWin").hide("slow");
            // $(".floatWin").css("display","none").stop().animate({left:0},1000);
        }
    };
    $(".avu")[0].onclick = function () {
        $("html").animate({ scrollTop: $(".box1").offset().top }, 300);
    };
    $(".avu")[1].onclick = function () {
        $("html").animate({ scrollTop: $(".box2").offset().top }, 300);
    };
    $(".avu")[2].onclick = function () {
        $("html").animate({ scrollTop: $(".b3").offset().top }, 300);
    };
    $(".avu")[3].onclick = function () {
        $("html").animate({ scrollTop: $(".b4").offset().top }, 300);
    };
    $(".avu")[4].onclick = function () {
        $("html").animate({ scrollTop: $(".b5").offset().top }, 300);
    };
    $(".avu1").on("click", function () {
        $("html").animate({ scrollTop: 0 }, 300);
    });
}
floor();

var renderData = function () {
    function renderData() {
        _classCallCheck(this, renderData);

        this.ajaxqq();
    }

    _createClass(renderData, [{
        key: "ajaxqq",
        value: function ajaxqq() {
            var that = this;
            $.ajax({
                url: "data/data.json",
                success: function success(a) {
                    that.res = a;
                    that.doc();
                },
                dataType: "json"
            });
        }
        // 获取元素

    }, {
        key: "doc",
        value: function doc() {
            var box1li = $(".box1>ul>li").length;
            var resl = this.res.length;
            var ran = random(0, resl);
            $(".box1>ul>li").on("click", function () {
                $.cookie("spid", $(this).attr("id"), { expires: 7, path: '/' });
                // location.href = "./html/detailPage.html";
                location.href = "./html/detailPage.html";
            });
            for (var i = 0; i < box1li; i++) {
                $(".box1>ul>li").eq(i).attr("id", this.res[ran + i].doosid);
                $(".box1>ul>li").eq(i).css("background", "url(" + this.res[ran + i].img + ")  no-repeat center 40px");
                $(".box1>ul>li").eq(i).css("backgroundSize", "120%");
                $(".box1>ul>li .box1_tile h3").eq(i).html(this.res[ran + i].name);
                $(".box1>ul>li .box1_tile span").eq(i).html(this.res[ran + i].title);
            }
            var boximg = $(".box2>ul>li").length;
            $(".box2>ul>li>a>img,.box2>ul>li h4,.box2_youhui a").on("click", function () {
                $.cookie("spid", $(this).parents("li").attr("id"), { expires: 7, path: '/' });
                location.href = "./html/detailPage.html";
            });
            for (var _i = 0; _i < boximg; _i++) {
                $(".box2>ul>li").eq(_i).attr("id", this.res[_i].doosid);
                $(".box2>ul>li>a>img").eq(_i).attr("src", this.res[_i].img);
                $(".box2>ul>li h4").eq(_i).html(this.res[_i].name);
                $(".box2>ul>li h5").eq(_i).html(this.res[_i].title);
                $(".box2>ul>li .box2_youhui>span").eq(_i).html(this.res[_i].jiage);
                $(".box2>ul>li ul .original").eq(_i).html(this.res[_i].original);
            }
            var bgmolen = $(".bgmobile").length;
            $(".bgmobile").on("click", function () {
                $.cookie("spid", this.id, { expires: 7, path: '/' });
                location.href = "./html/detailPage.html";
            });
            for (var _i2 = 0; _i2 < bgmolen; _i2++) {
                $(".bgmobile").eq(_i2).attr("id", this.res[_i2].doosid);
                $(".bgmobile .s1_1").eq(_i2).html(this.res[_i2].jiage);
                $(".bgmobile .s1_1").eq(_i2).parent().next().children(".yuanjia").html(this.res[_i2].original);
                $(".bgmobile").eq(_i2).css("background", "url(" + this.res[_i2].img + ")  no-repeat center 10px/65%");
                $(".bgmobile .s1_1").eq(_i2).parent().siblings("span").html(this.res[_i2].name);
            }
        }
    }]);

    return renderData;
}();

function random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}
new renderData();

var countDown = function () {
    function countDown() {
        var _this = this;

        _classCallCheck(this, countDown);

        setInterval(function () {
            _this.dis();
        }, 1000);
    }

    _createClass(countDown, [{
        key: "getDate",
        value: function getDate() {
            var d = new Date();
            this.shi = 24 - d.getHours();
            this.fen = 60 - d.getMinutes();
            this.s = 60 - d.getSeconds();
        }
    }, {
        key: "dis",
        value: function dis() {
            this.getDate();
            var arr = [3, 6, 8, 1, 5, 9];
            var arr1 = [3, 8, 5, 9, 4, 2];
            for (var i = 0; i < $(".box_activity").length; i++) {
                $(".box_activity").eq(i).children("span").eq(0).html(this.shi + arr1[i]);
                $(".box_activity").eq(i).children("span").eq(1).html(this.fen + arr[i]);
                $(".box_activity").eq(i).children("span").eq(2).html(this.s - 1);
            }
        }
    }]);

    return countDown;
}();

new countDown();