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
    // TODO: add dashboard init
  },

  login: function () {
    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener('click', () => {
      Router.nav.pushPage('../pages/dashboard.html')
    })
  },

}

export {Router}
