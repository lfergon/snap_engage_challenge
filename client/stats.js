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
      return "Total users";
    }else if(Session.get("filter")==="online"){
      return "Users online";
    }else if(Session.get("filter")==="offline"){
      return "Users offline";
    }
  }
});

Template.stats.events({
  'click #filter': function () {
    if(!Session.get("filter")){
      Session.set("filter", "online");
    }else if(Session.get("filter")==="online"){
      Session.set("filter", "offline");
    }else if(Session.get("filter")==="offline"){
      Session.set("filter", "online");
    }
  },
  'click #cancel_filter': function () {
    Session.set("filter", undefined);
  }
});
Template.stats.rendered = function () {

};