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
	
});
$( "#TestSet" ).change(function() {
 
  $("#TestSet").prop("disabled",true);
  socket.emit('populateTest',$("#TestSet").val());
  
});


socket.on('giveTestSet',function(obj){
	
	//console.log(obj.ts);
	var $QuestionWindow = jQuery('#QuestionWindow');
	var $Qp = jQuery('#OptionWindow');
	var $Qid = jQuery('#Qid');
	var s=jQuery.parseJSON(obj.ts);
	console.log(s[0]);
	$QuestionWindow.find('p').text(s[0].qText);
	var opttions = s[0].optionSet;
	console.log($Qid);
	jQuery.each(opttions,function(i,value){
		console.log(value);
		$Qid.val(s[0].id);
		$Qp.append('<input type="radio" value="'+value+'">'+value+'<br>');
	
	});
	// '<input type="radio" name="gender" value="male"> Male<br>
	// <input type="radio" name="gender" value="female"> Female<br><input type="radio" name="gender" value="other"> Other');
	
	
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