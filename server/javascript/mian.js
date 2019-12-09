import "./jquery-1.12.4.js";
import "./banner.js";
$(".banner").banner($(".banner").find("img"),{
    but:false,
});
$(".top").load("html/header.html")
$(".footer1").load("html/footer.html")
$(".sidebar1").load("html/sidebar.html")


window.onscroll = function(e){
    if (window.scrollY > 524) {
        $(".floatWin").css("display","block").stop().animate({left:145},1000);
    }else{
        $(".floatWin").css("display","none").stop().animate({left:0},1000);
    }
}
// $(".al").children()[0].onclick = function () {
//     $("html").animate({scrollTop:0},300);
// } 
// $(".al").children()[1].onclick = function () {
//     $("html").animate({scrollTop:$(".foor").children().eq(1).offset().top},300);
// } 
// $(".al").children()[2].onclick = function () {
//     $("html").animate({scrollTop:$(".foor").children().eq(2).offset().top},300);
// } 
// $(".al").children()[3].onclick = function () {
//     $("html").animate({scrollTop:$(".foor").children().eq(3).offset().top},300);
// } 
// $(".al").children()[4].onclick = function () {
//     $("html").animate({scrollTop:$(".foor").children().eq(4).offset().top},300);
// } 
// $(".al").children()[5].onclick = function () {
//     $("html").animate({scrollTop:$(".foor").children().eq(5).offset().top},300);
// }

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