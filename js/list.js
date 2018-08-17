window.onload=function(){ 
    var data="index/shop";
    var listHtml='';
	if(typeof(PARAMS.token) == "undefined"){
	   	PARAMS.token = "";  
	}
	$.ajax({
		type:"post",
		url:data,
		async:true,
		data:PARAMS,
		success:function(data){
		  var lsp=JSON.parse(data);
          console.log(lsp);   
          var lt=lsp.data;
		  var ltLen=lsp.data.length;
//		  console.log(listLen);
		  for(var lmt=0;lmt<ltLen;lmt++){
		    var lt_img=lt[lmt].img;
		    var lt_title=lt[lmt].title;
		    var lt_shopId=lt[lmt].shop_id;
		    var active="";
            
            ltUrl="index.html?shop_id="+lt_shopId+"&token="+PARAMS.token;
            listHtml+='<li class="active"><a href="'+ltUrl+'">'+lt_title;
//          listHtml+='<div class="imt"><img src="'+lt_img+'"></div>';
//          listHtml+='<div class="name">'+lt_title+'</div>';
//          listHtml+='<button class="btn">立即参与</button>';
            listHtml+='</a></li>';
//          $(".fruit_list ul").html(listHtml);
            $(".menu_list ul").html(listHtml);
//         $(".fruit_list").find("li:first-child").addClass("active");
		  }
          
		}
	});
	
}









