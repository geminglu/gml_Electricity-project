import "./jquery-1.12.4.js";
import "./banner.js";
import "./jquery_cookie.js";
// import { spawn } from "child_process";
$(".banner").banner($(".banner").find("img"),{
    but:false,
});
$(".top").load("html/header.html",function(response,status,xhr){
    // new lon();
})
$(".footer1").load("html/footer.html")
$(".sidebar1").load("html/sidebar.html",function(response,status,xhr){
    $(".sjbdh").parent().on("click",()=>{
        location.href = "html/cart.html";
    })

})



// 楼层
function floor() {
    if (window.scrollY >= $(".box1").offset().top) {
        // $(".floatWin").css("display","block").stop().animate({left:145},1000);
        $(".floatWin").show(500);
    }else{
        $(".floatWin").hide(500);
        // $(".floatWin").css("display","none").stop().animate({left:0},1000);
    }
    window.onscroll = function(e){
        if (window.scrollY >= $(".box1").offset().top) {
            // $(".floatWin").css("display","block").stop().animate({left:145},1000);
            $(".floatWin").show("slow");
        }else{
            $(".floatWin").hide("slow");
            // $(".floatWin").css("display","none").stop().animate({left:0},1000);
        }
    }
    $(".avu")[0].onclick = function () {
        $("html").animate({scrollTop:$(".box1").offset().top},300);
    }
    $(".avu")[1].onclick = function () {
        $("html").animate({scrollTop:$(".box2").offset().top},300);
    }
    $(".avu")[2].onclick = function () {
        $("html").animate({scrollTop:$(".b3").offset().top},300);
    }
    $(".avu")[3].onclick = function () {
        $("html").animate({scrollTop:$(".b4").offset().top},300);
    }
    $(".avu")[4].onclick = function () {
        $("html").animate({scrollTop:$(".b5").offset().top},300);
    }
    $(".avu1").on("click",()=>{
        $("html").animate({scrollTop:0},300);
    })

}
floor();

class renderData{
    constructor() {
        this.ajaxqq();
    }
    ajaxqq(){
        var that = this;
        $.ajax({
            url:"data/data.json",
            success:function(a){
                that.res = a;
                that.doc();
            },
            dataType:"json",
        })
    }
    // 获取元素
    doc() {
        let box1li = $(".box1>ul>li").length;
        let resl = this.res.length;
        let ran = random(0,resl);
        $(".box1>ul>li").on("click",function () {
            $.cookie("spid",$(this).attr("id"),{expires: 7, path: '/'})
            // location.href = "./html/detailPage.html";
            location.href = "./html/detailPage.html";
        })
        for (let i=0;i<box1li;i++) {
            $(".box1>ul>li").eq(i).attr("id",this.res[ran+i].doosid)
            $(".box1>ul>li").eq(i).css("background",`url(${this.res[ran+i].img})  no-repeat center 40px`);
            $(".box1>ul>li").eq(i).css("backgroundSize","120%");
            $(".box1>ul>li .box1_tile h3").eq(i).html(this.res[ran+i].name);
            $(".box1>ul>li .box1_tile span").eq(i).html(this.res[ran+i].title)
        }
        let boximg = $(".box2>ul>li").length;
        $(".box2>ul>li>a>img,.box2>ul>li h4,.box2_youhui a").on("click",function () {
            $.cookie("spid",$(this).parents("li").attr("id"),{expires: 7, path: '/'})
            location.href = "./html/detailPage.html";
        });
        for (let i=0;i<boximg;i++) {
            $(".box2>ul>li").eq(i).attr("id",this.res[i].doosid);
            $(".box2>ul>li>a>img").eq(i).attr("src",this.res[i].img);
            $(".box2>ul>li h4").eq(i).html(this.res[i].name);
            $(".box2>ul>li h5").eq(i).html(this.res[i].title);
            $(".box2>ul>li .box2_youhui>span").eq(i).html(this.res[i].jiage);
            $(".box2>ul>li ul .original").eq(i).html(this.res[i].original)
        }
        let bgmolen = $(".bgmobile").length;
        $(".bgmobile").on("click",function () {
            $.cookie("spid",this.id,{expires: 7, path: '/'})
            location.href = "./html/detailPage.html";
        })
        for (let i=0;i<bgmolen;i++) {
            $(".bgmobile").eq(i).attr("id",this.res[i].doosid);
            $(".bgmobile .s1_1").eq(i).html(this.res[i].jiage);
            $(".bgmobile .s1_1").eq(i).parent().next().children(".yuanjia").html(this.res[i].original);
            $(".bgmobile").eq(i).css("background",`url(${this.res[i].img})  no-repeat center 10px/65%`);
            $(".bgmobile .s1_1").eq(i).parent().siblings("span").html(this.res[i].name);
        }
    }
}
function random(max,min) {
    return (Math.round(Math.random()*(max-min)+min));
}
new renderData();


class countDown{
    constructor() {
        setInterval(()=>{
            this.dis();

        },1000)
    }
    getDate() {
        var d = new Date();
        this.shi = 24 - d.getHours();
        this.fen = 60 - d.getMinutes();
        this.s = 60 - d.getSeconds();
    }
    dis() {
        this.getDate();
        let arr = [3,6,8,1,5,9]
        let arr1 = [3,8,5,9,4,2]
        for (let i=0;i<$(".box_activity").length;i++) {
            $(".box_activity").eq(i).children("span").eq(0).html(this.shi + arr1[i]);
            $(".box_activity").eq(i).children("span").eq(1).html(this.fen + arr[i]);
            $(".box_activity").eq(i).children("span").eq(2).html(this.s - 1);
        }
        
    }
}
new countDown();

class tab{
    constructor() {
        this.tab = $(".tab");
        this.ul = $(".box1>ul");
        this.display();
    }
    display() {
        // console.log(this.tab[1])
        // for (let i=0;i<this.tab.length;i++) {
        //     this.tab.eq(i).attr("id",i);
        //     this.ul.eq(i).attr("id",i);
        // }
        var that = this;
        this.tab.eq(1).css("background","#aeaeae");
        this.ul.eq(1).css("display","none");
        this.tab.eq(0).on("click",function () {
            that.tab.eq(0).css("background","#6495ed");
            that.tab.eq(1).css("background","#aeaeae");
            that.ul.eq(0).css("display","flex");
            that.ul.eq(1).css("display","none");

        })
        this.tab.eq(1).on("click",function () {
            that.tab.eq(1).css("background","#6495ed");
            that.tab.eq(0).css("background","#aeaeae");
            that.ul.eq(1).css("display","flex");
            that.ul.eq(0).css("display","none");

        })
    }
}
new tab();