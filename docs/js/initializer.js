import {App} from "./app.js";
import {loginPage} from './pages/login.js'
import {homePage} from './pages/home.js'
import {obatMenu} from "./pages/menu/obat.js";

const Initializer = {
  init: function () {
    App.nav.page = '/pages/login.html'
    document.addEventListener('init', Initializer.pageEventHandler)
    document.addEventListener('show', Initializer.pageEventHandler)
    document.addEventListener('hide', Initializer.pageEventHandler)
    document.addEventListener('destroy', Initializer.pageEventHandler)
  },

  pageEventHandler: function (event) {
    if (event.target.id !== '')
      if (Initializer[`${event.target.id}_${event.type}`] !== undefined)
        Initializer[`${event.target.id}_${event.type}`]()
  },

  // Name of each handler must be: pageID_eventType
  // Home handlers
  home_init: homePage.init,

  // Login handlers
  login_init: loginPage.init,
  login_show: loginPage.show,

  // Menu handlers
  // Obat
  obatMenu_init: obatMenu.init,

  // App initialization, called with homePage.init()
  admin_role_init: function () {
    App.pasienMenu.addEventListener('click', () => App.openPage('menu/obat'))
    App.obatMenu.addEventListener('click', () => App.openPage('menu/obat'))
    App.obatMenu.addEventListener('click', () => App.openPage('menu/obat'))
    App.obatMenu.addEventListener('click', () => App.openPage('menu/obat'))
  },
  apoteker_role_init: function () {
    App.removeMenu(App.transaksiMenu, App.dokterMenu)
  },
  dokter_role_init: function () {
    App.removeMenu(App.transaksiMenu)
  },
  kasir_role_init: function () {
    App.removeMenu(App.dokterMenu)
  },
}

export {Initializer}
