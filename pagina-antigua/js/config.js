  window.onload = function(){
	var n=1;
	var options = {
		zoom: 11
		, center: new google.maps.LatLng(-0.953667, -78.614286)
		, mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('test'), options);

	var place = new Array();
	place['Agencia Salcedo'] = new google.maps.LatLng(-1.043543,-78.590368);
	place['Agencia Saquisilí'] = new google.maps.LatLng(-0.838329,-78.667640);
	place['Agencia Quevedo'] = new google.maps.LatLng(-0.985811, -78.582232);
	
	
	for(var i in place){
		var marker = new google.maps.Marker({
			position: place[i]
			, map: map
			, title: i
			, icon: 'images/marker.png'
		});

		google.maps.event.addListener(marker, 'click', function(){
			var popup = new google.maps.InfoWindow();
			var note = 'VIS ANDES -  ' + this.title;
			popup.setContent(note);
			popup.open(map, this);
		});
	}
};