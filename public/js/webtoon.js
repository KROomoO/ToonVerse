$(document).ready(() => {
    let page = 0;
    getWebtoon(dateText(new Date().getDay()));
});

$(".week").on("click", "li", function () {
    getWebtoon($(this).attr("id"));
});

$(".platForm").on("click", "li", function () {
    getWebtoon($(this).attr("id"));
});

$(".LNB").on("click", "li", function () {
    $(`.${$(this).attr("id")}`).removeClass("disNone");
    $(`.${$(this).attr("id")}`)
        .siblings()
        .addClass("disNone");
});

function getWebtoon(item) {
    page = 0;
    $.ajax({
        url: `/webtoon/${item}/${page}`,
        type: "get",
        dataType: "json",
        success: function (data) {
            const webtoon = data.map(parsingWebtoon);
            $(".webtoonContainer").html([...webtoon]);
        },
        complete: aaaaaa,
        //
    });
}

function aaaaaa() {
    $(".webtoonItem")
        .last()
        .on("click", () => {
            console.log("aa");
        });
    console.log("aa");
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

// // const $ul = document.querySelector("ul");
// // let $li = document.querySelector("li:last-child");
// // let count = $ul.children.length;
// // // 1. 인터섹션 옵저버 생성
// // const io = new IntersectionObserver(
// //     (entry, observer) => {
// //         // 3. 현재 보이는 target 출력
// //         const ioTarget = entry[0].target;
// //         // 4. viewport에 target이 보이면 하는 일
// //         if (entry[0].isIntersecting) {
// //             console.log("현재 보이는 타켓", ioTarget);
// //             // 5. 현재 보이는 target 감시 취소해줘
// //             io.unobserve($li);
// //             // 6. 새로운 li 추가해
// //             $li = $ul.appendChild(document.createElement("li"));
// //             $li.textContent = ++count;
// //             // 7. 새로 추가된 li 감시해!
// //             io.observe($li);
// //         }
// //     },
// //     {
// //         // 8. 타겟이 50% 이상 보이면 해줘!
// //         threshold: 0.5,
// //     }
// // );
// // // 2. li감시해!
// // io.observe($li);
// const mainContainer = document.querySelector("#container");
// let count = mainContainer.children.length;
// let focusElement = mainContainer.lastElementChild;
// const io = new IntersectionObserver(
//     (entry, observer) => {
//         const ioTarget = entry[0].target;
//         if (entry[0].isIntersecting) {
//             console.log("현재 보이는 타겟", ioTarget);
//             io.unobserve(focusElement);
//             focusElement = mainContainer.appendChild(
//                 document.createElement("div")
//             );
//             focusElement.textContent = ++count;
//             io.observe(focusElement);
//         }
//     },
//     {
//         threshold: 0,
//     }
// );
// io.observe(focusElement);
