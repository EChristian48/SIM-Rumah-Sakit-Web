import {App} from "./app";
import {loginPage} from './pages/login'
import {homePage} from './pages/home'
import {obatLanding} from "./pages/menu/obat";
import {dokterMenu} from "./pages/menu/dokter";
import {pasienMenu} from "./pages/menu/pasien";
import {transaksiMenu} from "./pages/menu/transaksi";
import {removeChildren} from "./helper";
import {obatData} from "./pages/menu/obat";

const Initializer = {
  init: function () {
    App.nav.page = '/pages/login.html'
    document.addEventListener('init', Initializer.pageEventHandler)
    document.addEventListener('show', Initializer.pageEventHandler)
    document.addEventListener('hide', Initializer.pageEventHandler)
    document.addEventListener('destroy', Initializer.pageEventHandler)
  },

  pageEventHandler: function (event) {
    if (event.target.id !== '') {
      if (Initializer[`${event.target.id}_${event.type}`] !== undefined) {
        Initializer[`${event.target.id}_${event.type}`]()
      } else {
        console.warn('No initializer function found for:', event.target.id, event.type)
      }
    }
  },

  // Name of each handler must be: pageID_eventType
  // Home handlers
  home_init: homePage.init,

  // Login handlers
  login_init: loginPage.init,
  login_show: loginPage.show,

  // Menu handlers
  // Dokter
  dokterLanding_init: dokterMenu.init,
  // Obat
  obatLanding_init: obatLanding.init,
  obatData_init: obatData.init,
  // Pasien
  pasienLanding_init: pasienMenu.init,
  // Transaksi
  transaksiLanding_init: transaksiMenu.init,

  // App initialization, called with homePage.init()
  admin_role_init: function () {
    App.dokterMenu.addEventListener('click', () => App.openPage('menu/dokter/landing'))
    App.obatMenu.addEventListener('click', () => App.openPage('menu/obat/landing'))
    App.pasienMenu.addEventListener('click', () => App.openPage('menu/pasien/landing'))
    App.transaksiMenu.addEventListener('click', () => App.openPage('menu/transaksi/landing'))
  },
  apoteker_role_init: function () {
    removeChildren(App.sideList, App.transaksiMenu, App.dokterMenu)
  },
  dokter_role_init: function () {
    App.removeMenu(App.transaksiMenu)
  },
  kasir_role_init: function () {
    App.removeMenu(App.dokterMenu)
  },
}

export {Initializer}
