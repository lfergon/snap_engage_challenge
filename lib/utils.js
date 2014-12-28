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
 * @param  {Number} averageValue [average for data provided]
 * @return {undefined}            []
 */
generateColumnsChart = function (idChart, dates, titleChart, titleAxis, dataToDraw, averageValue) {
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
      },
      plotLines: [{
        color: 'red',
        value: averageValue,
        width: '2',
        zIndex: 2,
        dashStyle: 'dash',
        label: {
            text: 'Average value: '+averageValue.toFixed(2),
            align: 'right',
            y: 12,
            x: 0
        }
      }]
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

/**
 * [processDataToDrawInPieChart function that process the arrays of informatio to look for the occurrence of one value]
 * @param  {String} kindOfProperty [language or browser to change the behaviour of the function]
 * @return {Array}                [array of arrays with two values, the number of times a value is find inside the array, and the property]
 */
processDataToDrawInPieChart = function (kindOfProperty) {
  var arrayElements = [];
  arrayDataApi.forEach(function (element) {
    //console.log(element.user_agent.match(/Safari|Chrome|Firefox/g));
    if(kindOfProperty==='browser'){
      arrayElements.push(element.user_agent.match(/Safari|Firefox/g)[0]);
    }
    if(kindOfProperty==='language'){
      arrayElements.push(element.language_code.substring(0,2));
    }
  });
  var uniqueValues = _.uniq(arrayElements);
  var arrayToDraw = [];
  uniqueValues.forEach(function (element) {
    //28.12.2014 LFG count the number of times that one element appears in the array
    arrayToDraw.push([element, arrayElements.filter(function (x) {return x==element;}).length]);
  });
  return arrayToDraw;
};

/**
 * [processDataToDrawTheColumnsCharts process the data to plot in the columns charts]
 * @param  {String} kindOfChart [property of the information to read]
 * @return {Object}             [Object that contains the properties to draw in the chart]
 */
processDataToDrawTheColumnsCharts = function (kindOfChart) {
  var datesChart = [];
  var dataForChart = [];
  var sum = 0;
  arrayDataApi.forEach(function (chat) {
    datesChart.push(moment(chat.created_at).format("MMM Do YY"));
    if(kindOfChart==='survey'){
      dataForChart.push(chat.survey_score);
      if(chat.survey_score){
        sum += chat.survey_score;
      }else{
        sum += 0;
      }
    }
    if(kindOfChart==='duration'){
      dataForChart.push(chat.chat_duration);
      if(chat.chat_duration){
        sum += chat.chat_duration;
      }else{
        sum += 0;
      }
    }
    if(kindOfChart==='wait'){
      dataForChart.push(chat.chat_waittime);
      if(chat.chat_waittime){
        sum += chat.chat_waittime;
      }else{
        sum += 0;
      }
    }
  });
  var averageValue = sum/dataForChart.length;
  return {
    average: averageValue,
    dates: datesChart,
    dataForChart: dataForChart
  };
};