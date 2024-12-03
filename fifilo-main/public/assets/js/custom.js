$(document).ready(function () {
  var owl = $(".testimonials__slide").owlCarousel({
    autoplay: true,
    margin: 20,
    loop: true,
    autoplayTimeout: 7000,
    smartSpeed: 800,
    items: 1.8,
    center: true,
    nav: true,
    dots: false,
    slideBy: 1,
    navText: [
      '<img src="./assets/img/chevron-left.svg">', // Left arrow ke liye custom HTML
      '<img src="./assets/img/chevron-right.svg">', // Right arrow ke liye custom HTML
    ],
    responsive: {
      0: {
        items: 1,
      },

      768: {
        items: 1.2,
        margin: 12,
      },

      1024: {
        items: 1.4,
      },

      1366: {
        items: 1.8,
      },
    },
  });

  // $(".owl-prev").click(function () {
  //   owl.trigger("prev.owl.carousel");
  // });

  // $(".owl-next").click(function () {
  //   owl.trigger("next.owl.carousel");
  // });
});

// $(document).ready(function () {
//   var $modal = $("#careerModal");

//   if ($modal.length && !$modal.hasClass("modal-initialized")) {
//     var myModal = new bootstrap.Modal($modal[0]);
//     $modal.addClass("modal-initialized");

//     window.addEventListener("message", function (event) {
//       if (event.data === "closeModal") {
//         myModal.hide();
//       }
//     });
//   }
// });
