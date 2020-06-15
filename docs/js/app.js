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
import ons from "onsenui";

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
  },

  logout: async function () {
    await App.firebaseApp.auth().signOut()
    App.disableSide()
    await App.nav.resetToPage('/pages/login.html', {animation: 'lift'})
  },

  // Side menu helper
  openSide: function () {
    App.side.open()
  },
  enableSide: async function () {
    App.side = document.querySelector('#side')
    App.sideContent = await ons.createElement('/pages/side.html')
    App.side.firstElementChild.lastElementChild.append(App.sideContent)
    App.side.setAttribute('swipeable', 'true')
  },
  disableSide: function () {
    App.side.close()
    App.side.firstElementChild.lastElementChild.removeChild(App.sideContent)
    App.side.setAttribute('swipeable', 'false')
  },
  removeMenu: function (...elements) {
    for (const element of elements) {
      App.sideList.removeChild(element)
    }
  },

  // Navigation methods
  openPage: async function (page = 'home') {
    App.side.close()
    await App.nav.bringPageTop(`/pages/${page}.html`)
  },
  openHome: async function () {
    App.side.close()
    await App.nav.bringPageTop(`/pages/home.html`)
  },

};

(async () => {
  await App.init()
})()

export {App}
