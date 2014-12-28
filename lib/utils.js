/**
 * [supplant function for string interpolation]
 * @param  {Object} o [Object that contains the variable that must be supplant on the string]
 * @return {String}   [The value to supplant]
 * Usage:
 * console.log("I'm {age} years old!".supplant({ age: 29 }));
 * console.log("The {a} says {n}, {n}, {n}!".supplant({ a: 'cow', n: 'moo' }));
 */
String.prototype.supplant = function (o) {
  return this.replace(/{([^{}]*)}/g, function (a, b) {
    var r = o[b];
    return typeof r === 'string' || typeof r === 'number' ? r : a;
  });
};

// 27.12.2014 LFG Usage of supplant:
//console.log("I'm {age} years old!".supplant({ age: 29 }));
//console.log("The {a} says {n}, {n}, {n}!".supplant({ a: 'cow', n: 'moo' }));

/**
 * [loadMap function that load the marker for the user]
 * @param  {Number} latitude  [latitude of the user]
 * @param  {Number} longitude [longitude of the user]
 * @return {[type]}           [description]
 */
loadMap = function (latitude, longitude) {
  GoogleMaps.init(
    {
      'sensor': true, //optional
      'language': 'en' //optional
    }, function () {
      var mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.MAP
      };
      var userLatLng = new google.maps.LatLng(latitude, longitude);
      map = new google.maps.Map(document.getElementById("map"), mapOptions); 
      map.setCenter(userLatLng);
      var marker = new google.maps.Marker({
        position: userLatLng,
        map: map,
        title: 'Map loaded!!!'
      });
    }
  );
};

/**
 * [getBrowser procees user agent information]
 * @param  {String} user_agent [user_agent string from the chat selected]
 * @return {Object}            [user_agent and version processed]
 */
getBrowser = function (user_agent) {
  var version = null;
  var pathToImage = null;
  //Browser Detection
  if (/Firefox[\/\s](\d+\.\d+)/.test(user_agent)){
    var ff = (/Firefox[\/\s](\d+\.\d+)/.test(user_agent));
    version = new Number(RegExp.$1);
    pathToImage = "/images/firefox.png";
  }
  if(user_agent.lastIndexOf('Chrome/') > 0) {
    version = user_agent.substr(user_agent.lastIndexOf('Chrome/') + 7, 2);
    pathToImage = "/images/chrome.png";
  }
  if(user_agent.lastIndexOf('Safari/') > 0) {
    version = user_agent.substr(user_agent.lastIndexOf('Safari/') + 7, 2);
    pathToImage = "/images/safari.png";
  }
  var browserInfoObject = {
    browser: pathToImage,
    version: version
  };
  return browserInfoObject;
};

/**
 * [findIdInArray find the object with selected id in the array of data]
 * @param  {[type]} idToFind [description]
 * @return {[type]}          [description]
 */
findIdInArray = function (idToFind) {
  return _.find(arrayDataApi, function (chat) { return chat.id === idToFind; });
};

/**
 * [generateColumnsChart function that draws the average of data]
 * @param  {String} idChart    [id of the div that contains the chart]
 * @param  {Array} dates      [dates on x axis]
 * @param  {String} titleChart [title for the chart]
 * @param  {String} titleAxis  [title for Y axis]
 * @param  {Array} dataToDraw [array with the data to plot]
 * @return {undefined}            []
 */
generateColumnsChart = function (idChart, dates, titleChart, titleAxis, dataToDraw) {
  $(idChart).highcharts({
    chart: {
      type: 'column'
    },
    title: {
      text: titleChart
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: dates
    },
    yAxis: {
      min: 0,
      title: {
        text: titleAxis
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: titleAxis,
      data: dataToDraw
    }]
  });
};

/**
 * [generatesPieChart function that plots a pie chart]
 * @param  {[type]} idChart    [description]
 * @param  {[type]} titleChart [description]
 * @param  {[type]} dataToDraw [description]
 * @return {[type]}            [description]
 */
generatesPieChart = function (idChart, titleChart, dataToDraw) {
  $(idChart).highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 1,//null,
      plotShadow: false
    },
    title: {
      text: titleChart
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: 'black'
          }
        }
      }
    },
    series: [{
      type: 'pie',
      name: titleChart,
      data: dataToDraw
    }]
    });
};
