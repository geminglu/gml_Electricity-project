import "./jquery-1.12.4.js";
import "./jquery_cookie.js";
import "./jquery.exzoom.js";
import "./distpicker.data.js";
import "./distpicker.js";

$(".sidebar1").load("html/sidebar.html");

class dotd {
    constructor () {
        this.h2 = $(".page_main>h2");
        this.h3 = $(".page_main>h3");
        this.img_ul = $(".exzoom_img_ul");
        this.but = $(".gwc");
        this.comoiy = $(".commodity");
        this.gm = $(".gm");
        this.jg = $(".page_main_right_price span");
        this.cook = $.cookie("spid");
        // 获取当前商品的id
        this.id = $.cookie("spid");
        this.ajaxqq();
        this.addEvent();
    }
    // 请求数据
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
    // 渲染数据
    display() {
        var that = this;
        var str = "";
        var str1 = "";
        var str2 = "";
        // console.log(this.res[1].image.length)
        for (let i=0;i<this.res.length;i++) {
            if (this.res[i].doosid == this.cook) {
                $(this.h2).html(this.res[i].name);
                $(this.h3).html(this.res[i].title);
                $(this.jg).html(this.res[i].jiage)
                for (let q=0;q<this.res[i].color.length;q++) {
                    str1 += `<li><img src="${this.res[i].img}" alt="">${this.res[i].color[q]}</li>`
                }
                for (let q=0;q<this.res[i].memory.length;q++) {
                    str2 += `<li class="ver">${this.res[i].memory[q]}</li>`;
                }
                for (let j=0;j<this.res[i].image.length;j++) {
                    str += `<li><img src="${this.res[i].image[j]}"/></li>`;
                }
                break;
            }
        }
        $(this.img_ul).html(str)
        $("#exzoom").exzoom();
        $(".page_main_right_versions").children("ul").eq(0).html(str1);
        $(".page_main_right_versions").children("ul").eq(1).html(str2);
        this.option();
    }
    addEvent() {
        let that = this;
        this.but.on("click",function() {
            that.num = that.comoiy.val();
            console.log(that.num)
            that.setCookie();
            console.log($.cookie())
        })
        this.gm.on("click",function () {
            location.href = "../html/cart.html";
        })
    }
    option() {
        // $(".page_main_right_versions").children("ul").eq(0).children().css("border","1px solid rgb(223, 223, 223)");
        $(".page_main_right_versions").children("ul").eq(0).children().on("click",function() {
            $(".page_main_right_versions").children("ul").eq(0).children().css("border","1px solid rgb(223, 223, 223)");
            $(this).css("border","1px solid #03A9F4");
        })
        $(".page_main_right_versions").children("ul").eq(1).children().on("click",function() {
            $(".page_main_right_versions").children("ul").eq(1).children().css("border","1px solid rgb(223, 223, 223)");
            $(this).css("border","1px solid #03A9F4");
        })
    }
    setCookie(){
        this.goods = $.cookie("goodsCookie") ? JSON.parse($.cookie("goodsCookie")) : [];
        // 如果cookie里有商品数据就在后面添加数据
        if (this.goods.length < 1) {
            this.goods.push({
                id:this.id,
                num:this.num
            })
        }else{
            // 判断cookie里是否有重复的数据如果有就在当前商品的num添加数值
            var onoff = true;
            for (var i=0;i<this.goods.length;i++) {
                if (this.goods[i].id === this.id) {
                    this.goods[i].num = (this.goods[i].num)*1 + this.num*1;
                    console.log(this.num*1)
                    onoff = false;
                }
            }
            // 如果该商品有重复的就不会执行指一条语句
            if (onoff) {
                this.goods.push({
                    id:this.id,
                    num:this.num
                })
            }
        }
        $.cookie("goodsCookie",JSON.stringify(this.goods),{expires: 7, path: '/'})
    }
}
new dotd();



      $('#distpicker5').distpicker({
        province: '浙江省',
        city: '杭州市',
        district: '西湖区'
      });

