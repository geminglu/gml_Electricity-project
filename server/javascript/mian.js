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
    console.log($(".lll"))
    class lon{
        constructor() {
            this.coo = $.cookie("userMsg");
            console.log()
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