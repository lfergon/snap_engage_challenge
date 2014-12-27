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