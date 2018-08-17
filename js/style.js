$(function(){
	//点击是否提醒
	$(".tix_check").click(function(){
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
		}else{
			$(this).removeClass("active");
		}
	});
	//订单弹窗隐藏
	$(".turntable .order a").click(function(){
		$(".tanc_order").show();
		$(".tanc_order_text").css("bottom","0");
//		$(".tanc_order_text").removeClass("bounceOutDown");
	});
	$(".tanc_order .tanc_beij").click(function(){
		$(".tanc_order_text").css("bottom","-40.0rem");
		setTimeout(function(){
		  $(".tanc_order").hide();	
		},600)
	});
	//规则弹窗
	$(".turntable .rule a").click(function(){
		$(".tanc_rule").show();
		$(".tanc_order_text").css("bottom","0");
//		$(".tanc_order_text").removeClass("bounceOutDown");
	});
	$(".tanc_rule .tanc_beij").click(function(){
		$(".tanc_order_text").css("bottom","-40.0rem");
		setTimeout(function(){
		  $(".tanc_rule").hide();	
		},600)
		
	});
	//充值弹窗关闭
    $(".tanc_cz .tanc_beij,.tanc_cz .btn a").click(function(){
    	$(".tanc_cz").hide();
    });
    //
    $(".tanc_create .tanc_beij,.tanc_create .btn_close").click(function(){
    	$(".tanc_create").hide();
    });
    $(".huoq_close,.tanc_huoq .tanc_beij").click(function(){
    	$(".tanc_huoq").hide()
    });
    $(".btn_refresh").click(function(){
    	window.location.reload();
    	$(".noline").hide();
    })
	
})

//中奖信息效果
function zhongj(){
	$(".tanc_win .cd").addClass("bounceIn");
	$(".tanc_win .title").addClass("bounceInDown");
	$(".tanc_win .gold").addClass("bounceInDown");
	$(".tanc_win .num").addClass("bounceInUp");
	$(".tanc_win .btn").addClass("bounceInUp");
	$(".tanc_win .cd").removeClass("bounceOut");
	$(".tanc_win .title").removeClass("bounceOutUp");
	$(".tanc_win .gold").removeClass("bounceOutUp");
	$(".tanc_win .num").removeClass("bounceOutDown");
	$(".tanc_win .btn").removeClass("bounceOutDown");
};

//中奖信息消失效果
function disable(){
	$(".onresult").hide();
	$(".onnumber").show();
	$(".tanc_win .cd").addClass("bounceOut");
	$(".tanc_win .title").addClass("bounceOutUp");
	$(".tanc_win .gold").addClass("bounceOutUp");
	$(".tanc_win .num").addClass("bounceOutDown");
	$(".tanc_win .btn").addClass("bounceOutDown");
	$(".my_fruit").text("");
	$(".outer_list li").find(".user").children("img").hide();
	$(".outer_list li").find(".user").children("img").attr("src","");
	$(".table .table_zz").hide();
	
	setTimeout(function(){
		window.location.reload();
//		$(".tanc_win").hide();
	},1200)
}
//自己中奖
function my(){
	$(".tanc_mySuccess").show();
}
//他人中奖
function other(){
	$(".tanc_myOther").show();
}




































