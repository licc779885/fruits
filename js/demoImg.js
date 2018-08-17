//window.onload=function(){
//	var order_url="index/record";
//	var demo_img_url="images/icon_x.png";
//	$.ajax({
//    		type:"post",
//    		url:order_url,
//    		async:true,
//            data:PARAMS,
//    		success:function(data){
//    			var jsOrder=JSON.parse(data);
//    			var userOrder=jsOrder.data;
//    			var userOrderLen=jsOrder.data.length;
//    			console.log(jsOrder);
//    			for(var ol=0;ol<userOrderLen;ol++){
//    				var userInfo=jsOrder.data[ol];
//    				var lottery_img=userInfo.lottery_img;
//    				var winStatus=userInfo.status_info;
//    				var winPar=parseInt(winStatus);
//                    var setTime=setInterval(function(){
//                    	if(winPar==5){
//                    		demo_img_url=lottery_img;
//                    		clearInterval(setTime);
//                    	}else{
//                    		demo_img_url="images/icon_x.png";
//                    	}
//                    },500)
//    			}
//    			
//    		}
//    		
//    	});
//	
//}









