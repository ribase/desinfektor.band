
$(document).ready(function() {
    $(document).foundation();
    $(".owl-carousel").owlCarousel({
        pagination: false,
        singleItem: true,
        dots: false,
        items: 1,
        autoplay: true,
        loop: true
    });

    var timeout = function () {
        $("footer").fadeIn("slow")
    };
    setTimeout(timeout, 5000);

});