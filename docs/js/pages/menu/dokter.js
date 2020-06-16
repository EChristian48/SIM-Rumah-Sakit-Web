import {App} from "../../app";

const dokterMenu = {
  init: function () {
    dokterMenu.menuButton = document.querySelector('#dokterMenu #menuButton')
    dokterMenu.menuButton.addEventListener('click', App.openSide)
  }
}

export {dokterMenu}
