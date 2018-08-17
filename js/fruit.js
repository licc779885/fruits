var socket_url="";
var myUid;
var wsServer;
var websocketObj;
var webShop_id;
var tiyData,tiyDataData,tiyStatus,tiyNumber,tiyGold;
var LOAD_IMG = null;
var NUMBER_ID = null;
var G_is_card=0;
function loadgetnewImg()
{
    $.post("/index/get_last",{number_id:NUMBER_ID},function(data){
        if(data.status){
            $(".lottery_img_list[data='"+NUMBER_ID+"']").find("img").attr("src",data.data.lottery_img);
            clearInterval(LOAD_IMG)
            //LOAD_IMG = null;
        }
    },"json");
}
var g_data;
$.ajax({
	type:"post",
	url:'/index/index',
	async:false,
	data:PARAMS,
	success:function(data){
		g_data=data;
	}
});

var jsp=JSON.parse(g_data);
webShop_id=jsp.shop_id;
socket_url=jsp.socket_url;
wsServer="ws:" + socket_url+"?request=index/index&token="+PARAMS.token+"&shop_id=" + webShop_id;
websocketObj=new websocketFun();
websocketObj.run(); 

var successFun=function(data){
	{
		  var jsp=JSON.parse(data);
          console.log(jsp);
		  var shop_id=jsp.shop_id;
		  var tl=$(".outer_list li");
		  var f_len=jsp.fruits.length;
		  var menu=$(".dom_menu a.btn_menu");
		  var menu_len=jsp.shoplist.length;
		  var ht=$(".dl_fr li");
		  var history_len=jsp.shoplist_number.length;
		  var html="";
		  var whtml="";
		  var dhtml='';
		  var listHtml='';
		  var win_len=jsp.win_member_order.length;
		  var nowTime=parseInt(jsp.nowtime);
		  var number_id=jsp.shoplist_number[0].number_id;
		  var mLen=jsp.member_order.length;   

		  if(!PARAMS.token==""){
		  	  var memberInfo=JSON.parse(jsp.member);
		      myUid=memberInfo.uid;
//		      console.log(myUid);
			  if(typeof(memberInfo.give_money) == "undefined"){
			  	$(".gold_num .num").text("0");
			  }else{
			  	$(".gold_num .num").text(memberInfo.give_money);
			  }
		  }else{
		  	$(".gold_num .num").text("0");
		  	myUid="";
		  }

		  $(".now_time").text(nowTime);
		  $(".onnumber .stn").text(mLen);
		  $(".table_number .qishu").text(number_id);
		  
//		  console.log(jsp);	    
          wsServer="ws:" + socket_url+"?request=index/index&token="+PARAMS.token+"&shop_id=" + shop_id;
          var websocketObj=new websocketFun();
          websocketObj.run();                         
		  
		  for(var fl=0;fl<f_len;fl++){
		  	var imt=jsp.fruits[fl].img;
		  	var tit=jsp.fruits[fl].fruits_k;
		  	var touk=jsp.fruits[fl].title;
		  	$(tl[fl]).addClass(tit);
		  	$(tl[fl]).find(".imt").children("img").attr("src",imt);
		  	$(tl[fl]).find(".imt").children("img").attr("title",tit);
		  	$(tl[fl]).find(".imt").children("img").attr("data_num",touk);
		  }
		  for(var ml=0;ml<menu_len;ml++){
		  	var menu_title=jsp.shoplist[ml].title;
		  	var win_dou=jsp.shoplist[ml].win_dou;
		  	var id_url=jsp.shoplist[ml].shop_id;
		  	var shop_dou=jsp.shoplist[ml].dou;
		  	var title_img=jsp.shoplist[ml].img_1;
		  	$(menu[ml]).find(".st_num").text(win_dou);
		  	$(menu[ml]).find(".win_dou").text(win_dou);
		  	$(menu[ml]).find(".shop_url").text(shop_id);
          $(menu[ml]).find(".shop_dou").text(shop_dou);
          $(menu[ml]).find(".shop_title").text(title_img);
          console.log(window.location.host);
          var url = "?token="+PARAMS.token+"&shop_id="+id_url;
//        url = changeURLArg(url,"shop_id",id_url); 
//        url=url+"shop_id="+shop_id;
//        console.log(id_url+":"+id_url+":"+url);
          if(id_url == shop_id){
              var active = "active";
          }else{
              var active = "";
          }
          ltUrl="index.html?shop_id="+id_url+"&token="+PARAMS.token;
          inUrl="list.html?shop_id="+id_url+"&token="+PARAMS.token;
		  dhtml+='<a href="'+url+'" class="btn_menu btn w'+shop_dou+' '+active+'">';
		  dhtml+='<span class="shop_url">'+id_url+'</span>';
		  dhtml+='<em class="ty_num"></em>';
		  dhtml+='<span class="shop_dou">'+shop_dou+'</span>';
		  dhtml+='<span class="shop_title">'+title_img+'</span>';
		  dhtml+='<span class="win_dou">'+win_dou+'</span>';
		  dhtml+='<strong class="stn st_num">'+win_dou+'</strong>';
		  dhtml+='<strong class="stn st_act">金豆场</strong>';
		  dhtml+='</a>';
          $(".dom_menu .dm_fl").html(dhtml);
          listHtml+='<li class="'+active+'"><a href="'+ltUrl+'">';
          listHtml+='<span class="shop_url">'+id_url+'</span>';
          listHtml+='<div class="imt"><img src="images/fruit_imt2.png"></div>';
          listHtml+='<div class="name">'+win_dou+'金豆场</div>';
          listHtml+='<button class="btn">立即参与</button>';
          listHtml+='</a></li>';
          $(".fruit_list ul").html(listHtml);
          var dou=$(".dom_menu a.active").find(".shop_dou").text();
          var dou_money=$(".dom_menu a.active").find(".win_dou").text();
          var shop_imgUrl=$(".dom_menu a.active").find(".shop_title").text();
//        $(".table_title img").attr("src",shop_imgUrl);
          $(".table_title").text("奖励"+dou_money+"金豆");
		    $(".outer_list li").find(".title").text(dou+"金豆");
		    $(".table_title_text").find(".money").text(dou_money);
//		    $(".dom_menu a.btn_more").attr("href",inUrl);
		   
		  }
		  
        for(var hl=1;hl<history_len;hl++){
        	var hl_imt=jsp.shoplist_number[0].img;
          var win_title=jsp.shoplist_number[hl].title;
          var win_img=jsp.shoplist_number[hl].lottery_img;
          var win_name=JSON.parse(jsp.shoplist_number[hl].win_user).nickname;
          if(win_img==""){
          	win_img="images/icon_x.png";
              console.log(jsp.shoplist_number[hl]);
              NUMBER_ID = jsp.shoplist_number[hl].number_id;
              LOAD_IMG = setInterval("loadgetnewImg()",500);             
          }
          var html='<li class="lottery_img_list" data="'+jsp.shoplist_number[hl].number_id+'"><span><img src="'+win_img+'"></span></li>';
          var whtml='<li>恭喜<span class="name">'+win_name+'</span>在水果大作战<span class="cfd">'+win_title+'获胜</span></li>';
          
        	$(".latest").find("img").attr("src",hl_imt);
        	$(".dl_fr ul").append(html);
        	$(".txtMarquee-top ul").append(whtml);
        	
        }
        jQuery(".txtMarquee-top").slide({mainCell:".bd ul",autoPlay:true,effect:"topMarquee",interTime:80,trigger:"click",mouseOverStop:false});
        
        for(var wl=0;wl<win_len;wl++){
        	var wl_name=JSON.parse(jsp.win_member_order[wl].user).nickname;
        	var wl_img=JSON.parse(jsp.win_member_order[wl].user).img;
        	var w_dou=jsp.win_member_order[wl].spend_dou;
        	var num_id=jsp.win_member_order[wl].shop_id;
        	
        	$(tl[wl]).find(".user").children("img").attr("src",wl_img);
        }

        for(var pl=0;pl<mLen;pl++){
		  	var membertou_key=jsp.member_order[pl].tou_key;                      //购买的水果
		    var memberspend_dou=jsp.member_order[pl].spend_dou;                  //购买所花金豆
		    var memberNickname=JSON.parse(jsp.member_order[pl].user).nickname;   //购买玩家名称
		    var memberImg=JSON.parse(jsp.member_order[pl].user).img; 
		    var List= $(".outer_list li."+membertou_key);
		    List.addClass("active");
		    List.find(".user").children("img").show();
		    List.find(".user").children("img").attr("src",memberImg);
		  }
        
        
        
		}
}

