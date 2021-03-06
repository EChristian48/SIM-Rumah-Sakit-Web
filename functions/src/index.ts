import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const serviceAccount = require('../serviceAccount.json')

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = app.firestore()

export const getRole = functions.https.onCall(async (data, context): Promise<void> => {
  // Kalo pake context.auth.token.email itu dapet error, possibly undefined
  // Walau kita pake null coesadcasifnag operator juga, tetep jadi type string|undefined cannot be assigned to string
  const result = await db.collection('roles')
    .where('emails', 'array-contains', data.email)
    .get()
  if (result.empty) {
    throw new functions.https.HttpsError(
      "permission-denied",
      'Kamu siapa mas?'
    )
  }

  const user = await app.auth().getUserByEmail(data.email)
  return app.auth().setCustomUserClaims(user.uid, {role: result.docs[0].id})
})

export const Test = functions.https.onCall((data, context) => {
  return context.auth?.token.email
})
