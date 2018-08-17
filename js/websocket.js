
var websocket = new WebSocket("ws://ceshiduojin.huanlejc.com:9588?request=index/index&token="+PARAMS.token+"&shop_id="+shop_id+"");
if(websocket.readyState == WebSocket.CONNECTING){
    console.log("连接正在建立..");
}
websocket.onopen = function (evt) {
	if(websocket.readyState==WebSocket.OPEN){
		console.log('连接成功！');
	}else{
		console.log('连接失败！');
	}
};

//onmessage 监听服务器数据推送
websocket.onmessage = function (evt) {	
	console.log(evt);
	var data = eval('(' + evt.data + ')');
	var type = data.type;
	var data = data.data;
	try{
		socket_message(data,type);
	}
	catch (e){
	}
    
};
//监听连接错误信息
websocket.onerror = function (evt, e) {
	socketStatus=false;
};

websocket.onclose=function(e){
	socketStatus=false;
};

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
	if(websocket.readyState==WebSocket.OPEN){
		websocket.send(paramsJson);
		console.log(paramsJson)
	}else{
		websocket.send(paramsJson);
	}	
}