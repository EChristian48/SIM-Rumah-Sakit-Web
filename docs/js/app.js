// CSS Imports
import '../css/custom.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

// JS Imports
import 'onsenui'
import {avoidConsoleError} from './plugins.js'
import {Router} from "./router.js";

// Only use with Babel
// import 'regenerator-runtime'

const init = () => {
  const splitSide = document.querySelector('#side')
  splitSide.setAttribute('collapse', '')
}

(async () => {
  avoidConsoleError()
  init()
  Router.init()
})()

