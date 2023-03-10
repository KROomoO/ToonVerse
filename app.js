const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("main");
});

app.get("/webtoon", (req, res) => {
    res.render("webtoon");
});

app.get("/webtoon/search/:keyword", (req, res) => {
    const { keyword } = req.params;
    axios
        .get(
            `https://korea-webtoon-api.herokuapp.com/search?keyword=${keyword}`
        )
        .then((response) => res.send(response.data.webtoons))
        .catch((err) => console.error(err));
});

app.get("/webtoon/:id/:page", (req, res) => {
    const { id, page } = req.params;
    if (["naver", "kakao"].includes(id)) {
        axios
            .get(
                `https://korea-webtoon-api.herokuapp.com/?page=${page}&perPage=20&service=${id}`
            )
            .then((response) => console.log(response.data.webtoons))
            .catch((err) => console.error(err));
    } else {
        axios
            .get(
                `https://korea-webtoon-api.herokuapp.com/?page=${page}&perPage=20&updateDay=${id}`
            )
            .then((response) => res.send(response.data.webtoons))
            .catch((err) => console.error(err));
    }
});

app.listen(3000, () => {
    console.log("Listening on PORT 3000!");
});
