const { MongoClient } = require("mongodb");

const url = "mongodb://mkhotami:mkhotami@127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "eduwork-native";

(async () => {
  try {
    await client.connect();
    console.log("Koneksi mongodb berhasil");
  } catch (error) {
    console.log("koneksi mongodb berhasil");
  }
})();

const db = client.db(dbName);

module.exports = db;
