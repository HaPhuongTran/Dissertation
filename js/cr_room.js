$(document).ready(function(){
	var getNameHome = localStorage.getItem("storageNameHome");
	var dataHome;
	var status_create;
	var loadRoom = 0;
	var dataRoomGet;
	var listRoom;
	var nameRoom;

	$(".furniture_room").hide();
	//Begin get home
	$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/gethome/"+getNameHome,
	}).done(function(data, textStatus, xhr){
		dataHome = data;
	});
	//End get Home

	//Begin list room
	$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/getlistrooms/"+ getNameHome,
	}).done(function(data, textStatus, xhr){
		listRoom = data;
	});
	//End get list room
	for(loadRoom; loadRoom < listRoom.length; loadRoom++){
		appentRoom(loadRoom);
		$("#name_input"+loadRoom).val(listRoom[loadRoom].nameRoom);
		$("#id_input"+loadRoom).val(listRoom[loadRoom].id);
		save(loadRoom);
		enterRoom(loadRoom);
	}

	function appentRoom(countRoom){
		$(".row").append("<div class='col-sm-3 room rroom"+countRoom+"'></div>");
  		$(".rroom"+countRoom).append("<div class='hovereffect hover"+countRoom+"'></div>");
  		$(".hover"+countRoom).append("<img class='img-fluid img-room' src='images/room-icon.jpg'>");
  		$(".hover"+countRoom).append("<div class='overlay olay"+countRoom+"'></div>");
  		$(".olay"+countRoom).append("<input id='name_input"+countRoom+"' type ='text' placeholder = 'Enter name room'>");
  		$(".olay"+countRoom).append("<input id='id_input"+countRoom+"' type='hidden'>");
  		$(".olay"+countRoom).append("<p class= 'adbtn"+countRoom+"'></p>");
  		$(".adbtn"+countRoom).append("<button class = 'btn_enter"+countRoom+"'>Enter Room</button>");
  		$(".adbtn"+countRoom).append("<button id= 'btn-save"+countRoom +"'>Save</button>");
	}

	function save(saveCount){
		  	$("#btn-save"+saveCount).click(function(){
  			nameRoom = $("#name_input"+ saveCount).val();
  			var idRoom = parseInt($("#id_input"+ saveCount).val());
  			if(isNaN(idRoom)|| idRoom == null){
  				idRoom = 0;
  			}
  			//Begin create room
		    $.ajax({
				async : false,
				method: "post",
				data: JSON.stringify({ id: idRoom, homeId:dataHome, nameRoom:nameRoom }),
				contentType: "application/json",
				url: "http://localhost:8080/smarthome/createroom"
			}).done(function(data, textStatus, xhr){
				status_create = xhr.status;
			});
			//End create room
			getRoom(saveCount);
		});
	}

	function enterRoom(saveCount){
	  	$(".btn_enter"+saveCount).click(function(){
	  		$(".close_button").click(function(){
   				$(".furniture_room").hide();
			});

	  		$(".furniture_room").show();
			$(".furniture_room h2").text($("#name_input" + saveCount).val());
			$("#name_room").val($("#name_input" + saveCount).val());
			$("#name_home").val(getNameHome);
			addDecive(saveCount);
		});
	}

	function addDecive(addCount){
		$(".add_button" + addCount).click(function(){
			//begin for tomorrow in there
		})
	}

	function getRoom(getCount){
	    $.ajax({
		async : false,
		method: "get",
		contentType: "application/json",
		url: "http://localhost:8080/smarthome/getroom/"+ nameRoom,
		}).done(function(data, textStatus, xhr){
			dataRoomGet = data;
		});
		
		// Set value for fields value 
		$("#name_input"+getCount).val(dataRoomGet.nameRoom);
		$("#id_input"+getCount).val(dataRoomGet.id);
	}

  	$(".button-add").click(function(){
  		appentRoom(loadRoom + 1);
 		save(loadRoom + 1);
 		enterRoom(loadRoom + 1);
		loadRoom++;
  	});
});