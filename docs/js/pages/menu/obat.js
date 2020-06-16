import {App} from "../../app";

const obatLanding = {
  // init, show, hide, destroy function are called from Initializer
  init: function () {
    obatLanding.page = document.querySelector('#obatLanding')
    obatLanding.menuButton = obatLanding.page.querySelector('#menuButton')
    obatLanding.menuButton.addEventListener('click', App.openSide)

    // Initialization based on user's role
    obatLanding[`${App.user.role}_init`]()
  },

  admin_init() {
    // Remove menu that this user shouldn't open
    obatLanding.page.querySelector('#permintaanObat').remove()

    obatLanding.page.querySelector('#dataObat')
      .addEventListener('click', () => App.openPage('menu/obat/data'))
    obatLanding.page.querySelector('#permintaanRestock')
      .addEventListener('click', () => App.openPage('menu/obat/reqStock'))
    obatLanding.page.querySelector('#laporanObat')
      .addEventListener('click', () => App.openPage('menu/obat/laporan'))
  },

  apoteker_init() {

  },
}

const obatData = {
  init() {

  },

  show() {

  },
}

export {obatLanding, obatData}
