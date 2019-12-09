import "./jquery-1.12.4.js";
import "./banner.js";
$(".banner").banner($(".banner").find("img"),{
    but:false,
});
$(".top").load("html/header.html")
$(".footer1").load("html/footer.html")
$(".sidebar1").load("html/sidebar.html")
