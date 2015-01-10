Session.setDefault("show_cancel", false);
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
  },
  onlineOfflineChart: function () {
    if(!Session.get("filter")){
      Meteor.setTimeout(function () {
        generatesPieChart('#onlineOffline', 'Total', processDataToDrawInPieChartWithFilters('total'));
      }, 50);
    }else if(Session.get("filter")==="online"){
      Meteor.setTimeout(function () {
        generatesPieChart('#onlineOffline', 'Online', processDataToDrawInPieChartWithFilters('online'));
      }, 50);
    }else if(Session.get("filter")==="offline"){
      Meteor.setTimeout(function () {
        generatesPieChart('#onlineOffline', 'Offline', processDataToDrawInPieChartWithFilters('offline'));
      }, 50);
    }
  },
  filterUserAction: function () {
    if(!Session.get("filter")){
      return "Click to see users online";
    }else if(Session.get("filter")==="online"){
      return "Click to see users offline";
    }else if(Session.get("filter")==="offline"){
      return "Click to see users online";
    }
  },
  noCancelFilterShowed: function () {
    return Session.get("show_cancel") ? true:false;
  }
});

Template.stats.events({
  'click #filter': function () {
    if(!Session.get("filter")){
      Session.set("filter", "online");
      Session.set("show_cancel", true);
    }else if(Session.get("filter")==="online"){
      Session.set("filter", "offline");
      Session.set("show_cancel", true);
    }else if(Session.get("filter")==="offline"){
      Session.set("filter", "online");
      Session.set("show_cancel", true);
    }
  },
  'click #cancel_filter': function () {
    Session.set("filter", undefined);
    Session.set("show_cancel", false);
  }
});
Template.stats.rendered = function () {

};