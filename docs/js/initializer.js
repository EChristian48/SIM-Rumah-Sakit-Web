import {App} from "./app.js";
import {loginPage} from './pages/login.js'
import {homePage} from './pages/home.js'

const Initializer = {
  init: function () {
    App.nav.page = '/pages/login.html'
    document.addEventListener('init', this.pageEventHandler)
    document.addEventListener('show', this.pageEventHandler)
    document.addEventListener('hide', this.pageEventHandler)
  },

  pageEventHandler: function (event) {
    if (event.target.id !== '')
      if (Initializer[`${event.target.id}_${event.type}`] !== undefined)
        Initializer[`${event.target.id}_${event.type}`]()
  },

  // Home handlers
  home_init: homePage.init,

  // Login handlers
  login_init: loginPage.init,
  login_show: loginPage.show,

  // Menu handlers

}

export {Initializer}
