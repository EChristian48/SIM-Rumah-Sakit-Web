import ons from "onsenui";
import {App} from "../app.js";

const homePage = {
  openSide: function () {
    homePage.side.open()
  },

  logout: async function () {
    await App.firebaseApp.auth().signOut()
    homePage.disableSide()
    await App.nav.resetToPage('../../pages/login.html', {animation: 'lift'})
  },

  enableSide: function () {
    homePage.side.firstElementChild.lastElementChild.append(homePage.sideList)
    homePage.side.setAttribute('swipeable', 'true')
  },

  disableSide: function () {
    homePage.side.close()
    homePage.side.firstElementChild.lastElementChild.removeChild(homePage.sideList)
    homePage.side.setAttribute('swipeable', 'false')
  },

  init: async function () {
    // DOM elements
    homePage.menuButton = document.querySelector('#menuButton')
    homePage.side = document.querySelector('#side')
    // Side content elements
    // Universal (all role can access) menus
    homePage.sideList = await ons.createElement('../../pages/side.html')
    homePage.roleText = homePage.sideList.querySelector('#role')

    homePage.aboutMenu = homePage.sideList.querySelector('#aboutMenu')
    homePage.logoutMenu = homePage.sideList.querySelector('#logoutMenu')
    homePage.homeMenu = homePage.sideList.querySelector('#homeMenu')
    // Role-specific menus


    homePage.enableSide()

    homePage.menuButton.addEventListener('click', homePage.openSide)
    homePage.logoutMenu.addEventListener('click', homePage.logout)

    console.log(homePage.roleText.innerText)
    console.log(homePage.sideList.querySelector('ons-list'))
    App.user.getIdTokenResult().then(r => console.log(r.claims.role))
  },

  init_admin: function () {
    homePage.roleText.innerText = 'Admin'
  },
  init_apoteker: function () {
    homePage.roleText.innerText = 'Apoteker'
  },
  init_dokter: function () {
    homePage.roleText.innerText = 'Dokter'
  },
  init_kasir: function () {
    homePage.roleText.innerText = 'Kasir'
  },
}

export {homePage}
