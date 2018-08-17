var websocket,websocketSetInt=0,iskick_off=false;
var wsServer="";
var websocketFun=function(){
	var self=this;
	this.connectNum=0;
	this.reConnectKey;
	this.xtTime=0;//心跳频率
	this.reConnectTime=3000; //重连时间
	this.reloadSendKey=false;
	
	this.run=function(){
		websocket = new WebSocket(wsServer);
		
		if(websocket.readyState == WebSocket.CONNECTING){
		    console.log("连接正在建立..");
		}
		
		websocket.onopen = function (evt) {
			if(websocket.readyState==WebSocket.OPEN){
				console.log('连接成功！');
			}else{
				console.log('连接失败！');
			}
			self.reConnectKey=window.setTimeout(self.reConnect,self.reConnectTime);
		};
		
		//onmessage 监听服务器数据推送
		websocket.onmessage = function (evt) {
			var data = eval('(' + evt.data + ')');
			console.log(data);
			var type = data.type;
			var data = data.data;
			
			if(type=='reload_send'){
				self.reloadSendKey=true;
				window.setTimeout(self.reloadSendKeyClear,self.reConnectTime*5);
			}
			
			try{socket_message(data,type);}catch(e){};
		};
		
		//监听连接错误信息
		websocket.onerror = function (evt, e) {
			console.log("连接出错!");
			setTimeout(function(){
				$(".noline").show();
			},1500)
		};

		websocket.onclose=function(e){
			console.log("连接中断!");
			setTimeout(function(){
				$(".noline").show();
			},1500)
		};
	}	
	
	//检查是否断网
	this.isOnline=function(){
		return false;
		$.ajax({
			url:'/index/isonline',
	　　		timeout : 5000,
	　　	success:function(data){
	　　	},
	　　	error : function(data){
	　　		error_msg('断网了');
	        $(".noline").show();
	　　	}
		});
	}
	
	
	//心跳
//	this.xt=function(){
//		if(self.xtTime==5){
//			var params=PARAMS;
//			params.request="public/guest";
//			websocketSend(params);
//			self.xtTime=0;
//		}else{
//			self.xtTime++;
//		}		
//	}
	//重连
//	this.reConnect=function(){
//		return false;
//		if(iskick_off==true){  //被踢 停止重连
//			clearTimeout(self.reConnectKey);
//		}else{
//			var isR=false; //是否需要重连
//			if(self.reloadSendKey==true){
//				
//			}else{
//				try{
//					if(websocket.readyState==WebSocket.OPEN){
//					}else{
//						isR=true;
//					}
//				}catch(e){
//					isR=true;
//				}
//			}
//			if(isR){
//				websocket.close();
//				self.connectNum++;
//				if(self.connectNum>10){
//					window.location.reload();
//				}else{
//					self.run();
//				}
//			}else{
//				self.connectNum=0;
//				self.isOnline();
//				self.xt();
//			}
//		
//			clearTimeout(self.reConnectKey);
//			self.reConnectKey=window.setTimeout(self.reConnect,self.reConnectTime);
//		}		
//		
//	}
	
	this.reloadSendKeyClear=function(){
		self.reloadSendKey=false;
	}
}

//var websocketObj=new websocketFun();
//websocketObj.run();

if(typeof window.onbeforeunload !=='undefined'){
	window.onbeforeunload  = function(){
		websocket.close();
	};
}else if(typeof window.onunload !=='undefined'){
	window.onunload  = function(){
		websocket.close();
	};
}

function jsonToStr(json){
	var arr=new Array();
	for(var i in json){
		var str='"'+i+'"'+':'+'"'+json[i]+'"';
		arr.push(str);
	}
	var str=arr.join(',');
	return '{'+str+'}';
}
function websocketSend(params){
	var paramsJson=jsonToStr(params);
	websocket.send(paramsJson);
}

