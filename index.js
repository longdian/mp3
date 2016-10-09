$(function() {
    var right=$('.right');
    var left=$('.left');
    var index=0;
    var kaishi = $('.kaishi');
    var audio = $('audio').get(0);
    $(document).on("mousedown",false);
    datebase=[{path:'彩虹.mp3',picture:'image/2.jpg',name:'彩虹',geshou:"包师语"},
        {path:'Jam阿敬-七月上.mp3',picture:'image/qi.jpg',name:'Jam阿敬-七月上',geshou:'jam阿敬'},
        {path:'汪苏泷-一笑倾城.mp3',picture:'image/shuang.jpg',name:'汪苏泷-一笑倾城',geshou:'汪苏泷'},
        {path:'G.E.M.邓紫棋-画.mp3',picture:'image/3.jpg',name:'G.E.M.邓紫棋-画',geshou:'邓紫棋'},
        {path:'薛之谦-演员.mp3',picture:'image/qian.jpg',name:'薛之谦-演员',geshou:'薛之谦'},
        {path:'杨宗纬-一次就好.mp3',picture:'image/4.jpg',name:'杨宗纬-一次就好',geshou:'杨宗纬'}
    ];
    $(datebase).each(function(i,v){
        $('<li date-id='+ i +'><a href="" class="id">'+0+''+i+'</a><span class="names">'+v.name+'</span><span class="geshous">'+v.geshou+'</span></li>').appendTo('.list .lizhong');
    });
       var box=$('.box');
   box.css("background","url("+datebase[0].picture+")");
    function diao(){
        var name=datebase[index].name;
        var geshou=datebase[index].geshou;
        var picture=datebase[index].picture;
        $('.ziti .name-list').text(name);
        $('.ziti .geshou-list').text(geshou);
        var ww=datebase[index].picture;
        $('.box').css("background","url("+ww+")");
    };
    function lu(){
        id.css("background-image",'');
         id.removeClass("mm");
        id.eq(index).addClass("mm").css("background-image",ff);
    }
    var lizhong=$('.lizhong');
    var li=$('.lizhong li');
    var ff="url(image/a.png)";
    var id=$('.lizhong .id');

     li.on("dblclick",function (i,v) {
         li.removeClass("wa");
          //点击的时候 直接等于li的date-id
          var next=parseInt($(this).attr("date-id"));
         index=next;
         li.eq(index).addClass("wa");
         dizhi();
         diao();
         lu();
         kaishi.addClass("kaishitwo");
         $(audio).trigger("volumechange");
     });
    function dizhi(){
      var pre=datebase[index].path;
       $(audio).attr('src',pre);
        audio.play();
    };
    //切换歌曲

    right.on("click",function(){
         li.removeClass("wa");
        kaishi.addClass("kaishitwo");
      if($('.xunhuan').hasClass("danqu")){
          alert("单曲")
      }else if($('.xunhuan').hasClass("danquxunhuan")){
          // alert(1)
      }else if($('.xunhuan').hasClass("shuxu")){
          index++;
          if(index==datebase.length){
              index=datebase.length;
          }
      }else if($('.xunhuan').hasClass("bofang")){
          index++;
          if(index==datebase.length){
              index=0;
          }
      }else if($('.xunhuan').hasClass("suiji")){
          index=Math.floor(Math.random()*datebase.length)
      }
        li.eq(index).addClass("wa");
        var pre=datebase[index].path;
        $(audio).attr('src',pre);
        diao();
        lu();
        audio.play();
    });
    left.on("click",function(){
         kaishi.addClass("kaishitwo");
        li.removeClass("wa");
        if($('.xunhuan').hasClass("danqu")){
          // alert("单曲")
      }else if($('.xunhuan').hasClass("danquxunhuan")){
          // alert(1)
      }else if($('.xunhuan').hasClass("shuxu")){
          index-=1;
          if(index==0){
              index=datebase.length;
          }
      }else if($('.xunhuan').hasClass("bofang")){
          index-=1;
      }else if($('.xunhuan').hasClass("suiji")){
          index=Matn.floor(Math.random()*datebase.length)
      }
      index-=1;
        if(index==-1){
            index=datebase.length-1;
        }
        var pre=datebase[index].path;
        $(audio).attr('src',pre);
        li.eq(index).addClass("wa");
        diao();
        lu();
        audio.play();
    });
    //点击开始
    kaishi.on("click", function () {
        kaishi.toggleClass("kaishitwo");
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        li.eq(index).addClass("wa");
         yinliang.removeClass("mama");
        diao();
        lu();
    });
    //    赋值分秒
    //因此需要一个函数将次分秒转换
    function format(str) {
        var num = Number(str);
        var fen = parseInt(num / 60);
        var miao = Math.round(num % 60);
        miao = (miao < 10) ? ('0' + miao) : miao;
        fen = '0' + fen;
        return fen + ':' + miao;  //有返回值因此不同调用函数
    }

    var zong = $('.zong');
    var D = $('.D');
    var Z = $('.Z');
    audio.ontimeupdate = function () {
        //转换出来的不是整分整秒
        D.text(format(audio.currentTime));
        Z.text(format(audio.duration));
        jindu();  //调用jindu这个函数应该在这个歌曲播放过程中一直调用！
    };
     var shichangtiao=$('.shichangtiao');
     var yuan=$('.shichangtiao .yuan')
//    改时长条赋值 让它跟着动
    function jindu() {
        var jindu = ($('.shichangtiao').width() - $('.yuan').width() / 2) * audio.currentTime / audio.duration;
        var jindus=($('.shichangtiao').width() - $('.yuan').width() / 2) * audio.currentTime;
        $('.shichangtiao .yuan').css({left:jindu});
    };
    yuan.on("mousedown",function(){
        $(document).on("mousemove",function (e) {
            var pp=(e.pageX-shichangtiao.offset().left)-(yuan.width()/2);
            if(pp<0){
                pp=0;
            };

            $('.shichangtiao .yuan').css({left:pp});
            audio.currentTime=pp;
        });
        $(document).on("mouseup",function () {
            $(document).off("mousemove");
             $(document).off("mouseup");
        })
    })
//    音量
//    静音
    var yinliang = $('.yinliang');
    var yinyuan = $('.yinyuan');
    var volome = $('.volome');
    var aa=0;
    volome.on("click", function (e) {
         //将现在的音量值保存下来  当前的音量值等于 当前点的那个点除以长条的高度 得到一个百分比 这个百分比就是音量的值
         audio.volume=1-(e.offsetY / $(this).height());
         aa=audio.volume;
    });

    yinyuan.on("mousedown",function(){
        yinliang.removeClass("mama")
    $(document).on("mousemove",function (e) {
        //当点的那个电距离HTml文本的距离减去长条距离浏览器的top值
        var el=volome.height()-(e.pageY-volome.offset().top);
        if(el < 0){
            el=0;
        }
        if(el > 60){
            el=60;
        }
        audio.volume=el/(volome.height()-yinyuan.height()/2);
        // console.log(audio.volume)
    });
        $(document).on("mouseup",function(){
             //清除
             $(document).off("mousemove");
            $(document).off("mouseup");
        })
    });
    //当音量发生变化的时候调用
    audio.onvolumechange=function () {
        var aa=audio.volume*(volome.height()-yinyuan.height()/2);
        // console.log(audio.volume)
        yinyuan.css({bottom:aa});
    };
    $(audio).trigger("volumechange");
    var J=$('.J');
    J.on("click",function(){
        if(!audio.volume==0){
            audio.volume=0;
        }else{
            audio.volume=aa;
        };
        yinliang.toggleClass("mama")
    });
    var vlist=$('.v-list');
    var yinlist=$('.yin-list');
  yinlist.on("mouseover",function(){
     vlist.addClass("kl");
  });
    yinlist.on("mouseout",function(){
     vlist.removeClass("kl");
  });

//    下拉
    var xiala=$('.xiala');
    var list=$('.list')
    xiala.on("mousedown",false);
    xiala.on("mousedown",function(){
        list.toggleClass("kaiguan")
    });

    var top=$('.top');
    var cha=$('.top .cha');
    cha.on("click",function(){
        list.css("display","none");
    });



    var xunhuan=$('.xunhuan')
    var danlist=$('.dan-list');
    var item=$('.dan-list .item');
    var aa=$(".item a")
    xunhuan.on("mousedown",function(){
        danlist.toggleClass("ll");
    });
    
    aa.on("mousedown",function(){
        xunhuan.attr("class","xunhuan");
        xunhuan.addClass($(this).attr("class"))
      })
});
