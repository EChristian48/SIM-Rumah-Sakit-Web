import {App} from "../app.js";
import {Initializer} from "../initializer.js";

const homePage = {
  init: async function () {
    await App.enableSide()
    homePage.menuButton = document.querySelector('#home #menuButton')
    homePage.menuButton.addEventListener('click', App.openSide)

    // Role-specific elements
    // Assigning each menu content to this object
    for (const child of App.sideList.children) {
      if (child.id !== '')
        App[child.id] = child
    }

    // Not role specific menu
    App.homeMenu.addEventListener('click', App.openHome)
    App.aboutMenu.addEventListener('click', () => App.openPage('about'))
    App.logoutMenu.addEventListener('click', App.logout)

    // Init user profile
    const userTokenResult = await App.user.getIdTokenResult()
    App.user.role = userTokenResult.claims.role
    App.roleELement.innerText = App.user.role
    App.userNameElement.innerText = App.user.displayName
    App.userImgElement.src = App.user.photoURL

    // Call menu initialization based on their role
    Initializer[`${App.user.role}_role_init`]()
  },
}

export {homePage}
