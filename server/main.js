import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { MyCollection } from '/imports/both/MyCollection';

Meteor.startup(() => {
  const data = {
    Bill: {
      something: {
        AUD: {
          Fives: {
            High: {
              Low: {
                N: {
                  Australia: {
                    Australia: {
                      ISIN: {
                        hello: 3943942,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        GBP: {
          Tens: {
            Low: {
              High: {
                N: {
                  UK: {
                    UK: {
                      ISIN: {
                        hello: 2392,
                        hello2: 3938,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    Bond: {
      Agency: {
        AUD: {
          Mid: {
            Medium: {
              High: {
                N: {
                  Norway: {
                    Kommunalbanken: {
                      ISIN: {
                        Turnover: 800000,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      Something: {
        GBP: {
          Tens: {
            Low: {
              High: {
                N: {
                  UK: {
                    'United Kingdom': {
                      ISIN: {
                        hello: 28495,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    CD: {
      'Credit Institution': {
        AUD: {
          Mid: {
            Low: {
              High: {
                N: {
                  Australia: {
                    'Bank of China': {
                      ISIN: {
                        Concentration: 600000,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  MyCollection.remove(); // Delete all data from collection
  MyCollection.insert(data); // Load data into collection
});

Meteor.publish('someData', function publishSomeData() {
  return MyCollection.find();
});
