$(() => {
  const advantages = $('.ms_advantages')
  const advantagesTab = $('.ms_advantages__tab')
  const advantagesStage = $('.ms_advantages__stage')
  const advantagesSlides = gsap.utils.toArray('.ms_advantages__item')
  const tab = $('.ms_params__tab');
  const tabContent = $('.ms_params__tab-content');
  const tabGif = $('.ms_params__tab-gif');
  const list = $('.ms_params__list');
  const MOBILE_WIDTH = 992;
  const isMobile = $(window).width() < MOBILE_WIDTH
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({
    duration: 0.5
  })

  if (!isMobile) {
    const tl = gsap.timeline()
    const tlSlider = gsap.timeline({
      paused: true
    })

    tl.set(advantagesStage, {
      xPercent: -50,
      left: '50%'
    })
    tl.set('.ms_advantages__title', {
      opacity: 1
    })
    tl.set('.ms_advantages__stage-img:last-child', {
      opacity: 0
    })
    tl.set('.ms_advantages__content', {
      opacity: 0,
      xPercent: -100,
    })

    function activateTimeline() {
      advantages.addClass('active');
      const advantagesOffset = advantages.offset().top
      gsap.to(window, {
        duration: 0.5,
        scrollTo: advantagesOffset
      });
      tl
        .to('.ms_advantages__stage-icon', {
          opacity: 0
        }, 0.3)
        .to('.ms_advantages__stage-title', {
          opacity: 0
        }, 0.5)
        .to('.ms_advantages__stage-img:first-child', {
          opacity: 0,
          duration: 1
        }, 1)
        .to('.ms_advantages__stage-img:last-child', {
          opacity: 1,
          duration: 1
        }, 1)
        .to(advantagesStage, {
          xPercent: 0,
          left: '0%',
          marginLeft: '-20%'
        })
        .to('.ms_advantages__content', {
          opacity: 1,
          xPercent: 0,
          display: 'block'
        })

      advantagesSlides.forEach((slide, i) => {
        tlSlider.call(() => {
          advantagesTab.removeClass('active')
          advantagesTab.eq(i).addClass('active')
        })
        if (i === 0) {
          tlSlider.from(slide, {
            xPercent: 0,
            duration: 0,
          })
        } else {
          tlSlider.from(slide, {
            xPercent: -50,
            opacity: 0,
          })
        }
        tlSlider.addLabel(`slide-${i}`)
        // tlSlider.addPause()
        if (i >= advantagesSlides.length - 1) return;
        tlSlider.to(slide, {
            xPercent: 50,
            opacity: 0,
            display: 'none',
          })
          .call(() => {
            advantagesTab.removeClass('active')
            advantagesTab.eq(i).addClass('active')
          })
      })

      const sliderST = ScrollTrigger.create({
        animation: tlSlider,
        trigger: advantages,
        start: 'top top',
        end: () => "+=" + ($(".ms_advantages__list")[0].offsetWidth),
        scrub: true,
        pin: true,
        snap: {
          snapTo: 'labels',
          duration: 0.3,
          delay: 0.1,
          // ease: "power1.inOut"
        }
      })

      gsap.utils.toArray(advantagesTab).forEach(function (el) {
        el.addEventListener("click", function (e) {
          if ($(this).hasClass('active')) return;
          const idx = $(e.target).index()
          const percent = tlSlider.labels[`slide-${idx}`] / tlSlider.totalDuration();
          const scrollPos = sliderST.start + (sliderST.end - sliderST.start) * percent;
          gsap.to(window, {
            duration: 1,
            scrollTo: scrollPos
          });
        });
      });
    }
    advantagesStage.one('click', activateTimeline)
  }

});