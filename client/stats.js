Template.stats.helpers({
  waitAverageTimeChart: function () {
    var datesChart = [];
    var dataForChart = [];
    arrayDataApi.forEach(function (chat) {
      datesChart.push(moment(chat.created_at).format("MMM Do YY"));
      dataForChart.push(chat.chat_waittime);
    });
    Meteor.setTimeout(function () {
      generateColumnsChart('#waitAverage', datesChart, 'Waiting time', 'Waiting time (ms)', dataForChart);
    }, 50);
  },
  durationAverageTimeChart: function () {
    var datesChart = [];
    var dataForChart = [];
    arrayDataApi.forEach(function (chat) {
      datesChart.push(moment(chat.created_at).format("MMM Do YY"));
      dataForChart.push(chat.chat_duration);
    });
    Meteor.setTimeout(function () {
      generateColumnsChart('#durationAverage', datesChart, 'Time duration chat', 'Duration time (ms)', dataForChart);
    }, 50);
  },
  surveyChart: function () {
    var datesChart = [];
    var dataForChart = [];
    arrayDataApi.forEach(function (chat) {
      datesChart.push(moment(chat.created_at).format("MMM Do YY"));
      dataForChart.push(chat.survey_score);
    });
    Meteor.setTimeout(function () {
      generateColumnsChart('#scoreAverage', datesChart, 'Survey points', 'Survey points', dataForChart);
    }, 50);
  },
  browsersPieChart: function () {
    Meteor.setTimeout(function () {
      //28.12.2014 LFG Need to think a way to scale this chart
      generatesPieChart('#browserStats', 'Browser', [['Firefox', 2], ['Chrome', 4]]);
    }, 50);
  }
});

Template.stats.rendered = function () {

};