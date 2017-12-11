import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCz4uonF0aSt0Zx1p3cE9iQyj1BMWuWlLU',
    databaseURL: 'https://mushfiqweb-anime.firebaseio.com'
};
firebase.initializeApp(config);

const rootRef = firebase.database().ref();
export const tasksRef = rootRef.child('tasks');
export const timeRef = firebase.database.ServerValue.TIMESTAMP;
