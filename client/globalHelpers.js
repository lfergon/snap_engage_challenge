// 27.12.2014 LFG Format for the dates
DATEFORMAT = "HH:mm:ss MM/DD/YYYY";

Template.registerHelper('formatDate', function (date) {
  return moment(date).format(DATEFORMAT);
});

