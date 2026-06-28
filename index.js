const express = require("express");
const { ServerApiVersion, MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

/** client থেকে Server Side অনুমোদন পাওয়ার জন্য CORS Middleware for Express */
const cors = require("cors");
app.use(cors());
/** Client Side থেকে Data JSON stringify হয়ে আসার সময় JSON Parse করতে হয়  */
app.use(express.json());

// simpleDBUser
// 6FLzph8cCiKYrtvw
const uri =
  "mongodb+srv://simpleDBUser:iEzb0SCWK8EnQvCj@cluster0.mrg0zof.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
/* Express Route */
app.get("/", (req, res) => {
  res.send("Simple crud Server is running");
});

async function run() {
  try {
    await client.connect();
    const userDB = client.db("usersDB");
    const usersCollection = userDB.collection("users");

    // add database related api here
    app.post("/users", async (req, res) => {
      const newUsers = req.body;
      const result = await usersCollection.insertOne(newUsers);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Simple crud Server is running on port ${port}`);
});
