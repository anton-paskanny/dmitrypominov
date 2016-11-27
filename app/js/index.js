$('.owl-carousel').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    nav: true,
    autoWidth: true,
    autoplay: true,
    margin: 30,
    responsive: {
        600: {
            items: 4
        }
    }
});

$(document).ready(function() {
    var arrowL = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewbox="0 0 370.814 370.814"><path d="M77.896 345.967l24.14 24.85 190.885-185.4L102.037 0l-24.14 24.854 165.282 160.562" fill="#00cc66"/></svg>',
        arrowR = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewbox="0 0 370.814 370.814"><path d="M292.92 24.848L268.78 0 77.896 185.4 268.78 370.815l24.14-24.853L127.638 185.4" fill="#00cc66"/></svg>',
        imgArr = [],
        imgArrSort = [],
        imgArrNew = [],
        galleryModal = $('.md-modal.single-image'),
        gallery = $('.gallery'),
        imgIndex = 0,
        currentImageSrc = '',
        hamburger = $('.hamburger'),
        contactsLink = $('.additional-links__contacts'),
        aboutLink = $('.additional-links__about'),
        closeModalLinks = $('.md-close'),
        modalBoxes = $('.md-modal'),
        mobileMenu = $('.md-modal.mobile-menu'),
        body = $('body'),
        aboutMobileLink = $('.about-link'),
        contactsMobileLink = $('.contacts-link'),
        licenseLink = $('.main-footer__license');
        modalAbout = $('.md-modal.about'),
        modalContacts = $('.md-modal.contacts'),
        modalLicense = $('.md-modal.license');
        modalOverlay = $('.md-overlay'),
        galleryFullPreview = $('.md-gallery__full');

    function nextImage() {
      if (imgIndex === (imgArrNew.length - 1)) {
          imgIndex = 0;
          galleryFullPreview.find('img').css('display', 'none').attr('src', imgArrNew[imgIndex].src).fadeIn(300);
      } else {
          galleryFullPreview.find('img').css('display', 'none').attr('src', imgArrNew[imgIndex + 1].src).fadeIn(300);
          imgIndex++;
      }
    };

    function prevImage() {
      if (imgIndex === 0) {
          imgIndex = (imgArrNew.length - 1);
          galleryFullPreview.find('img').css('display', 'none').attr('src', imgArrNew[imgIndex].src).fadeIn(300);
      } else {
          galleryFullPreview.find('img').css('display', 'none').attr('src', imgArrNew[imgIndex - 1].src).fadeIn(300);
          imgIndex--;
      }
    };

    $('.owl-prev').empty().html(arrowR);
    $('.owl-next').empty().html(arrowL);

    $(window).on('load', function() {
      body.addClass('loaded');
      $('#loader').css('display', 'none');
      if ($(window).width() <= '770') {
        $('.md-modal__inner-wrapper').find('p').text('Задать интересующие вопросы и уточнить условия работы можно, заполнив форму ниже.');
      }
    });

    gallery.find('img').each(function() {
        imgArr.push($(this).attr('src').replace('-thmb', '').replace('/thumb', ''));
    });

    imgArrSort = $.unique(imgArr.sort()).sort();

    $.each(imgArrSort, function(index, value) {
      var image = new Image();
      image.src = value;
      imgArrNew.push(image);
    })

    $('.owl-item').find('img').click(function(e) {
        var src = e.target.src.replace('-thmb', '').replace('/thumb', '');
        galleryModal.addClass('md-show').find('.md-gallery__full').html('<img src=' + src + '>');
        hamburger.css('z-index', '1');
        currentImageSrc = galleryModal.find('img').attr('src');
        for (var i = 0, max = imgArrNew.length; i < max; i++) {
            if (currentImageSrc === imgArrNew[i].src) {
                imgIndex = i;
            }
        }
    });


    galleryModal.find('.md-controls__next').click(function(e) {
      nextImage();
    });

    galleryModal.find('.md-controls__prev').click(function(e) {
      prevImage();
    });

    hamburger.click(function() {
        if (!$(this).hasClass('is-active')) {
            $(this).addClass('is-active');
            mobileMenu.addClass('md-show');
            mobileMenu.find('.mobile-menu__nav').fadeIn(1800);
            body.css('overflow-y', 'hidden');
        } else {
            $(this).removeClass('is-active');
            setTimeout(function() {
                mobileMenu.find('.mobile-menu__nav').fadeOut();
            }, 200);
            setTimeout(function() {
                mobileMenu.removeClass('md-show');
            }, 500);
            body.css('overflow-y', 'visible');
        }
    });

    galleryModal.find('.md-gallery__close').click(function() {
        galleryModal.removeClass('md-show');
        setTimeout(function() {
            hamburger.css('z-index', '9999');
        }, 300);
    });

    closeModalLinks.each(function(item, value) {
      $(this).click(function() {
        modalBoxes.each(function(item, value) {
          if ( ($(this).hasClass('about') && $(window).width() <= '770')
                || ($(this).hasClass('contacts') && $(window).width() <= '770')
                || $(this).hasClass('license')
             ) {
            $(this).css('overflow-y', 'hidden');
            body.css('overflow-y', 'visible');
          };
          $(this).removeClass('md-show');
          setTimeout(function() {
              hamburger.css('z-index', '9999');
          }, 300);
        });
      });
    });

    contactsLink.click(function(e) {
        e.preventDefault();
        modalContacts.addClass('md-show');
        if ($(window).width() <= '770') {
          modalContacts.css('overflow-y', 'auto');
          body.css('overflow-y', 'hidden');
        }
        hamburger.css('z-index', '1');
    });

    aboutLink.click(function(e) {
        e.preventDefault();
        modalAbout.addClass('md-show');
        if ($(window).width() <= '770') {
          modalAbout.css('overflow-y', 'auto');
          body.css('overflow-y', 'hidden');
        }
        hamburger.css('z-index', '1');
    });

    licenseLink.click(function(e) {
      e.preventDefault();
      modalLicense.addClass('md-show');
      body.css('overflow-y', 'hidden');
      if (modalLicense.css('overflow-y', 'hidden')) {
        modalLicense.css('overflow-y', 'auto')
      }
      hamburger.css('z-index', '1');
    })

    modalOverlay.click(function(e) {
       if ( ($(event.target).closest('.about').get(0) == null) && modalAbout.hasClass('md-show') ) {
          modalAbout.removeClass('md-show');
       } else if ( ($(event.target).closest('.contacts').get(0) == null) && modalContacts.hasClass('md-show')) {
         modalContacts.removeClass('md-show');
       }
    })

    galleryFullPreview.click(function(e) {
      if ( ($(event.target).closest('.md-gallery__full img').get(0) == null) ) {
        galleryModal.removeClass('md-show');
      }
    });

    modalLicense.click(function(e) {
      if ( ($(event.target).closest('.md-modal.license container').get(0) == null) ) {
        modalLicense.css('overflow-y', 'hidden').removeClass('md-show');
        body.css('overflow-y', 'visible');
      }
    });

    $(document).on('keyup', function(e) {
        switch (e.which) {
            case 27:
                $('.md-modal').each(function(i, value) {
                    if ($(this).hasClass('md-show') && (!$(this).hasClass('mobile-menu'))) {
                        $(this).removeClass('md-show');
                        if ($(this).hasClass('about')) {
                          $(this).css('overflow-y', 'hidden')
                        }
                        else if ($(this).hasClass('contacts')) {
                          $(this).css('overflow-y', 'hidden');
                        }
                        else if ($(this).hasClass('license')) {
                          $(this).css('overflow-y', 'hidden');
                          body.css('overflow-y', 'visible');
                        };
                        hamburger.css('z-index', '9999');
                    };
                    if ($(this).hasClass('md-show') && ($(this).hasClass('mobile-menu'))) {
                        $(this).removeClass('md-show');
                        hamburger.removeClass('is-active').css('z-index', '1');
                        body.css('overflow-y', 'visible');
                    }
                });
                break;
            case 37:
                nextImage();
                break;
            case 39:
                prevImage();
                break;
            case 65:
                prevImage();
                break;
            case 68:
                nextImage();
                break;
        }; //end switch
    });
});
