import * as firebase from "firebase";
import ons from 'onsenui'
import {App} from "../app";

const loginPage = {
  // Show the loading modal
  showLoading: function () {
    loginPage.modal.show()
  },

  // Hide the loading modal
  hideLoading: function () {
    loginPage.modal.hide()
  },

  // Populate Firestore with dummy data
  pop: async function () {
    const roleRef = App.db.collection('roles')
    const dokRef = roleRef.doc('dokter')
    const apoRef = roleRef.doc('apoteker')
    const kasRef = roleRef.doc('kasir')
    const adRef = roleRef.doc('admin')

    await Promise.all([
      adRef.set({
        emails: ['erickchristian48@gmail.com']
      }),
      apoRef.set({
        emails: ['erickchristian48nomor2@gmail.com']
      }),
      dokRef.set({
        emails: ['erickchristian48nomor3@gmail.com']
      }),
      kasRef.set({
        emails: ['erickchristian48nomor4@gmail.com']
      })
    ])
    console.log('Bikin roles berhasil!')
  },

  // Login using Google OAuth
  login: async function () {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      loginPage.showLoading()
      await App.firebaseApp.auth().signInWithRedirect(provider)
    } catch (e) {
      // Show failed trying to login alert
      await ons.notification.alert({
        title: `Error: ${e.code}`,
        message: e.message,
      })
    }
  },

  init: async function () {
    // Populating the Firestore
    // !!DEV ONLY!!
    const popButton = document.querySelector('#pop')
    popButton.addEventListener('click', loginPage.pop)

    // References to DOM elements
    loginPage.modal = document.querySelector('ons-modal')
    loginPage.loginButton = document.querySelector('#loginButton')

    loginPage.loginButton.addEventListener('click', loginPage.login)
  },

  show: async function () {
    loginPage.showLoading()
    await App.firebaseApp.auth().getRedirectResult()

    App.firebaseApp.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        loginPage.hideLoading()
        return
      }

      // Save it to App instance
      App.user = user

      // Get the user role
      // If not found, the login process will fail
      const getRole = App.firebaseApp.functions().httpsCallable('getRole')
      try {
        await getRole({email: user.email})
      } catch (e) {
        loginPage.hideLoading()
        App.firebaseApp.auth().signOut()

        // Show failed to login alert
        await ons.notification.alert({
          title: `Gagal login: ${e.code}`,
          message: e.message
        })
        return
      }

      loginPage.hideLoading()
      await App.nav.resetToPage('../../pages/home.html', {animation: 'lift'})
    })
  },
}

export {loginPage}
