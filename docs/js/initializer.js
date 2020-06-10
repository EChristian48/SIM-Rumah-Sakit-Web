import ons from 'onsenui'
import {App} from "./app.js";

const Initializer = {
  init: function () {
    App.nav.page = '../pages/login.html'
    document.addEventListener('init', this.pageEventHandler)
    document.addEventListener('hide', this.pageEventHandler)
  },

  pageEventHandler: function (event) {
    if (event.target.id !== '')
      if (Initializer[`${event.target.id}_${event.type}`] !== undefined)
        Initializer[`${event.target.id}_${event.type}`]()
  },

  dashboard_init: async function () {
    const toolbarButton = document.querySelector('#toolbarButton')
    const side = document.querySelector('#side')
    const sideList = await ons.createElement('../pages/side.html')

    side.firstElementChild.lastElementChild.append(sideList)

    side.setAttribute('swipeable', 'true')
    toolbarButton.addEventListener('click', () => {
      side.open()
    })
  },

  login_init: function () {
    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener('click', async () => {
      await App.nav.pushPage('../pages/dashboard.html')
      App.nav.removePage(0)
    })
  },
}

export {Initializer}
