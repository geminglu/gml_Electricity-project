import "./jquery-1.12.4.js";
import "./jquery_cookie.js";

$(".top").load("../html/header.html",function () {

    new search({
        // 页面数据
        list:document.querySelector(".list"),
        // 上一页按钮
        btnL:document.querySelector(".btnL"),
        // 下一页按钮
        btnR:document.querySelector(".btnR"),
        // 导航栏
        pagWarp:document.querySelector(".pagWarp"),
        Page:document.querySelector(".pagWarp>ul"),
        skip:document.querySelector(".skip"),
        skip_but:document.querySelector(".skip li:nth-child(3) [type]"),
        skip_num:document.querySelector(".skip li:nth-child(2) [type]"),
        // 默认页，从0开始
        index:0,
        // 每页显示的数量
        num:4
    });
})
$(".footer1").load("../html/footer.html")
$(".sidebar1").load("../html/sidebar.html")

class search{
    constructor(options) {
        this.ul = $(".box3_main_right_2")
        this.ajaxs();

        this.url = options.url;
        this.list = options.list;
        this.btnL = options.btnL;
        this.btnR = options.btnR;
        // 跳转
        this.skip = options.skip;
        // 跳转文本框
        this.skip_num = options.skip_num;
        // 跳转按钮
        this.skip_but = options.skip_but;
        this.pagWarp = options.pagWarp;
        // 获取页面ul
        this.Page = options.Page;
        // 获取所有页面元素
        this.page_li = this.Page.children;
        // 如果index没有传参默认为0
        this.index = options.index || 0;
        // 如果num没有传参默认就为5，（一夜有五条数据）
        this.num = options.num || 5;

    }
    ajaxs(){
        var that = this;
        $.ajax({
            url:"../data/data.json",
            success:function(a){
                that.res = a;
                that.display();
                that.pagination();
            },
            dataType:"json",
        })
    }
    display(){
        var str = "<h2>以下是您搜索到的数据</h2>";
        this.qwe = 0;
        for (let i=0;i<this.res.length;i++) {
            for (let j=0;j<this.res[i].label.length;j++) {
                if ($.cookie("suosou") == this.res[i].label[j]) {
                    this.qwe++;
                }
            }
        }
        for (let i=this.index*this.num;i<(this.index+1)*this.num;i++) {
            for (let j=0;j<this.res[i].label.length;j++) {
                if ($.cookie("suosou") == this.res[i].label[j]) {
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

    pagination(){
        // 通过数据的总长度(this.res_l)和每页数据的数量(this.num)求出要显示多少页(this.maxnum)
        this.maxnum = Math.ceil(this.qwe/this.num);
        // 将页码数添加到页面上
        this.skip.firstElementChild.firstElementChild.innerHTML = this.maxnum;
        let str = "";
        for (let i=0;i<this.maxnum ;i++) {
            str += `
                <li>${i+1}</li>
            `;
        }
        this.Page.innerHTML = str;
        // 给当前页码添加样式
        this.page_li[this.index].classList.add("activate");
    }

    addEvent() {
        $(".bgmobile").on("click",function () {
            $.cookie("spid",this.id,{expires: 7, path: '/'})
            location.href = "./detailPage.html";
        })


        let that = this;
        this.btnR.onclick = function () {
            that.index == that.maxnum-1? that.index = 0 : that.index++;
            that.setActive();
        }
        this.btnL.onclick = function () {
            that.index == 0? that.index = that.maxnum-1 : that.index--;
            that.setActive();
        }
        for (let i=0;i<this.maxnum;i++) {
            this.page_li[i].index = i;
            this.page_li[i].onclick = function () {
                that.index = that.page_li[i].index;
                that.setActive();
            }
        }
        this.skip_but.onclick = function () {
            that.skip_num.style.color = "#000";
            // 必须在页码数量范围内才能跳转
            if (that.skip_num.value-1 >= 0 && that.skip_num.value-1 < that.maxnum) {
                // 把输入的数赋值给索引(that.index);
                that.index = that.skip_num.value-1;
                that.skip_num.value = "";
                that.setActive();
            }else{
                // 如果输入的数不在范围内就把文字便成红色
                that.skip_num.style.color = "#f00";
            }
            // console.log(that.skip_num.value-1);
            // console.log(that.maxnum);
        }
    }


            // 重新渲染页面和页码
            setActive(){
                this.display();
                for (let i=0;i<this.maxnum;i++) {
                    this.page_li[i].classList.remove("activate");
                }
                this.page_li[this.index].classList.add("activate");
            }

}