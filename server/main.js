import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
  loadData() {
    try {
      return HTTP.get('https://projectec-edbbb.firebaseio.com/Demo4.json?auth=nDiZHVYp8XIN5d38vGiyhZ7cK5l1ky67dEB9gpAF').data;
    } catch (error) {
      throw new Meteor.Error('EGETFIREBASE', 'Something broke');
    }
  },
});
