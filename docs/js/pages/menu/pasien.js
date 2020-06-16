import {App} from "../../app";

const pasienMenu = {
  init: function () {
    pasienMenu.menuButton = document.querySelector('#pasienMenu #menuButton')
    pasienMenu.menuButton.addEventListener('click', App.openSide)
  }
}

export {pasienMenu}
