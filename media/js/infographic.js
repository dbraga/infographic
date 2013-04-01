function getValue(nid){
    var value = "";
    clickData.forEach(function(entry) {
      if (nid == entry[0]){
          value = entry[1];
      }
    });  
    if (value==""){
      value=0;
    }
    return value;
  }

function getData(d){
  var neighborhoodId = d.properties.WOE_HOOD;
  // var jsonClickData = JSON.parse(clickData);
  var array = clickData;
  var value = "";

  array.forEach(function(entry) {
    if (neighborhoodId == entry[0]){
        value = entry[1];
    }
  });
 return getColor(value);
}

function style(feature) {
    // console.dir(feature.properties.NAME_1);
    // console.dir(feature.properties.WOE_HOOD);
    return {
        fillColor: getData(feature),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 function hex(x) {
  return ("0" + parseInt(x).toString(16)).slice(-2);
 }
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function getColor(d) {
    return d > 1000 ? '#800026' :

           
           d > 500  ? '#CC0000' :
           d > 200  ? '#FC4E2A' :


           // d > 200  ? '#E31A1C' :
           d > 100  ? '#FEB24C' :

           d > 50   ? '#BF920D' :

           // d > 50   ? '#FD8D3C' :
           d > 20   ? '#228B22' :
           
           // d > 10   ? '#FED976' :
           d > 10   ? '#2E8B57' :
                      '#66B319';

                        // '#98FB98';

}




 