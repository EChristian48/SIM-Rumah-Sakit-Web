import ons from "onsenui";
import {App} from "../app.js";

const homePage = {
  init: async function () {
    const toolbarButton = document.querySelector('#toolbarButton')
    const side = document.querySelector('#side')
    const sideList = await ons.createElement('../pages/side.html')

    side.firstElementChild.lastElementChild.append(sideList)
    side.setAttribute('swipeable', 'true')

    toolbarButton.addEventListener('click', () => {
      side.open()
    })

    console.log(sideList.querySelector('ons-list'))
  },

  init_admin: function () {

  },
  init_apoteker: function () {

  },
  init_dokter: function () {

  },
  init_kasir: function () {

  },
}

export {homePage}
