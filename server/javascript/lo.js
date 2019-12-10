import "./jquery-1.12.4.js";
import "./jquery_cookie.js";
import { disconnect } from "cluster";


$(".top1").load("../html/header.html")
$(".footer1").load("../html/footer.html")
$(".sidebar1").load("../html/sidebar.html")




class Ulogin{
    constructor () {
        this.text = document.querySelector("text");
        this.pass = document.querySelector("pass");
        console.log(this.text)
    }
}


new Ulogin();