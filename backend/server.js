const express = require('express');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const auth = admin.auth();

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await auth.createUser({ email, password });
    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await auth.getUserByEmail(email);
    // Implement password verification here
    res.status(200).send({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
