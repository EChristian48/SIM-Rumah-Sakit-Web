const Router = {
  init: function () {
    this.nav = document.querySelector('#nav')
    this.nav.page = '../pages/login.html'
    this.nav.addEventListener('postpush', this.initPage)
  },

  initPage: function (event) {
    Router[event.enterPage.id]()
  },

  dashboard: function() {
    const toolbarButton = document.querySelector('#toolbarButton')
    const side = document.querySelector('#side')

    side.setAttribute('swipeable', 'true')
    toolbarButton.addEventListener('click', () => {
      side.open()
    })
  },

  login: function () {
    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener('click', () => {
      Router.nav.pushPage('../pages/dashboard.html')
    })
  },

}

export {Router}
