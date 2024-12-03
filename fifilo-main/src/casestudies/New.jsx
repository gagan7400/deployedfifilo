import $ from "jquery";
export let getdata = () => {
  $(document).ready(function () {
    const scrollWrapper = $(".horizontal-scroll-wrapper");
    const containers = $(".horizontal-scroll-container");

    // Remove isHorizontalScrollComplete if it's not being used
    // let isHorizontalScrollComplete = false; // Remove this line

    function handleScroll() {
      const scrollPosition = $(window).scrollTop();

      const homeWalkthrough = $(".design__process");
      const homeWalkthroughTop = homeWalkthrough.offset().top;
      const homeWalkthroughBottom = homeWalkthroughTop + homeWalkthrough.outerHeight();

      if (scrollPosition >= homeWalkthroughTop && scrollPosition < homeWalkthroughBottom) {
        const scrollProgress = (scrollPosition - homeWalkthroughTop) / (homeWalkthroughBottom - homeWalkthroughTop);
        const percentageScrolled = Math.min(100, scrollProgress * 100);

        const maxHorizontalScrollPercentage = 80;
        const horizontalScrollPercentage = Math.min(maxHorizontalScrollPercentage, percentageScrolled);
        scrollWrapper.css("transform", `translate3d(-${horizontalScrollPercentage}%, 0, 0)`);

        containers.each(function (index) {
          const strokeArrow = $(this).find(".horizontal-stroke-arrow");
          const stroke = $(this).find(".horizontal-stroke");
          const contentBox = $(this).find(".content__box");

          if (strokeArrow.length) {
            const containerStart = (index / containers.length) * maxHorizontalScrollPercentage;
            const containerEnd = ((index + 1) / containers.length) * maxHorizontalScrollPercentage;

            if (percentageScrolled >= containerStart && percentageScrolled < containerEnd) {
              const containerScroll = ((percentageScrolled - containerStart) / (containerEnd - containerStart)) * 100;
              strokeArrow.css("width", `${containerScroll}%`);
              stroke.addClass("active");
              contentBox.addClass("highlight");
            } else if (percentageScrolled >= containerEnd) {
              strokeArrow.css("width", "100%");
              stroke.addClass("active");
              contentBox.addClass("highlight");
            } else {
              strokeArrow.css("width", "0%");
              stroke.removeClass("active");
              contentBox.removeClass("highlight");
            }
          }
        });
      } else {
        scrollWrapper.css("transform", "translate3d(0, 0, 0)");

        containers.each(function () {
          $(this).siblings(".horizontal-stroke").removeClass("active");
          $(this).siblings(".content__box").removeClass("highlight");
        });
      }
    }

    function checkIntersection() {
      const homeWalkthrough = $(".design__process");
      const homeWalkthroughTop = homeWalkthrough.offset().top;
      const homeWalkthroughBottom = homeWalkthroughTop + homeWalkthrough.outerHeight();
      const viewportHeight = $(window).height();
      const scrollTop = $(window).scrollTop();

      if (scrollTop + viewportHeight > homeWalkthroughTop && scrollTop < homeWalkthroughBottom) {
        $(window).on("scroll", handleScroll);
      } else {
        $(window).off("scroll", handleScroll);
        scrollWrapper.css("transform", "translate3d(0, 0, 0)");

        containers.each(function () {
          $(this).siblings(".horizontal-stroke").removeClass("active");
          $(this).siblings(".content__box").removeClass("highlight");
        });
      }
    }

    checkIntersection();
    $(window).on("scroll", checkIntersection);

    function cleanup() {
      $(window).off("scroll", handleScroll);
      $(window).off("scroll", checkIntersection);
      $(".horizontal-scroll-wrapper").css("transform", "translate3d(0, 0, 0)");
      $(".horizontal-stroke").removeClass("active");
      $(".content__box").removeClass("highlight");
      $(".horizontal-stroke-arrow").css("width", "0%");
    }

    return cleanup;
  });


  // $(document).ready(function () {
  //   const scrollWrapper = $(".horizontal-scroll-wrapper");
  //   const containers = $(".horizontal-scroll-container");

  //   let isHorizontalScrollComplete = false; // Flag to track if horizontal scroll is complete

  //   // Function to handle scrolling effect
  //   function handleScroll() {
  //     const scrollPosition = $(window).scrollTop();

  //     // Ensure the horizontal scroll only occurs within the .design__process section
  //     const homeWalkthrough = $(".design__process");
  //     const homeWalkthroughTop = homeWalkthrough.offset().top;
  //     const homeWalkthroughBottom = homeWalkthroughTop + homeWalkthrough.outerHeight();

  //     if (scrollPosition >= homeWalkthroughTop && scrollPosition < homeWalkthroughBottom) {
  //       // Calculate the percentage of the section scrolled
  //       const scrollProgress = (scrollPosition - homeWalkthroughTop) / (homeWalkthroughBottom - homeWalkthroughTop);
  //       const percentageScrolled = Math.min(100, scrollProgress * 100);

  //       // Ensure horizontal scroll reaches 80%
  //       const maxHorizontalScrollPercentage = 80;
  //       const horizontalScrollPercentage = Math.min(maxHorizontalScrollPercentage, percentageScrolled);
  //       scrollWrapper.css("transform", `translate3d(-${horizontalScrollPercentage}%, 0, 0)`);

  //       containers.each(function (index) {
  //         const strokeArrow = $(this).find(".horizontal-stroke-arrow");
  //         const stroke = $(this).find(".horizontal-stroke");
  //         const contentBox = $(this).find(".content__box");

  //         if (strokeArrow.length) {
  //           const containerStart = (index / containers.length) * maxHorizontalScrollPercentage;
  //           const containerEnd = ((index + 1) / containers.length) * maxHorizontalScrollPercentage;

  //           if (percentageScrolled >= containerStart && percentageScrolled < containerEnd) {
  //             const containerScroll = ((percentageScrolled - containerStart) / (containerEnd - containerStart)) * 100;
  //             strokeArrow.css("width", `${containerScroll}%`);

  //             // Add class to horizontal-stroke and content__box when horizontal-stroke-arrow width starts changing
  //             stroke.addClass("active");
  //             contentBox.addClass("highlight");
  //           } else if (percentageScrolled >= containerEnd) {
  //             strokeArrow.css("width", "100%");
  //             stroke.addClass("active");
  //             contentBox.addClass("highlight");
  //           } else {
  //             strokeArrow.css("width", "0%");
  //             stroke.removeClass("active");
  //             contentBox.removeClass("highlight");
  //           }
  //         }
  //       });

  //       // Check if horizontal scroll is complete
  //       isHorizontalScrollComplete = horizontalScrollPercentage >= maxHorizontalScrollPercentage;
  //     } else {
  //       // Reset scroll transform when out of the .design__process section
  //       scrollWrapper.css("transform", "translate3d(0, 0, 0)");
  //       isHorizontalScrollComplete = false;

  //       // Remove classes when out of the section
  //       containers.each(function () {
  //         $(this).siblings(".horizontal-stroke").removeClass("active");
  //         $(this).siblings(".content__box").removeClass("highlight");
  //       });
  //     }

  //     // Prevent vertical scroll until horizontal scroll is complete
  //     // if (!isHorizontalScrollComplete) {
  //     //   $(window).scrollTop(scrollPosition);
  //     // }
  //   }

  //   // Create an IntersectionObserver-like functionality to detect when .design__process enters and exits the viewport
  //   function checkIntersection() {
  //     const homeWalkthrough = $(".design__process");
  //     const homeWalkthroughTop = homeWalkthrough.offset().top;
  //     const homeWalkthroughBottom = homeWalkthroughTop + homeWalkthrough.outerHeight();
  //     const viewportHeight = $(window).height();
  //     const scrollTop = $(window).scrollTop();

  //     if (scrollTop + viewportHeight > homeWalkthroughTop && scrollTop < homeWalkthroughBottom) {
  //       $(window).on("scroll", handleScroll);
  //     } else {
  //       $(window).off("scroll", handleScroll);
  //       // Reset horizontal scroll transform when section is out of view
  //       scrollWrapper.css("transform", "translate3d(0, 0, 0)");
  //       isHorizontalScrollComplete = false;

  //       // Remove classes when out of the section
  //       containers.each(function () {
  //         $(this).siblings(".horizontal-stroke").removeClass("active");
  //         $(this).siblings(".content__box").removeClass("highlight");
  //       });
  //     }
  //   }

  //   // Check for intersection initially and on scroll
  //   checkIntersection();
  //   $(window).on("scroll", checkIntersection);
  //   function cleanup() {
  //     $(window).off("scroll", handleScroll);
  //     $(window).off("scroll", checkIntersection);
  //     $(".horizontal-scroll-wrapper").css("transform", "translate3d(0, 0, 0)");
  //     $(".horizontal-stroke").removeClass("active");
  //     $(".content__box").removeClass("highlight");
  //     $(".horizontal-stroke-arrow").css("width", "0%");
  //   }
  //   return cleanup;
  // });
};
export let another = () => {
  $(document).ready(function () {
    // Add 'active' class to the first .stroke-circle initially
    $(".border-section").first().find(".stroke-circle").addClass("active");
    $(".border-section").first().siblings(".col-lg-3").find(".card__bx").addClass("active");

    // Handle border section height adjustment and class addition
    $(window).on("scroll", function () {
      $(".border-section").each(function () {
        var $this = $(this);
        var $row = $this.closest(".row"); // Find the closest parent row to find the corresponding .card__bx
        var $cardBx = $row.find(".card__bx"); // Find .card__bx within the same row

        if ($this.length) {
          // Ensure the element exists
          var sectionTop = $this.offset().top;
          var sectionHeight = $this.height();
          var scrollPosition = $(window).scrollTop();
          var windowHeight = $(window).height();

          // Calculate start and end points for the section
          var startOffset = sectionTop - windowHeight * 0.4; // Adjust as needed
          var endOffset = sectionTop + sectionHeight - windowHeight * 0.4; // Adjust as needed

          var scrollPercentage = 0;

          if (scrollPosition >= startOffset && scrollPosition <= endOffset) {
            scrollPercentage = (scrollPosition - startOffset) / (endOffset - startOffset);
            // Add class to .stroke-circle and .card__bx
            $this.find(".stroke-circle").addClass("active");
            $cardBx.addClass("active");
          } else if (scrollPosition > endOffset) {
            scrollPercentage = 1;
            // Add class to .stroke-circle and .card__bx
            $this.find(".stroke-circle").addClass("active");
            $cardBx.addClass("active");
          } else {
            // Remove class when not in range
            $this.find(".stroke-circle").removeClass("active");
            $cardBx.removeClass("active");
          }

          // Ensure scrollPercentage is between 0 and 1
          scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 1);

          // Apply the height based on scrollPercentage
          $this.find(".stroke-border").css("height", scrollPercentage * 100 + "%");
        }
      });
    });

    // Trigger the scroll event initially to set the initial state
    $(window).trigger("scroll");
  });
};
