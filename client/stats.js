Template.stats.helpers({
  waitAverageTimeChart: function () {
    var wait = processDataToDrawTheColumnsCharts('wait');
    Meteor.setTimeout(function () {
      generateColumnsChart('#waitAverage', wait.dates, 'Waiting time', 'Waiting time (ms)', wait.dataForChart, wait.average);
    }, 50);
  },
  durationAverageTimeChart: function () {
    var duration = processDataToDrawTheColumnsCharts('duration');
    Meteor.setTimeout(function () {
      generateColumnsChart('#durationAverage', duration.dates, 'Time duration chat', 'Duration time (ms)', duration.dataForChart, duration.average);
    }, 50);
  },
  surveyChart: function () {
    var survey = processDataToDrawTheColumnsCharts('survey');
    Meteor.setTimeout(function () {
      generateColumnsChart('#scoreAverage', survey.dates, 'Survey points', 'Survey points', survey.dataForChart, survey.average);
    }, 50);
  },
  browsersPieChart: function () {
    Meteor.setTimeout(function () {
      //28.12.2014 LFG Need to think a way to scale this chart
      generatesPieChart('#browserStats', 'Browser', processDataToDrawInPieChart('browser'));
    }, 50);
  },
  languagesPieChart: function () {
    Meteor.setTimeout(function () {
      //28.12.2014 LFG Need to think a way to scale this chart
      generatesPieChart('#languagesStats', 'Languages', processDataToDrawInPieChart('language'));
    }, 50);
  }
});

Template.stats.rendered = function () {

};