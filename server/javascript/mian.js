import "./jquery-1.12.4.js";
import "./banner.js";
import "./jquery_cookie.js";
$(".banner").banner($(".banner").find("img"),{
    but:false,
});
$(".top").load("html/header.html")
$(".footer1").load("html/footer.html")
$(".sidebar1").load("html/sidebar.html")



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
setTimeout(()=>{
    class lon{
        constructor() {
            this.coo = $.cookie("userMsg");
            if (JSON.parse(this.coo).length >= 1) {
                JSON.parse(this.coo).forEach(function (item,index,arr) {
                    $(".lll").html("欢迎" + item.user)
                });
            }
        }
    }
new lon();
},1000)
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
        for (let i=0;i<box1li;i++) {
            $(".box1>ul>li").eq(i).css("background",`url(${this.res[ran+i].img})  no-repeat center 40px`);
            $(".box1>ul>li").eq(i).css("backgroundSize","120%");
            $(".box1>ul>li .box1_tile h3").eq(i).html(this.res[ran+i].name);
            $(".box1>ul>li .box1_tile span").eq(i).html(this.res[ran+i].title)
        }
        let boximg = $(".box2>ul>li").length;
        for (let i=0;i<boximg;i++) {
            $(".box2>ul>li>a>img").eq(i).attr("src",this.res[i].img);
            $(".box2>ul>li h4").eq(i).html(this.res[i].name);
            $(".box2>ul>li h5").eq(i).html(this.res[i].title);
            $(".box2>ul>li .box2_youhui>span").eq(i).html(this.res[i].jiage);
            $(".box2>ul>li ul .original").eq(i).html(this.res[i].original)
        }
        let bgmolen = $(".bgmobile").length;
        for (let i=0;i<bgmolen;i++) {
            $(".bgmobile>.s1").children().eq(i).html(this.res[i].jiage);
            $(".bgmobile>s").children().eq(i).html(this.res[i].original);
            $(".bgmobile>.s3")[i].innerHTML = this.res[i].name;
            $(".bgmobile")[i].style.background = `url(${this.res[i].img})  no-repeat center 10px`;
            $(".bgmobile")[i].style.backgroundSize = "65%"
        }
    }
}
function random(max,min) {
    return (Math.round(Math.random()*(max-min)+min));
}
new renderData();