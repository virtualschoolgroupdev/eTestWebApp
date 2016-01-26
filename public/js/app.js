var socket = io();

socket.on('connect',function(){
	console.log("connected via socket.io!!");
});

socket.on('giveTests',function(obj){
	var $selectSet = jQuery('#TestSet');
	
	var s=jQuery.parseJSON(obj.testsArray);
	jQuery.each(s,function(i,value){
		$selectSet.append("<option value='"+value.id+"'>" + value.qFileName + "</option>");
	});
	
})
$( "#TestSet" ).change(function() {
  alert( "Handler for .click() called." );
  $("#TestSet").prop("disabled",true);
});
//Handles submitting a new message

// $selectSet.append("<option>" + value + "</option>");
		
// 	$selectSet.on('submit',function(event){
// 		event.preventDefault();

// 		socket.emit('message',{
// 			text: $selectSet.find('input[name=message]').val()
// 		});
// 		socket.emit('getTests');
// 		$selectSet.find('input[name=message]').val('');
// 	});