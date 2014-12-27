Session.set('moreCompaniesLoad', false);
Template.company.helpers({
  positionNotOne: function () {
    if(this.dataTemplate && this.dataTemplate.position===1){
      return false;
    }else{
      return true;
    }
  },
  namePrevious: function () {
    if(Session.get('position')!==1 && this.dataTemplate){
      var previousCompany = StartupsCollection.findOne({position: this.dataTemplate.position-1});
      if(previousCompany){
        return previousCompany.name;
      }
    }else{
      return false;
    }
  },
  nameNext: function () {
    if(this.dataTemplate){
      var nextCompany = StartupsCollection.findOne({position: this.dataTemplate.position+1});
      if(nextCompany){
        return nextCompany.name;
      }else if(nextCompany===undefined){
        Meteor.setTimeout(function() {
          Session.set('page', Session.get('page')+1);
        }, 250);
        Meteor.subscribe('startups', Session.get('limitValues')+10, Session.get('page'));
      }
    }
  },
  startupCharts: function () {
    if(this.dataTemplate && this.dataTemplate._id!==undefined){
      var objectRouter = this.dataTemplate;
      Meteor.call('startupChartData', objectRouter._id, function (err, result) {
        if(result){
          //Column chart
          $("#dataStartup").highcharts({
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: true,
              backgroundColor:'rgba(255, 255, 255, 0.1)',
            },
            title: {
              text: 'TheDatabase metrics',
              color: 'black',
            },
            colors: [
              '#4285F4'
            ],
            xAxis: {
              categories: result.dates,
              tickInterval: 7
            },
            yAxis: {
              min: 0,
              title: false
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: true
            },
            series: [
              {
                name: 'Web points',
                color: '#4285F4',
                data: result.web
              },
              {
                name: 'Social points',
                color: '#000',
                data: result.social
              },
              {
                name: 'Global points',
                color: '#777',
                data: result.data
              }
            ]
          });
          //Column chart Facebook
          //Column chart Twitter
          $("#dataTwitter").highcharts({
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: true,
              backgroundColor:'rgba(255, 255, 255, 0.1)',
              type: 'area'
            },
            title: {
              text: 'Social networks metrics'
            },
            xAxis: {
              categories: result.dates,
              tickInterval: 7
            },
            yAxis: {
              min: 0,
              title: false
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: true
            },
            plotOptions: {
              area: {
                marker: {
                  enabled: false,
                  symbol: 'circle',
                  radius: 2,
                  states: {
                    hover: {
                      enabled: true
                    }
                  }
                }
              }
            },
            series: [
              {
                name: 'Facebook likes',
                data: result.likes
              },
              {
                name: 'Twitter followers',
                data: result.followers
              }
            ]
          });
          $("#dataWeb").highcharts({
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: true,
              backgroundColor:'rgba(255, 255, 255, 0.1)'
            },
            title: {
              text: 'Web metrics',
              color: 'black',
            },
            colors: [
              '#4285F4'
            ],
            xAxis: {
              categories: result.dates,
              tickInterval: 7
            },
            yAxis: {
              min: 1,
              reversed: true,
              title: false
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: true
            },
            series: [
              {
                name: 'Web world position by visits',
                color: '#4285F4',
                data: result.traffic
              }
            ]
          });
        }
      });
    }
  }
});

Template.company.rendered = function () {
  $('body').on('keydown', function () {
    // DGB 2014-02-22 39 is right arrow
    if (window.event.keyCode === 39) $('#nextButton').click();
    // DGB 2014-02-22 37 is left arrow
    if (window.event.keyCode === 37)  $('#previousButton').click();
  });
};

Template.company.events({
  'click #nextButton': function (event) {
    var next = StartupsCollection.findOne({position: this.dataTemplate.position+1});
    Router.go('/company/'+next.name.replace(/ /g, '_'));
  },
  'click #previousButton': function (event) { 
    var previous = StartupsCollection.findOne({position: this.dataTemplate.position-1});
    Router.go('/company/'+previous.name.replace(/ /g, '_'));
  }
});