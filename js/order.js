window.onload=function(){
	var order='';
	var order_url="index/record?token="+PARAMS.token+"";
	$.ajax({
		type:"post",
		url:order_url,
		async:true,
		success:function(data){
			var jsOrder=JSON.parse(data);
			var userOrderLen=jsOrder.data.length;
			if(userOrderLen<1){
				$(".tanc_order .none").show();
				$(".tanc_order .order_list").hide();
			}
			for(var ol=0;ol<userOrderLen;ol++){
				var userInfo=jsOrder.data[ol];
				var userTitle=userInfo.title;
				var userNumber=userInfo.number_id;
				var userBuy=userInfo.buy_title;
				var userSpend=userInfo.spend_dou;
				var userTime=userInfo.add_time;
				
				console.log(userInfo);
				console.log(userTime);
			    var canyTime=new Date(parseInt(userTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');   
				order+='<li><a href="javascript:;">';
				order+='<div class="top">场次：<span class="money">'+userTitle+'</span></div>';
				order+='<div class="dom">';
				order+='<div class="dom_top">';
				order+='<div class="fl">期号：<span class="num">'+userNumber+'</span></div>';
				order+='<div class="fr">参与<span class="fruit">【'+userBuy+'】</span><strong class="money">'+userSpend+'金豆</strong></div>';
				order+='</div>';
				order+='<div class="dom_down">';
				order+='<div class="fl"><span class="time">时间：'+canyTime+'</span></div>';
				order+='<div class="fr"><span class="not_known">未揭晓</span></div>';
				order+='</div>';
				order+='</div>';
				order+='</a></li>';
			}
			$(".order_list").html(order)
		}
	});
	
}













