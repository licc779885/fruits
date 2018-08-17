var objt=true;
var objc;
var obj;

function socket_message(data,type){
//	console.log(data)
	switch(type){
		case 'success':
		success(data);
		break;
		case 'buy_success':
		if(objt){
			buy_success(data);
		}
		break;
		case 'win_message':
		win_message(data);
		break;
		case 'error':
		error_text(data);
		break;
		case 'buy_mine_ok':
		buy_mine_ok(data);
		break;
		default :
		if(type&&data){
//		  console.log("ccc");
		}
	}
}

function buy_mine_ok(data)
{
	var money=parseInt($(".gold_num .num").text());
	tiyNumber=parseInt($(".tiyan_number").text());
    
	if(G_is_card==1){
		tiyNumber-=1;
		money=money;
	}else{
		money=money-parseInt(data);
	}
    if(tiyNumber<=0){
    	G_is_card=0;
    	tiyNumber=0;
    	$(".table_tiyan").addClass("over");
    }
    $(".tiyan_number").text(tiyNumber);
    $(".gold_num .num").text(money);
    $(".tisText").fadeIn();
    $(".tisText .tisInfo").text("购买成功！");
    setTimeout(function(){
            $(".tisText").fadeOut();
    },500)    
}

function success(data){
//	console.log(data);
}

function error_text(data){
	console.log(data);
	objc=false;
	$(".tisText").fadeIn();
	$(".tisInfo").text(data);
	setTimeout(function(){
		$(".tisText").fadeOut();
	},500);
	return false;
}
function buy_success(data){
	console.log(data);
//	console.log("type--" + data.number_id);
	objc=true;
	var dnum=data.length;
	for(var bm=0;bm<dnum;bm++){
		var jsDate=JSON.parse(data[bm].user)
		var buy_img=jsDate.img;
		var buy_name=jsDate.nickname;
		var buy_tou_key=data[bm].tou_key;                         //购买水果  
		var List= $(".outer_list li."+buy_tou_key);               //购买状态
		var number_id=data[bm].number_id;                         //购买期数
		var add_time=data[bm].addtime;                            //购买时时间
		var padd_time=parseInt(add_time);                         //购买时时间数字话                           
		var spend_dou=data[bm].spend_dou;                         //下注金豆
		var cany_dou=JSON.parse(data[bm].ext).win_dou;            //参与的场次
		var uid=data[bm].uid;                                     //获取投注的uid
		List.addClass("active");
		var ListLen=$(".outer_list li.active").length;
		List.find(".user").children("img").show();
		if(buy_img==""||buy_img=="undefind"||buy_img==null){
			buy_img="images/user_img.png";
		}
		List.find(".user").children("img").attr("src",buy_img);
		$(".onnumber .stn").text(ListLen);	
		if(parseInt(uid)==parseInt(myUid)){
            $(".other." + buy_tou_key).addClass("my");
		}
	}
	
}


function win_message(data){
	objt=false;
	console.log(data);
//	console.log("type--" + data.number_id);
	var money=parseInt($(".gold_num .num").text());          //自己的金豆
	var number_id=data.number_id;                            //期数
	var lottery_dou=data.win_dou;                            //中奖金豆
	var lottery_key=data.lottery_key;                        //中奖水果
	var lottery_img=data.lottery_img;                        //中奖水果图片
	var lottery_title=data.title;                            //中奖所在场次
	var lottery_name=JSON.parse(data.win_user).nickname;     //中奖玩家名称
	var lottery_userImg=JSON.parse(data.win_user).img;       //中奖玩家图片
	var lottery_time=parseInt(data.lottery_time);
	var lottery_uid=data.win_uid;
	var now_time=parseInt($(".now_time").text());
	var cy_time=parseInt((now_time-lottery_time)/1000)+1;
	var zjImg='<li><span><img src="'+lottery_img+'"></span></li>';
	var zjName=$(".outer_list li."+lottery_key).find(".imt").children("img").attr("data_num");
	var rollList='<li>恭喜<span class="name">'+lottery_name+'</span>在水果大作战<span class="cfd">'+lottery_title+'获胜</span></li>';
 
	if(lottery_key=="banana12"){
		$(".roll_deg").text(0.944);
	}else if(lottery_key=="banana11"){
		$(".roll_deg").text(0.875);
	}else if(lottery_key=="banana10"){
		$(".roll_deg").text(0.791);
	}else if(lottery_key=="banana9"){
		$(".roll_deg").text(0.708);
	}else if(lottery_key=="banana8"){
		$(".roll_deg").text(0.625);
	}else if(lottery_key=="banana7"){
		$(".roll_deg").text(0.541);
	}else if(lottery_key=="banana6"){
		$(".roll_deg").text(0.458);
	}else if(lottery_key=="banana5"){
		$(".roll_deg").text(0.375);
	}else if(lottery_key=="banana4"){
		$(".roll_deg").text(0.291);
	}else if(lottery_key=="banana3"){
		$(".roll_deg").text(0.208);
	}else if(lottery_key=="banana2"){
		$(".roll_deg").text(0.125);
	}else if(lottery_key=="banana1"){
		$(".roll_deg").text(0.041);
	};
	roll_deg=parseFloat($(".roll_deg").text());
//	console.log(roll_deg);
	gotorun();
	$(".outer_list li").removeClass("active");
	$(".outer_list li").removeClass("my");
	
	setTimeout(function(){
	    $(".txtMarquee-top ul").prepend(rollList);
		$(".onresult .result_text").text(zjName);
		$(".onnumber .stn").text(0);
		$(".table_number .qishu").text(number_id);
		$(".outer_list a").addClass("btn");
	},5300);
	if(parseInt(lottery_uid)==parseInt(myUid)){
		console.log("恭喜猜中！");
		setTimeout(function(){
			zhongj();
		    my();
		    $(".tanc_mySuccess .tanc_my .num").text(lottery_dou+"金豆");
		},5300);
		setTimeout(function(){
			$(".table .table_zz").hide();
			window.location.reload();
		},10000)
	}else{
		setTimeout(function(){
			console.log("未猜中！");
			zhongj();
	        $(".tanc_other .title_text .name").text(lottery_name);
	        $(".tanc_other .title_text .num").text(number_id);
	        $(".tanc_other .gold_imt").find("img").attr("src",lottery_img);
	        $(".tanc_other .num .stn").text("【"+zjName+"】");
	        $(".tanc_other .num .num").text("【"+lottery_dou+"金豆】");
			other(); 
		},5300);
		setTimeout(function(){
			$(".table .table_zz").hide();
			window.location.reload();
		},10000)
	}
}

function gotorun(){
	if($(".outer_list").find('ul').find(".active").length==12){
	    var obj=$('.KinerLotteryBtn').eq(0);
	    KinerLottery.run(obj);
	    $(".table .table_zz").show();
	}
}
