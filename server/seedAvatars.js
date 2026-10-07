require("dotenv").config();
const mongoose = require("mongoose");
const Avatar = require("./models/avatars");
const urls = [
  "https://i.imgur.com/qGsYvAK.png",
  "https://i.imgur.com/2yxwOt6.png",
  "https://i.imgur.com/fzB1ZPT.png",
  "https://i.imgur.com/IZYdi6A.png",
  "https://i.imgur.com/EBX70zu.png",
  "https://i.imgur.com/rUwDBuq.png"
];
(async () => {
  await mongoose.connect(process.env.DB);
  await Avatar.deleteMany({});
  await Avatar.insertMany(urls.map(link => ({ link })));
  console.log(`Seeded ${urls.length} avatars.`);
  await mongoose.disconnect();
})();
