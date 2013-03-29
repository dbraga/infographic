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

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}




 