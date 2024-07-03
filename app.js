const express = require("express");
const app = express();
const path = require("path");
const Axios = require("axios");

const port = process.env.PORT || 80;

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

const url = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons";

app.get("/webtoon/search/:keyword", (req, res) => {
    const { keyword } = req.params;

    Axios.get(`${url}?keyword=${keyword}`)
        .then((response) => {
            res.send(response.data.webtoons);
        })
        .catch((err) => console.error(err));
});

app.get("/webtoon/:id/:page", (req, res) => {
    const { id, page } = req.params;
    console.log("platform", id, page);
    if (["NAVER", "KAKAO", "KAKAO_PAGE"].includes(id)) {
        Axios.get(`${url}?page=${page}&perPage=20&provider=${id}`)
            .then((response) => res.send(response.data.webtoons))
            .catch((err) => console.error(err));
    } else {
        Axios.get(`${url}?page=${page}&perPage=20&updateDay=${id}`)
            .then((response) => res.send(response.data.webtoons))
            .catch((err) => console.error(err));
    }
});

app.listen(port, () => {
    console.log("Listening on PORT 3000!");
});
