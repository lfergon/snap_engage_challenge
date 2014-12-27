Template.registerHelper('arrayifyObject', function (obj) {
  var result = [];
  for (var key in obj){
    result.push({name:key, value: obj[key]});
  }
  return result;
});