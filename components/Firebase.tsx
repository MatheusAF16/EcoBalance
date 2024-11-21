import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/database'

const firebaseConfig = {
    clientId: 'iafuture-accfa',
    appId: 'iafuture-accfa',
    apiKey: 'AIzaSyD3xF0bVm2WJduCzfqELw3KpJUP0AfQWR4',
    databaseURL: 'https://iafuture-accfa-default-rtdb.firebaseio.com/',
    storageBucket: 'gs://iafuture-accfa.appspot.com',
    messagingSenderId: '',
    projectId: 'iafuture-accfa'
}



firebase.initializeApp(firebaseConfig)


const apps = firebase.apps

apps.forEach(app => console.log(app.name))

const auth = firebase.app().auth()
const database = firebase.app().database()
export {firebase, auth, database}