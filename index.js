const express = require("express");
const connectMongoDb = require("./database/database");
const port = process.env.PORT || 8000;
const cors = require("cors");
const admin = require("firebase-admin");
const tokenRoute = require("./routes/tokenRoute");

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require("./push-notifications-4ac04-firebase-adminsdk-qu3az-c9345006ec.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use("/token", tokenRoute);
app.post("/notificationPost", (req, res) => {
  const { title, body, token, image } = req.body;
  console.log(req.body);

  admin
    .messaging()
    .send({
      notification: {
        title,
        body,
        image,
      },
      token,
    })
    .then(() => {
      res.send("Notification sent successfully");
    })
    .catch((error) => {
      res.status(500).send("sending notification error from server");
      console.error("sending notification error from server:", error);
    });
});

app.listen(port, async () => {
  console.log(`app is running on port ${port}`);
  await connectMongoDb();
});
