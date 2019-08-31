$(document).ready(function () {
    $(".icon-line2-camera").hover(function () {
        $(this).addClass("rotate-scale-up");
    }, function () {
        $(this).removeClass("rotate-scale-up");
    });
    $(".icon-line2-camera").click(function () {
        $(this).closest(".flip-card").toggleClass("hovered");
    });
});