const Initializer = {
  init: function () {
    this.nav = document.querySelector('#nav')
    this.nav.page = '../pages/login.html'
    document.addEventListener('init', this.pageEventHandler)
    document.addEventListener('hide', this.pageEventHandler)
  },

  pageEventHandler: function (event) {
    if (event.target.id !== '')
      if (Initializer[`${event.target.id}_${event.type}`] !== undefined)
        Initializer[`${event.target.id}_${event.type}`]()
  },

  dashboard_init: function () {
    const toolbarButton = document.querySelector('#toolbarButton')
    const side = document.querySelector('#side')

    side.setAttribute('swipeable', 'true')
    toolbarButton.addEventListener('click', () => {
      side.open()
    })
  },

  login_init: function () {
    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener('click', async () => {
      await Initializer.nav.pushPage('../pages/dashboard.html')
    })
  },

  login_hide: function () {

  }

}

export {Initializer}
