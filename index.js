const express = require("express");
const app = express();
const RoutesMongodb = require("./routes/RoutesMongodb.js");
const RoutesMongoose = require("./routes/RoutesMongoose.js");
const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(
      "mongodb://mkhotami:mkhotami@127.0.0.1:27017/eduwork-mongoose?authSource=admin"
    );
    console.log("Koneksi mongoose berhasil");
  } catch (error) {
    console.log(error);
  }
})();

app.use(express.static("uploadsMongodb"));
app.use(express.static("uploadsMongoose"));
app.use(express.json());
app.use("/api/v1", RoutesMongodb);
app.use("/api/v2", RoutesMongoose);
app.use((req, res, next) => {
  res.status(404).send({
    status: "gagal",
    pesan: "halaman tidak ada",
  });
});

app.listen(3000, () => console.log("App is running..."));
