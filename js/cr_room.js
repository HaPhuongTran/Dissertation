$(document).ready(function(){
	var getNameHome = localStorage.getItem("storageNameHome");
	var dataHome;
	var status_create;
	var loadRoom = 0;
	// var count = loadRoom;
	var dataRoomGet;
	var listRoom;
	$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/gethome/"+getNameHome,
	}).done(function(data, textStatus, xhr){
		dataHome = data;
	});

	$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/getlistrooms/"+ getNameHome,
	}).done(function(data, textStatus, xhr){
		listRoom = data;
	});

	function appentRoom(countRoom){
		$(".row").append("<div class='col-sm-3 room rroom"+countRoom+"'></div>");
  		$(".rroom"+countRoom).append("<div class='hovereffect hover"+countRoom+"'></div>");
  		$(".hover"+countRoom).append("<img class='img-fluid img-room' src='images/room-icon.jpg'>");
  		$(".hover"+countRoom).append("<div class='overlay olay"+countRoom+"'></div>");
  		$(".olay"+countRoom).append("<input id='name_input"+countRoom+"' name='name_input' type ='text' placeholder = 'Enter name room'>");
  		$(".olay"+countRoom).append("<input id='id_input"+countRoom+"' type='hidden'>");
  		$(".olay"+countRoom).append("<p class= 'adbtn"+countRoom+"'></p>");
  		$(".adbtn"+countRoom).append("<button class = 'btn_enter"+countRoom+"'>Enter Room</button>");
  		$(".adbtn"+countRoom).append("<button class = 'btn_enter' id= 'btn-save"+countRoom +"'>Save</button>");
	}

	function save(saveCount){
		  	$("#btn-save"+saveCount).click(function(){
  			var nameRoom = $("#name_input"+$(this).attr("id").substr(-1)).val();
  			var idRoom = parseInt($("#id_input"+$(this).attr("id").substr(-1)).val());
  			if(isNaN(idRoom)|| idRoom == null){
  				idRoom = 0;
  			}

		    $.ajax({
				async : false,
				method: "post",
				data: JSON.stringify({ id: idRoom, homeId:dataHome, nameRoom:nameRoom }),
				contentType: "application/json",
				url: "http://localhost:8080/smarthome/createroom/"+ idRoom
			}).done(function(data, textStatus, xhr){
				status_create = xhr.status;
			});
		});
	}

	function getRoom(getCount){
		if(status_create == 201){
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
	}
	for(loadRoom; loadRoom < listRoom.length; loadRoom++){
		appentRoom(loadRoom);
		$("#name_input"+loadRoom).val(listRoom[loadRoom].nameRoom);
		$("#id_input"+loadRoom).val(listRoom[loadRoom].id);
		save(loadRoom);
	}

  	$(".button-add").click(function(){
  		appentRoom(loadRoom++);
 		save(loadRoom++);
 		getRoom(loadRoom++)
		loadRoom++;
  	});
})