$(function(){
	var data="index/index";
	if(typeof(PARAMS.token) == "undefined"){
	   	PARAMS.token = ""; 
                myUid="";
	}
	
	successFun(g_data);
	
	//购买
	$(".outer_list a").addClass("btn");
	$(".outer_list li a.btn .imt").live("touchstart",function(){
	  var ti=$(this);
	  var money=parseInt($(".gold_num .num").text());
	  var touz_dou=parseInt($(".outer_list li .title").text());
	  var touk=ti.find("img").attr("title");
	  var num=$(".table_number .qishu").text();
	  if(parseInt($(".tiyan_number").text())>0){
			G_is_card=1
		}else{
			G_is_card=0
	   }
	  if(objc==false){
	  	console.log("已经被别人投注啦");
	  	$(".tisText").fadeIn();
		$(".tisText .tisInfo").text("已经被投注");
		setTimeout(function(){
			$(".tisText").fadeOut();
		},500)
	  	return false;
	  }
	  if($(this).parent().parent().hasClass("active")){
	  	$(".tisText").fadeIn();
		$(".tisText .tisInfo").text("该商品已被选中！");
		setTimeout(function(){
			$(".tisText").fadeOut();
		},500)
	  	return false;
	  }
	  if(PARAMS.token== ""){
	  	alert("请登录");
	  	return false;              
      }
	  if(money<touz_dou&&tiyNumber<=0){
	  	$(".tanc_cz").show();
	  	return false;
	  }

        params={}  
        params.is_card=G_is_card;
        params.tou_key=touk;
        params.number_id=num;
        params.request="index/buy";
        params.token=PARAMS.token;
        websocketSend(params); 
        console.log(params);
	});
	
	$(".outer_list li a.tis").live("touchstart",function(){
		$(".tisText").fadeIn();
		$(".tisText .tisInfo").text("已购买商品");
		setTimeout(function(){
			$(".tisText").fadeOut();
		},500)
	});
	
	$(".dom_menu a.btn_menu").addClass("btn");
	$(".dom_menu a.btn").live("click",function(){
		var ti=$(this);
		var temp_text=ti.find(".shop_url").text();
		var dou=ti.find(".st_num").text();   
		var win_dou=ti.find(".win_dou").text();
		window.location.href="?shop_id="+temp_text+"&token="+PARAMS.token;
		//多少金豆场
    	ti.addClass("active").siblings().removeClass("active");
    	$(".tanc_my .num").text(win_dou+"金豆");
    });

    //获取链接参数
    function getUrlParam(name){  
    //构造一个含有目标参数的正则表达式对象  
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
	    //匹配目标参数  
	    var r = window.location.search.substr(1).match(reg);  
	    //返回参数值  
	    if (r!=null) return unescape(r[2]);  
	    return null;  
	};
    //
    $(".shop_id").text(getUrlParam("shop_id"));
    
    $(".order a").click(function(){
    	var order='';
    	var order_url="index/record";
    	if(PARAMS.token== ""){
			$(".tanc_order .none").show();
			$(".tanc_order .order_list").hide();
			return false;
		}
    	$.ajax({
    		type:"post",
    		url:order_url,
    		async:true,
            data:PARAMS,
    		success:function(data){
    			var jsOrder=JSON.parse(data);
    			var userOrder=jsOrder.data;
    			var userOrderLen=jsOrder.data.length;
    			console.log(jsOrder);
    			if(userOrderLen<1){
    				$(".tanc_order .none").show();
    				$(".tanc_order .order_list").hide();
    			}else{
    				$(".tanc_order .none").hide();
    				$(".tanc_order .order_list").show();
//  				console.log(userOrderLen)
    			}
    			for(var ol=0;ol<userOrderLen;ol++){
    				var userInfo=jsOrder.data[ol];
    				var userTitle=userInfo.title;
    				var userNumber=userInfo.number_id;
    				var userBuy=userInfo.buy_title;
    				var userSpend=userInfo.sum_dou;
    				var userTime=userInfo.add_time;
    				var lottery_title=userInfo.lottery_title;
    				var lottery_img=userInfo.lottery_img;
    				var lottery_key=userInfo.lottery_key;
    				var sumDou=userInfo.sum_dou;
    				var winStatus=userInfo.status_info;
    				var userOrderBuy=userOrder[ol].data;
    			    var userOrderBuyLen=userOrderBuy.length;
    				var olHtml="";
    				 if(userInfo.ext){
                        var obj_dou = JSON.parse(userInfo.ext);
                        if(obj_dou){
                            var winDou=obj_dou.win_dou;
                        }else{
                            var winDou= "";
                        }                                    
                        }else{
                            var winDou= "";
                        }

    				
    				if(parseInt(winStatus)==0){
    					wt="";
    					at="not_known";
    					atText="未买完";
    					lottery_title="?";
    					lottery_img="images/icon_x.png";
    				}else if(parseInt(winStatus)==1){
    					wt="";
    					at="not_known";
    					atText="开奖中";
    				}else if(parseInt(winStatus)==3){
    					wt="guess";
    					at="ok_guess";
    					atText="奖励"+winDou+"金豆";
    					
    				}else if(parseInt(winStatus)==4){
    					wt="";
    					at="not_guess";
    					atText="未猜中";
    				}else if(parseInt(winStatus)==5){
    					wt="";
    					at="not_guess";
    					atText="正在揭晓";
    					lottery_title="?";
    					lottery_img="images/icon_x.png";
    				}
    				
    				for(var old=0;old<userOrderBuyLen;old++){
    					var tou_title=userOrderBuy[old].tou_title;
    					var tou_img=userOrderBuy[old].tou_img;
    					var tou_key=userOrderBuy[old].tou_key;
    					var tou_key_class=tou_key;
    					if(lottery_key==tou_key){
    						tou_key_class=tou_key+ '';
    					}else{
    						tou_key_class=tou_key;
    					}
    					
    					olHtml+='<dd class="'+tou_key_class+'">';
    					olHtml+='<div class="name">'+tou_title+'</div>';
    					olHtml+='<div class="imt"><img src="'+tou_img+'"></div>';
    					olHtml+='</dd>';
    				}
//  				console.log(userInfo);
    			    var canyTime=new Date(parseInt(userTime) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");   
    				order+='<li class="'+lottery_key+" "+wt+'">';
    				order+='<div class="top">';
    				order+='<div class="fl top_fl">';
    				order+='<div class="tou_time">时间：<span class="time">'+canyTime+'</span></div>';
    				order+='<div class="tou_changci">场次：<span class="num">'+userTitle+'</span></div>';
    				order+='</div>';
    				order+='<div class="fr top_fr">';
    				order+='<div class="tou_all">共投<span class="money">'+userSpend+'</span>金豆</div>';
    				order+='<div class="'+at+'">'+atText+'</div>';
    				order+='</div>';
    				order+='</div>';
    				order+='<div class="dom">';
    				order+='<div class="dom_title">';
    				order+='<div class="fl">期号：<span class="num">'+userNumber+'</span></div>';
    				order+='<div class="fr">本期揭晓水果：<span class="name">'+lottery_title+'</span><img src="'+lottery_img+'"></div>';
    				order+='</div>';
    				order+='<div class="dom_list">';
    				order+='<label>已选择水果：</label>';
    				order+='<dl>'+olHtml+'</dl>';
    				order+='</div>';
    				order+='</div>';
    				order+='</dl>';
    			}
    			$(".order_list").html(order);
    		}
    	});
    });
    
    //体验卡
    $.post("/sns/cardlist",{game_id:4,token:PARAMS.token},function(data){
		tiyData=data;
		tiyDataData=tiyData.data;
		tiyStatus=parseInt(tiyData.status);
		console.log(tiyData);
		if(tiyDataData==null){
			$(".table_tiyan").addClass("over");
			$(".tiyan_number").text(0);
			return false;
		}
		$(".table_tiyan").removeClass("over");
		for(var ty=0;ty<tiyDataData.length;ty++){
			tiyNumber=parseInt(tiyDataData[ty].number);
			tiyGold=parseInt(tiyDataData[ty].gold);
            $(".dm_fl a.w"+tiyGold+"").find(".ty_num").text(tiyNumber);
//          setTimeout(function(){
//          	tiyNumber=parseInt($(".dm_fl a.w"+tiyGold+".active").find(".ty_num").text());
//          },200)
		}
		tiyNumber=$(".turntable a.btn_menu.active .ty_num").text();
		if(tiyNumber==""){
			tiyNumber=0;
			G_is_card=0;
			$(".table_tiyan").hide();
			$(".turntable a.btn_menu.active").find(".ty_num").text(0);
			$(".table_tiyan").addClass("over");
		}
		$(".tiyan_number").text(tiyNumber);
		
	},"json");
     
});