import {App} from "../../app";

const transaksiMenu = {
  init: function () {
    transaksiMenu.menuButton = document.querySelector('#transaksiMenu #menuButton')
    transaksiMenu.menuButton.addEventListener('click', App.openSide)
  }
}

export {transaksiMenu}
