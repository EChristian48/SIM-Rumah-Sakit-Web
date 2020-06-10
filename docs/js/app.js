// CSS Imports
import '../css/custom.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

// JS Imports
import 'onsenui'
import {avoidConsoleError} from './plugins.js'
import {Initializer} from "./initializer.js";

// Only use with Babel
// import 'regenerator-runtime'

const App = {
  init: async function () {
    avoidConsoleError()

    this.nav = document.querySelector('#nav')

    const splitSide = document.querySelector('#side')
    splitSide.setAttribute('collapse', '')

    Initializer.init()
  },
}

App.init()

export {App}
