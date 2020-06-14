import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const serviceAccount = require('../serviceAccount.json')

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = app.firestore()

export const getRole = functions.https.onCall(async (data, context): Promise<void> => {
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
