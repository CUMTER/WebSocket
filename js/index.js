   	  var socket = io();
   	  $(document).ready(function(){
	      $('#submitBtn').on("click",function(){
	      	var $messageInput = $("#messageInput");
	      	var message = $messageInput.val();
	      	$messageInput.val("");
	        socket.emit('chat message', " " + message);
	        return false;
	      });
	    
	      socket.on('chat message', function(msg){

	      	var chartArea = $('.chat-area');

	      	var messageNum = chartArea.find(".message-item").length;
	      	var messageView = $('<div>').addClass("col-md-12").addClass("message-item").html(msg);

	      	if(messageNum % 2 === 0){
	      		messageView.addClass("text-left");
	      	}else {
	      		messageView.addClass("text-right");
	      	}

	        chartArea.append(messageView);

	      });
   	  });