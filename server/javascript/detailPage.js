import "./jquery-1.12.4.js";
import "./jquery_cookie.js";
import "./jquery.exzoom.js";



class dotd {
    constructor () {
        this.h2 = $(".page_main>h2");
        this.h3 = $(".page_main>h3");
        this.img_ul = $(".exzoom_img_ul");
        this.jg = $(".page_main_right_price span");
        this.cook = $.cookie("spid");
        this.ajaxqq();
    }
    ajaxqq(){
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
    display() {
        var that = this;
        var str;
        for (let i=0;i<this.res.length;i++) {
            if (this.res[i].doosid == this.cook) {
                $(this.h2).html(this.res[i].name);
                $(this.h3).html(this.res[i].title);
                $(this.jg).html(this.res[i].jiage)
                str = `<li><img src="${this.res[i].img}"/></li>
                    <li><img src="${this.res[i].img1}"/></li>
                    <li><img src="${this.res[i].img2}"/></li>
                    <li><img src="${this.res[i].img3}"/></li>
                    <li><img src="${this.res[i].img4}"/></li>
                    <li><img src="${this.res[i].img5}"/></li>`
                break;
            }
        }
        $(this.img_ul).html(str)
        $("#exzoom").exzoom();
    }
}
new dotd();