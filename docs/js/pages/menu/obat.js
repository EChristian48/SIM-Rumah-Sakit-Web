import {App} from "../../app";

const obatMenu = {
  init: function () {
    obatMenu.menuButton = document.querySelector('#obatMenu #menuButton')
    obatMenu.menuButton.addEventListener('click', App.openSide)

    // Initialization based on user's role
    obatMenu[`init_${App.user.role}`]()
  },

  init_admin: function () {

  }
}


export {obatMenu}
