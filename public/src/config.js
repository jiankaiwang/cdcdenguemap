/*
 * global variables for multiple purposes
 * |- defaultLang : system default language
 * |- baseMapZoomConf : the max and min zoom
 * |- allBaseLayers : available layers added to the basemap
 * |- layerTypeName : define all layer names
 */
var defaultLang = ""; 
var baseMapZoomConf = { "min" : 3, "max" : 16 }; 
var crtLoc = [23.785273, 121.018374];
var zoomLevel = 7;
var allBaseLayers = [];
var layerTypeName = {};

/****************************************************************
 * desc : language translation
 ****************************************************************/
function getLang() {
	var pn = window.location.pathname;
	if (pn.length > 0) {
		return pn.substr(1,pn.length);
	} else {
		return "";
	}
}
defaultLang = getLang();

/****************************************************************
 * base map issue
 ****************************************************************/
/*
 * desc : design base map layer
 */ 
var baseMapUri ={
	"osm" : {
		"outdoor" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		"grey" :  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	}
}

layerTypeName = {
	"osm" : {
		"outdoor" : { "zh_TW" : "一般", "en" : "Outdoor" },
		"grey" : { "zh_TW" : "灰階", "en" : "Gray" }
	}
} 
 
var attributionInfo = {
	"osm" : 'Mapdata &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, CDC Dengue Map &copy; 2017'
};

var outdoorLayer = L.tileLayer(
	baseMapUri["osm"]["outdoor"], 
	{ attribution: attributionInfo["osm"], maxZoom: baseMapZoomConf["max"], minZoom: baseMapZoomConf["min"] }
), greyLayer = L.tileLayer(
	baseMapUri["osm"]["grey"], 
	{ attribution: attributionInfo["osm"], maxZoom: baseMapZoomConf["max"], minZoom: baseMapZoomConf["min"] }
);	

allBaseLayers = [outdoorLayer, greyLayer];

/****************************************************************
 * language translation
 ****************************************************************/
/**
 * desc : get the translation
 */
function frontTranslation(item, lang) {
	return front_translation[item][lang];
}

/**
 * language translation
 */
var front_translation = {
	"selfLocBtn": { "en": "Current Position", "zh_TW": "定位" },
	"clusteringzone": {'en':'Clustering', "zh_TW":'聚集警示'},
	"spreading": {'en':'Spreading', "zh_TW":'動態地圖'},
	"trend": {'en':'Trend', "zh_TW":'病例趨勢'},
	"overseas": {'en':'Overseas', "zh_TW":'境外移入'},
	"prevention": {'en':'Overseas', "zh_TW":'防治資訊'},
	"cbswarning": {'en':'CBS Warning', "zh_TW":'細胞廣播訊息'},
	"timeseries": {'en':'Time Series', "zh_TW":'時間序列'},
	"ns1hosp": {'en':'NS1 Hospital', "zh_TW":'NS1 醫療院所'},
	"daytype1": {'en':'Onset in 7 days', "zh_TW":'發病日7日內'},
	"daytype2": {'en':'Onset during 8-14 days', "zh_TW":'發病日8-14日內'},
	"daytype3": {'en':'Onset during 15-30 days', "zh_TW":'發病日15-30日內'},
	"daytype4": {'en':'Onset over 30 days', "zh_TW":'發病日超過30日'},
	"clusteringarea": {'en':'Clustering Zone', "zh_TW":'聚集區域'},
	"ns1hosp": {'en':'NS1 Hospital', "zh_TW":'NS1 快篩院所'},
	"cleanzone": {'en':'Clean Zone', "zh_TW":'查核區'},
};