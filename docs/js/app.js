// CSS Imports
import '../css/custom.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

// JS Imports
import 'onsenui'
import * as firebase from "firebase";
import {firebaseConfig} from "./config/firebase.js";
import {avoidConsoleError} from './helper.js'
import {Initializer} from "./initializer.js";

// Only use with Babel
// import 'regenerator-runtime'

const App = {
  init: async function () {
    // Plugins
    avoidConsoleError()

    // Initialization for Firebase instance
    App.firebaseApp = firebase.initializeApp(firebaseConfig)

    // Emulator Initialization !!DEV ONLY!!
    App.initEmulator()

    // Initialization for Onsen
    App.nav = document.querySelector('#nav')

    const splitSide = document.querySelector('#side')
    splitSide.setAttribute('collapse', '')

    Initializer.init()
  },

  initEmulator: function () {
    App.db = App.firebaseApp.firestore()
    if (location.hostname === 'localhost') {
      App.db.settings({
        host: 'localhost:5002',
        ssl: false,
      })
    }
    firebase.functions().useFunctionsEmulator('http://localhost:5001')
  }
};

(async () => {
  await App.init()
})()

export {App}
