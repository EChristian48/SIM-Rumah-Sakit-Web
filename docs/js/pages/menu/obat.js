import {App} from "../../app";

const obatMenu = {
  init: function () {
    obatMenu.menuButton = document.querySelector('#obatMenu #menuButton')
    obatMenu.menuButton.addEventListener('click', App.openSide)
  }
}

export {obatMenu}
