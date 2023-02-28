const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// app.get("/", async (req, res) => {
//     for (let i = 0; i < 310; i++) {
//         await axios
//             .get(
//                 `https://korea-webtoon-api.herokuapp.com/?page=${i}&perPage=20`
//             )
//             .then((result) => {
//                 let copyArr = [];
//                 for (let webtoon of result.data.webtoons) {
//                     if (webtoon.additional.up === true) {
//                         copyArr.push(webtoon.title);
//                     }
//                 }
//                 console.log(copyArr);
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     }
//     res.render("main");
// });
app.get("/", (req, res) => {
    res.render("main");
});

app.get("/webtoon", (req, res) => {
    res.render("webtoon");
});

app.listen(3000, () => {
    console.log("Listening on PORT 3000!");
});
