const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

const createUserDocument = functions.auth.user().onCreate(async (user) => {
  db.collection("users")
    .doc(user.email)
    .set(JSON.parse(JSON.stringify(user)));
});

module.exports = { createUserDocument };
