/**
 * para@previous : previous parameters
 * para@callback : callback function
 */
function addMainServiceBtnToMap(previous,callback) {
    try{
        // current location
        var crtPosLoc = L.control({ position: 'bottomright' });
        crtPosLoc.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');
            div.style.backgroundColor = 'white';
            // clusteringzone
            var control_htm = '<a class="leaflet-control-zoom-in" href="#map" title="'
				+ frontTranslation("clusteringzone",defaultLang)
                + '" role="button" onclick="">'
                + '<i class="fa fa-users main-btn" aria-hidden="true"></i></a>';
            // spreading
            control_htm += '<a class="leaflet-control-zoom-in" href="#map" title="'
				+ frontTranslation("spreading",defaultLang)
                + '" role="button" onclick="">' 
                + '<i class="fa fa-flag main-btn" aria-hidden="true"></i></a>';
            // trend
            control_htm += '<a class="leaflet-control-zoom-in" href="#map" title="'
				+ frontTranslation("trend",defaultLang)
                + '" role="button" onclick="">' 
                + '<i class="fa fa-bar-chart main-btn" aria-hidden="true"></i></a>';
            // overseas
            control_htm += '<a class="leaflet-control-zoom-in" href="#map" title="'
				+ frontTranslation("overseas",defaultLang)
                + '" role="button" onclick="">' 
                + '<i class="fa fa-plane main-btn" aria-hidden="true"></i></a>';
            // prevention
            control_htm += '<a class="leaflet-control-zoom-in" href="#map" title="'
				+ frontTranslation("prevention",defaultLang)
                + '" role="button" onclick="">' 
                + '<i class="fa fa-fire-extinguisher main-btn" aria-hidden="true"></i></a>';
            div.innerHTML = control_htm;
            div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
            L.DomEvent.disableClickPropagation(div);
            return div;
        };
        crtPosLoc.addTo(mymap);
        callback(null, "");
    } catch(err) {
        callback(err);
    }
}