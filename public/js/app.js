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
$( "#TestSet" ).click(function() {
 
  $("#TestSet").prop("disabled",true);
  $("#quesContent").toggle();
  $(".endTestBtn").toggle();
  $("#endTestContent").toggle(false);
  socket.emit('populateTest',$("#TestSet").val());
  
});


socket.on('giveTestSet',function(obj){
	
	//console.log(obj.ts);
	
	var s=jQuery.parseJSON(obj.ts);
	console.log(s);
	setQuestionDiv(s[0])
	localStorage.setItem('dataset',obj.ts);
	localStorage.setItem("resultSet",[]);
	
});

socket.on('giveResultTotal',function(obj){
	
	//console.log(obj.ts);
	
	var s=jQuery.parseJSON(obj.resultTotal);
	//console.log(s);
	$("#resultTotal-end").text(s)
	
});


function setQuestionDiv(s){

{
	var $QuestionWindow = jQuery('#QuestionWindow');
	var $Qp = jQuery('#OptionWindow');
	var $Qid = jQuery('#Qid');

	$QuestionWindow.find('p').text(s.qText);
	var opttions = s.optionSet;
	$Qp.empty();
	console.log(s);
	jQuery.each(opttions,function(i,value){
		console.log(s.id);
		$Qid.val(s.id);
		$Qp.append('<input type="radio" id="answers" name="answers" value="'+value+'">'+value+'<br>');
	
	});
}

}

function showNext(){
	var $Qid = jQuery('#Qid');
	var i = parseInt($Qid.val());
	var answer = ($( "input:radio[name=answers]:checked").val());
	var resultSet= localStorage.getItem("resultSet");
	var avar = {};
	avar.qid = i;
	avar.answer = answer;
	console.log(resultSet);
	if(!resultSet)
		resultSet =new Array();
	else
		resultSet= jQuery.parseJSON(resultSet);
	
	resultSet.push({"qid":i,"answer":answer});
	localStorage.setItem("resultSet",JSON.stringify(resultSet));

	var s = jQuery.parseJSON(localStorage.getItem('dataset'));
	var index = null;
	if(i>s.length)
		index = i-s.length;
	else
		index = i;
	
	if(index >= 10){
		eraseTest();
	}
	else
	setQuestionDiv(s[index]);
	//console.log(i+1);
	//alert("hello");
}

function eraseTest(){
	$("#TestSet").prop("disabled",false);
	localStorage.setItem('dataset',null);
	$("#endTestContent").toggle();
	$(".endTestBtn").toggle();
	 $("#quesContent").toggle();
	resultSet = jQuery.parseJSON(localStorage.getItem('resultSet'));
	socket.emit('resultMaker',resultSet);

}

function showPrev(eventInitiator){
	alert("hello");
}
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