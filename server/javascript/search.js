import "./jquery-1.12.4.js";
import "./jquery_cookie.js";

$(".top").load("../html/header.html",function () {

    new search();
})
$(".footer1").load("../html/footer.html")
$(".sidebar1").load("../html/sidebar.html")

class search{
    constructor() {
        this.ul = $(".box3_main_right_2")
        this.ajaxs();
    }
    ajaxs(){
        var that = this;
        $.ajax({
            url:"../data/data.json",
            success:function(a){
                that.res = a;
                that.display();
            },
            dataType:"json",
        })
    }
    display(){
        console.log(this.res.length)
        console.log(this.res[0].label.length)
        console.log(this.res[0].label[1])
        var str = "<h2>以下是您搜索到的数据</h2>";
        for (let i=0;i<this.res.length;i++) {
            for (let j=0;j<this.res[i].label.length;j++) {
                if ($.cookie("suosou") == this.res[i].label[j]) {
                    console.log(this.res[i].img);
                    str += `<li><a href="javascript:void(0)" class="bgmobile" id="${this.res[i].doosid}" style='background:url(${this.res[i].img})  no-repeat center 10px/65%'>
                        <span class="s1">¥<span class="s1_1">${this.res[i].jiage}</span></span>
                        <s>市场价：￥<span class="yuanjia">${this.res[i].original}</span></s>
                        <span class="s3">${this.res[i].name}</span>
                    </a></li>`;
                }
            }
        }
        this.ul.html(str);
        this.addEvent();
    }
    addEvent() {
        $(".bgmobile").on("click",function () {
            $.cookie("spid",this.id,{expires: 7, path: '/'})
            location.href = "./detailPage.html";
        })
    }
}