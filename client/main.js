import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { MyCollection } from '/imports/both/MyCollection';
import Highcharts from 'highcharts';
import './main.html';
require('highcharts-more');
require('highcharts/modules/drilldown')(Highcharts);
require('highcharts/modules/treemap')(Highcharts);

Template.chart.onCreated(function chartOnCreated() {
  this.subscribe('someData');
});

Template.chart.onRendered(function chartOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      const data = MyCollection.findOne();
      var points = [],
        categoryPoints,
        categoryVal,
        categoryI = 0,
        issueTypePoints,
        issueTypeI,
        currencyPoints,
        currencyI,
        periodPoints,
        periodI,
        ECHoldingPoints,
        ECHoldingI,
        ECConcentrationPoints,
        ECConcentrationI,
        ECBPoints,
        ECBI,
        issueCountryPoints,
        issueCountryI,
        issueNamePoints,
        issueNameI,
        ISINPoints,
        ISINI,
        monthPoints,
        monthI,
        category,
        issueType,
        currency,
        period,
        ECHolding,
        ECConcentration,
        ECB,
        issueCountry,
        IssueName,
        ISIN,
        month,
        mil,
        causeMil,
        causeMilI,
        causeName = {};

      for (category in data) {
        if (data.hasOwnProperty(category)) {
          categoryVal = 0;

          categoryPoints = {
            id: 'id_' + categoryI,
            name: category,
            color: Highcharts.getOptions().colors[categoryI]
          };

          issueTypeI = 0;
          for (issueType in data[category]) {
            if (data[category].hasOwnProperty(issueType)) {

              issueTypePoints = {
                id: categoryPoints.id + '_' + issueTypeI,
                name: issueType,
                parent: categoryPoints.id,
              };
              points.push(issueTypePoints);

              currencyI = 0;
              for (currency in data[category][issueType]) {
                if (data[category][issueType].hasOwnProperty(currency)) {

                  currencyPoints = {
                    id: issueTypePoints.id + '_' + currencyI,
                    name: currency,
                    parent: issueTypePoints.id
                  };
                  points.push(currencyPoints);

                  periodI = 0;
                  for (period in data[category][issueType][currency]) {
                    if (data[category][issueType][currency].hasOwnProperty(period)) {

                      periodPoints = {
                        id: currencyPoints.id + '_' + periodI,
                        name: period,
                        parent: currencyPoints.id,
                      };
                      points.push(periodPoints);

                      ECHoldingI = 0;
                      for (ECHolding in data[category][issueType][currency][period]) {
                        if (data[category][issueType][currency][period].hasOwnProperty(ECHolding)) {

                          ECHoldingPoints = {
                            id: periodPoints.id + '_' + ECHoldingI,
                            name: ECHolding,
                            parent: periodPoints.id,
                          };
                          points.push(ECHoldingPoints);

                          ECConcentrationI = 0;
                          for (ECConcentration in data[category][issueType][currency][period][ECHolding]) {
                            if (data[category][issueType][currency][period][ECHolding].hasOwnProperty(ECConcentration)) {

                              ECConcentrationPoints = {
                                id: ECHoldingPoints.id + '_' + ECConcentrationI,
                                name: ECConcentration,
                                parent: ECHoldingPoints.id,
                              };
                              points.push(ECConcentrationPoints);

                              ECBI = 0;
                              for (ECB in data[category][issueType][currency][period][ECHolding][ECConcentration]) {
                                if (data[category][issueType][currency][period][ECHolding][ECConcentration].hasOwnProperty(ECB)) {

                                  ECBPoints = {
                                    id: ECConcentrationPoints.id + '_' + ECBI,
                                    name: ECB,
                                    parent: ECConcentrationPoints.id,
                                  };
                                  points.push(ECBPoints);

                                  issueCountryI = 0;
                                  for (issueCountry in data[category][issueType][currency][period][ECHolding][ECConcentration][ECB]) {
                                    if (data[category][issueType][currency][period][ECHolding][ECConcentration][ECB].hasOwnProperty(issueCountry)) {

                                      issueCountryPoints = {
                                        id: ECBPoints.id + '_' + issueCountryI,
                                        name: issueCountry,
                                        parent: ECBPoints.id,
                                      };
                                      points.push(issueCountryPoints);

                                      issueNameI = 0;
                                      for (issueName in data[category][issueType][currency][period][ECHolding][ECConcentration][ECB][issueCountry]) {
                                        if (data[category][issueType][currency][period][ECHolding][ECConcentration][ECB][issueCountry].hasOwnProperty(issueName)) {

                                          issueNamePoints = {
                                            id: issueCountryPoints.id + '_' + issueNameI,
                                            name: issueName,
                                            parent: issueCountryPoints.id,
                                          };
                                          points.push(issueNamePoints);

                                          ISINI = 0;
                                          for (ISIN in data[category][issueType][currency][period][ECHolding][ECConcentration][ECB][issueCountry][issueName]) {
                                            if (data[category][issueType][currency][period][ECHolding][ECConcentration][ECB][issueCountry][issueName].hasOwnProperty(ISIN)) {

                                              ISINPoints = {
                                                id: issueNamePoints.id + '_' + ISINI,
                                                name: ISIN,
                                                parent: issueNamePoints.id,
                                              };
                                              points.push(ISINPoints);

                                              causeMilI = 0;
                                              for (mil in data[category][issueType][currency][period][ECHolding][ECConcentration][ECB][issueCountry][issueName][ISIN]) {

                                                if (data[category][issueType][currency][period][ECHolding][ECConcentration][ECB][issueCountry][issueName][ISIN].hasOwnProperty(mil)) {

                                                  causeMil = {
                                                    id: ISINPoints.id + '_' + causeMilI,
                                                    name: mil,
                                                    parent: ISINPoints.id,
                                                    value: Math.round(+data[category][issueType][currency][period][ECHolding][ECConcentration][ECB][issueCountry][issueName][ISIN][mil])
                                                  };
                                                  categoryVal += causeMil.value;
                                                  points.push(causeMil);
                                                  causeMilI = causeMilI + 1;
                                                }
                                              }
                                              ISINPoints = ISINPoints + 1;
                                            }
                                          }
                                          issueNameI = issueNameI + 1;
                                        }
                                      }
                                      issueCountryI = issueCountryI + 1;
                                    }
                                  }
                                  ECBI = ECBI + 1;
                                }
                              }
                              ECConcentrationI = ECConcentrationI + 1;
                            }
                          }
                          ECHoldingI = ECHoldingI + 1;
                        }
                      }
                      periodI = periodI + 1;
                    }
                  }
                  currencyI = currencyI + 1;
                }
              }
              issueTypeI = issueTypeI + 1;
            }
          }
          categoryPoints.value = Math.round(categoryVal / issueTypeI);
          points.push(categoryPoints);
          categoryI = categoryI + 1;
        }
      }
      console.log(points);
      Highcharts.chart('container', {
        xAxis: {
          events: {
            setExtremes: function (e) {
              $('.ta').val(Math.abs(this.chart.series[0].tree.levelDynamic));
              $('.ta').change();
            },
          }
        },
        series: [{
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          allowDrillToNode: true,
          animationLimit: 1000,
          dataLabels: {
            enabled: false
          },
          levelIsConstant: false,
          levels: [{
            level: 1,
            dataLabels: {
              enabled: true
            },
            borderWidth: 3
          }],
          data: points
        }],
        title: {
          text: ''
        }
      }, function (chart) {
        $('.btn').click(function () {
          let drillLevels = chart.series[0].tree.children[0].i;
          console.log(drillLevels)
          for (let i = 0; i < drillLevels; i++) {
            chart.series[0].drillUp();
          }
        })
      });
    }
  });
});
