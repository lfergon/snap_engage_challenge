Template.stats.helpers({
  waitAverageTimeChart: function () {
    var datesChart = [];
    var dataForChart = [];
    var sum = 0;
    arrayDataApi.forEach(function (chat) {
      datesChart.push(moment(chat.created_at).format("MMM Do YY"));
      dataForChart.push(chat.chat_waittime);
      if(chat.chat_waittime){
        sum += chat.chat_waittime;
      }else{
        sum += 0;
      }
    });
    var averageValue = sum/dataForChart.length;
    Meteor.setTimeout(function () {
      generateColumnsChart('#waitAverage', datesChart, 'Waiting time', 'Waiting time (ms)', dataForChart, averageValue);
    }, 50);
  },
  durationAverageTimeChart: function () {
    var datesChart = [];
    var dataForChart = [];
    var sum = 0;
    arrayDataApi.forEach(function (chat) {
      datesChart.push(moment(chat.created_at).format("MMM Do YY"));
      dataForChart.push(chat.chat_duration);
      if(chat.chat_duration){
        sum += chat.chat_duration;
      }else{
        sum += 0;
      }
    });
    var averageValue = sum/dataForChart.length;
    Meteor.setTimeout(function () {
      generateColumnsChart('#durationAverage', datesChart, 'Time duration chat', 'Duration time (ms)', dataForChart, averageValue);
    }, 50);
  },
  surveyChart: function () {
    var datesChart = [];
    var dataForChart = [];
    var sum = 0;
    arrayDataApi.forEach(function (chat) {
      datesChart.push(moment(chat.created_at).format("MMM Do YY"));
      dataForChart.push(chat.survey_score);
      if(chat.survey_score){
        sum += chat.survey_score;
      }else{
        sum += 0;
      }
    });
    var averageValue = sum/dataForChart.length;
    Meteor.setTimeout(function () {
      generateColumnsChart('#scoreAverage', datesChart, 'Survey points', 'Survey points', dataForChart, averageValue);
    }, 50);
  },
  browsersPieChart: function () {
    var arrayBrowsers = [];
    arrayDataApi.forEach(function (element) {
      //console.log(element.user_agent.match(/Safari|Chrome|Firefox/g));
      arrayBrowsers.push(element.user_agent.match(/Safari|Firefox/g)[0]);
    });
    var uniqueBrowserValues = _.uniq(arrayBrowsers);
    var arrayToDraw = [];
    uniqueBrowserValues.forEach(function (browser) {
      //28.12.2014 LFG count the number of times that one browser appears in the array
      arrayToDraw.push([browser, arrayBrowsers.filter(function (x) {return x==browser;}).length]);
    });
    Meteor.setTimeout(function () {
      //28.12.2014 LFG Need to think a way to scale this chart
      generatesPieChart('#browserStats', 'Browser', arrayToDraw);
    }, 50);
  },
  languagesPieChart: function () {
    var arrayLanguages = [];
    arrayDataApi.forEach(function (element) {
      arrayLanguages.push(element.language_code.substring(0,2));
    });
    //28.12.2014 LFG look for the unique values of languages in array
    var uniqueLanguagesValues = _.uniq(arrayLanguages);
    var processedArrayToDraw = [];
    uniqueLanguagesValues.forEach(function (language) {
      //28.12.2014 LFG count the number of times that one language appears in the array
      processedArrayToDraw.push([language, arrayLanguages.filter(function (x) {return x==language;}).length]);
    });
    Meteor.setTimeout(function () {
      //28.12.2014 LFG Need to think a way to scale this chart
      generatesPieChart('#languagesStats', 'Languages', processedArrayToDraw);
    }, 50);
  }
});

Template.stats.rendered = function () {

};