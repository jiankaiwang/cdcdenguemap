/*
 * global settings
 * |- mymap : base map object
 */
var mymap;

/*
 * desc : api checker
 */
function apiChecker(callback) {
	$.ajax({
		url: '/api',
		type: 'get',
		data: {},
		error: function (xhr, ajaxOptions, thrownError) {
			callback(xhr.status + " " + thrownError + ". Cannot connect to /api.");
		},
		success: function (response) {
			if(defaultLang.length < 1) {
				// get the default language only when no other language assigning
				defaultLang = response["defaultLang"];
			}
			callback(null, "");
		}
	});
}

/*
 * desc : initial base map
 */
function initialMap(previousInfo, callback) {
	try {
		// basic setting, setView and personal information
		mymap = L.map('mapid',{
			center: crtLoc,
			zoomControl: false,
			zoom: zoomLevel,
			layers: allBaseLayers[0]
		});
		
		// catch map basemap changing into greyscale event
		mymap.on('baselayerchange', function (e) {
			if (e.name == layerTypeName["osm"]["grey"][defaultLang] && (!$('#mapid').hasClass('grayscale'))) {
				$('#mapid').addClass('grayscale');
			} else if (e.name != layerTypeName["osm"]["grey"][defaultLang] && $('#mapid').hasClass('grayscale')) {
				$('#mapid').removeClass('grayscale');
			}
		});

		//add zoom control with your options
		L.control.zoom({
			position:'bottomright'
		}).addTo(mymap);

		// success callback
		callback(null, "");
	} catch(err) {
		callback("Can not initialize the map. " + err);
	}
}

/**
 * desc: prepare the properities
 */
function prepareProperity(data) {
	var key = getDictionaryKeyList(data);
	var text = "<h5>";
	for(var i = 0 ; i < key.length ; i++) {
		text += key[i] + ": " + data[key[i]] + "<br>";
	}
	text += "</h5>";
	return text;
}

/**
 * desc: add points on the map
 */
function addPointService() {
	function onEachFeature(feature, layer) {
		// does this feature have a property named popupContent?
		if (feature.properties) {
			layer.bindPopup(prepareProperity(feature.properties));
		}
	}

	var states = [];

	var geojsonMarkerOptions = {
		radius: 6,
		fillColor: "#ff7800",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};

	$.ajax({
		url: '/data/point.geojson',
		type: 'get',
		data: {},
		error: function (xhr) {
			console.log("Can not fetch data. Please contact the administator with the information.");
		},
		success: function (response) {
			//states.push(response["features"]);
			states = JSON.parse(response)["features"];
			L.geoJSON(states, {
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, geojsonMarkerOptions);
				},
				onEachFeature: onEachFeature
			}).addTo(mymap);
		}
	});
}

/*
 * desc : add legend 
 */
function addLegendBody(previousInfo, callback) {
	$('.legendBody').html(
		'<div class="row legend-row"><i class="fa fa-circle circle-red" aria-hidden="true"></i> <span>' + frontTranslation("daytype1",defaultLang) + '</span></div>'
		+ '<div class="row legend-row"><i class="fa fa-circle circle-orange-2" aria-hidden="true"></i> <span>' + frontTranslation("daytype2",defaultLang) + '</span></div>'
		+ '<div class="row legend-row"><i class="fa fa-circle circle-yellow" aria-hidden="true"></i> <span>' + frontTranslation("daytype3",defaultLang) + '</span></div>'
		+ '<div class="row legend-row"><i class="fa fa-circle circle-gray" aria-hidden="true"></i> <span>' + frontTranslation("daytype4",defaultLang) + '</span></div>'
		+ '<div class="row legend-row"><div class="rect bg-yellow"></div>&nbsp;<span>' + frontTranslation("clusteringarea",defaultLang) + '</span></div>'
		+ '<div class="row legend-row"><i class="fa fa-plus-square color-green" aria-hidden="true"></i> <span>' + frontTranslation("ns1hosp",defaultLang) + '</span></div>'
		+ '<div class="row legend-row"><div class="rect bg-blue"></div>&nbsp;<span>' + frontTranslation("cleanzone",defaultLang) + '</span></div>'
	);
}

/*
 * desc : listener
 */



 /*
  * desc : initializer
  */
function initDatepicker() {
	var getDate = new Date();
	var beginningdate =  "01/01/2017";
	var endingDate = getCrtMonth(getDate) + "/" + getCrtDate(getDate) + "/" + getCrtYear(getDate);
	$('#beginningdate').datetimepicker({
		format: 'YYYY-MM-DD',
		defaultDate: beginningdate
	});
	$('#endingdate').datetimepicker({
		format: 'YYYY-MM-DD',
		defaultDate: endingDate
	});
}

function initAllOperations(previous,callback) {
    try{
		initDatepicker();
        callback(null, "");
    } catch(err) {
        callback(err);
    }
}

/* 
 * desc : main entry 
 */
$(function() {
	async.waterfall([
		apiChecker // api checker
		, initialMap // base map initialization and is dependent on apichecker
		, addLocBtnToMap // add button to locate your current position and ns1 hospital button
		, addMainServiceBtnToMap // add main service buttons
		, initAllOperations // initialize all operations
		, addLegendBody // add legend body
	], function (err, message) {
		if(err) { 
			console.log(err); 
		}
	});
});