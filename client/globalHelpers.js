// 27.12.2014 LFG Format for the dates
DATEFORMAT = "HH:mm:ss MM/DD/YYYY";

Template.registerHelper('formatDate', function (date) {
  // 08.01.2015 LFG The date provided in the json is in seconds, not in milliseconds
  var dateMilliseconds = date * 1000;
  return moment(dateMilliseconds).format(DATEFORMAT);
});

Template.registerHelper('isActive', function (input) {
  return (Router.current().route._path===input)? "active":"";
});