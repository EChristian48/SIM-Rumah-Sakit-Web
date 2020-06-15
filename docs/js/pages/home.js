import {App} from "../app.js";

const homePage = {
  init: async function () {
    await App.enableSide()
    homePage.menuButton = document.querySelector('#menuButton')
    homePage.menuButton.addEventListener('click', App.openSide)

    // Side content elements
    // Universal (all role can access) menus
    App.sideList = App.sideContent.querySelector('ons-list')
    App.roleText = App.sideContent.querySelector('#role')

    // Role-specific elements
    // Assigning each menu content to this object
    for (const child of App.sideList.children) {
      if (child.id !== '')
        App[child.id] = child
    }

    App.aboutMenu.addEventListener('click', () => App.openPage('about'))
    App.logoutMenu.addEventListener('click', App.logout)

    const userTokenResult = await App.user.getIdTokenResult()
    App.user.role = userTokenResult.claims.role

    App.roleText.innerText = App.user.role
    App[`init_${App.user.role}`]()
  },
}

export {homePage}
