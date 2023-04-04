const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.engine("html", require("ejs").renderFile);

app.get("/", (req, res) => {
    res.render(path.resolve(__dirname, "./views/index.html"));
});

app.get("/main", (req, res) => {
    res.render("main");
});

app.get("/webtoon", (req, res) => {
    res.render("webtoon");
});

app.get("/webtoon/search/:keyword", (req, res) => {
    console.log("aa");
    const { keyword } = req.params;
    axios
        .get(
            `https://korea-webtoon-api.herokuapp.com/search?keyword=${keyword}`
        )
        .then((response) => {
            console.log(response.data.webtoons);
            res.send(response.data.webtoons);
        })
        .catch((err) => console.error(err));
});

app.get("/webtoon/:id/:page", (req, res) => {
    const { id, page } = req.params;
    if (["naver", "kakao"].includes(id)) {
        axios
            .get(
                `https://korea-webtoon-api.herokuapp.com/?page=${page}&perPage=20&service=${id}`
            )
            .then((response) => res.send(response.data.webtoons))
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

app.listen(port, () => {
    console.log("Listening on PORT 3000!");
});
