import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { MyCollection } from '/imports/both/MyCollection';
import Highcharts from 'highcharts';
import './main.html';
require('highcharts-more');
require('highcharts/modules/drilldown')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);

Template.chart2.onCreated(function chartOnCreated() {
  this.subscribe('someData');
});

Template.chart2.onRendered(function chartOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      const data = MyCollection.findOne();

Highcharts.chart('container2', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Monthly Average Temperature'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Temperature'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    series: [{
        name: 'Tokyo',
        marker: {
            symbol: 'square'
        },
        data: data

    }]
});
    }
    });
});
