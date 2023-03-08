$(document).ready(() => {
    let page = 0;
    const webtoonContainer = $(".webtoonContainer");
    let chooseCategory = dateText(new Date().getDay());

    const DOMHandleObserver = new MutationObserver((mutations) => {
        let scrollItem =
            document.querySelector(".webtoonContainer").lastElementChild;

        scrollHandleObserver.observe(scrollItem);
    });

    const scrollHandleObserver = new IntersectionObserver(
        (entry) => {
            if (entry[0].isIntersecting) {
                scrollHandleObserver.unobserve(entry[0].target);
                $(".webtoonContainer").append(
                    getWebtoon(chooseCategory, ++page)
                );
            }
        },
        {
            threshold: 0,
        }
    );

    DOMHandleObserver.observe(document.querySelector(".webtoonContainer"), {
        childList: true,
    });

    webtoonContainer.html(getWebtoon(chooseCategory));

    $(".LNB").on("click", "li", function () {
        $(this).addClass("chooseColor");
        $(this).siblings().removeClass("chooseColor");
        $(`.${$(this).attr("id")}`).removeClass("disNone");
        $(`.${$(this).attr("id")}`)
            .siblings()
            .addClass("disNone");
    });

    $(".LNB2").on("click", "li", function () {
        chooseCategory = $(this).attr("id");
        webtoonContainer.html(getWebtoon(chooseCategory));
    });

    $(".moveTopBtn").on("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

function getWebtoon(item, page = 0) {
    $(".week").children().removeClass("chooseColor");
    $(".platForm").children().removeClass("chooseColor");
    $(`#${item}`).addClass("chooseColor");
    let resultData = "";
    $.ajax({
        url: `/webtoon/${item}/${page}`,
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            resultData = data.map(parsingWebtoon);
        },
    });
    return resultData;
}

function parsingWebtoon(item) {
    let webtoonStr = "";

    webtoonStr += "<div class='webtoonItem'>";
    webtoonStr += "<div>";

    if (item.additional.adult) {
        webtoonStr += "<img src='image/18.png' class='adult' />";
    }

    webtoonStr += `<img src=${item.img} class='cover' />`;
    if (item.additional.new) {
        webtoonStr += "<strong class='new'>new</strong>";
    }

    if (item.additional.rest) {
        webtoonStr += "<strong class='rest'>휴재</strong>";
    }

    webtoonStr += "</div>";
    webtoonStr += "<div class='wrap_title'>";

    if (item.additional.up) {
        webtoonStr += "<strong class='up'>UP</strong>";
    }

    if (item.title.length > 10) {
        let subTitle = item.title.slice(0, 9) + "...";
        webtoonStr += `<strong class='title'>${subTitle}</strong>`;
    } else {
        webtoonStr += `<strong class='title'>${item.title}</strong>`;
    }

    webtoonStr += "</div>";
    webtoonStr += "</div>";

    return webtoonStr;
}
