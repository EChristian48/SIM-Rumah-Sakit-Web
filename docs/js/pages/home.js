import ons from "onsenui";
import {App} from "../app.js";
import {openPage} from "../helper.js";

const homePage = {
  logout: async function () {
    await App.firebaseApp.auth().signOut()
    homePage.disableSide()
    await App.nav.resetToPage('/pages/login.html', {animation: 'lift'})
  },

  // Side menu helper
  openSide: function () {
    homePage.side.open()
  },
  enableSide: function () {
    homePage.side = document.querySelector('#side')
    homePage.side.firstElementChild.lastElementChild.append(homePage.sideContent)
    homePage.side.setAttribute('swipeable', 'true')
  },
  disableSide: function () {
    homePage.side.close()
    homePage.side.firstElementChild.lastElementChild.removeChild(homePage.sideContent)
    homePage.side.setAttribute('swipeable', 'false')
  },
  removeMenu: function (...elements) {
    for (const element of elements) {
      homePage.sideList.removeChild(element)
    }
  },

  init: async function () {
    // This must go first before enableSide()
    homePage.sideContent = await ons.createElement('/pages/side.html')
    homePage.enableSide()
    homePage.menuButton = document.querySelector('#menuButton')
    homePage.menuButton.addEventListener('click', homePage.openSide)

    // Side content elements
    // Universal (all role can access) menus
    homePage.sideList = homePage.sideContent.querySelector('ons-list')
    homePage.roleText = homePage.sideContent.querySelector('#role')
    // Role-specific elements
    // Assigning each menu content to this object
    for (const child of homePage.sideList.children) {
      if (child.id !== '')
        homePage[child.id] = child
    }

    homePage.aboutMenu.addEventListener('click', () => openPage('about'))
    homePage.logoutMenu.addEventListener('click', homePage.logout)

    const userTokenResult = await App.user.getIdTokenResult()
    const role = userTokenResult.claims.role
    homePage[`init_${role}`]()
  },

  init_admin: function () {
    homePage.roleText.innerText = 'Admin'
  },
  init_apoteker: function () {
    homePage.roleText.innerText = 'Apoteker'
    homePage.removeMenu(
      homePage.transaksiMenu,
      homePage.dokterMenu,
    )
  },
  init_dokter: function () {
    homePage.roleText.innerText = 'Dokter'
    homePage.removeMenu(homePage.transaksiMenu)
  },
  init_kasir: function () {
    homePage.roleText.innerText = 'Kasir'
    homePage.removeMenu(homePage.dokterMenu)
  },
}

export {homePage}
