/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "burgerMenu": () => (/* binding */ burgerMenu),
/* harmony export */   "isWebp": () => (/* binding */ isWebp),
/* harmony export */   "phoneMask": () => (/* binding */ phoneMask),
/* harmony export */   "popups": () => (/* binding */ popups)
/* harmony export */ });
/*---------------------------------------------------------------------------
Проверка WebP
---------------------------------------------------------------------------*/
function isWebp() {
   function testWebP(callback) {
      const webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height === 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {
      document.body.classList.add(support ? "webp" : "no-webp");
   });
}


/*---------------------------------------------------------------------------
Маска телефона
---------------------------------------------------------------------------*/
function phoneMask() {
   document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("input.tel-mask").forEach((input) => {
         let keyCode;
         function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ __ __",
               i = 0,
               val = this.value.replace(/\D/g, ""),
               new_value = matrix.replace(/[_\d]/g, (a) =>
                  i < val.length ? val.charAt(i++) : a
               );
            i = new_value.indexOf("_");
            if (i !== -1) {
               i < 5 && (i = 3);
               new_value = new_value.slice(0, i);
            }
            let reg = matrix
               .substr(0, this.value.length)
               .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
               .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
               this.value = new_value;
            }
            if (event.type === "blur" && this.value.length < 5) this.value = "";
         }

         input.addEventListener("input", mask);
         input.addEventListener("focus", mask);
         input.addEventListener("blur", mask);
         input.addEventListener("keydown", mask);
      });
   });
}


/*---------------------------------------------------------------------------
Бургер меню
---------------------------------------------------------------------------*/
function burgerMenu() {
   document.addEventListener("DOMContentLoaded", () => {
      const menuIcon = document.querySelector(".menu__icon");
      const menuBody = document.querySelector(".menu__body");
      const body = document.body;
      const menuBodyClose = document.querySelector(".menu__body-close");
      const animationDuration = 500;

      if (!menuIcon || !menuBody) return;

      const closeMenu = () => {
         menuIcon.classList.remove("active");
         menuBody.classList.remove("active");
         body.classList.remove("no-scroll");
      };

      menuIcon.addEventListener("click", () => {
         menuIcon.classList.toggle("active");
         menuBody.classList.toggle("active");
         body.classList.toggle("no-scroll");
      });

      menuBody.addEventListener("click", (e) => {
         const link = e.target.closest("a");
         if (link) {
            e.preventDefault();
            closeMenu();
            setTimeout(() => {
               window.location.href = link.href;
            }, animationDuration);
         }
      });

      if (menuBodyClose) menuBodyClose.addEventListener("click", closeMenu);

      document.addEventListener("click", (e) => {
         if (!menuBody.contains(e.target) && !menuIcon.contains(e.target)) closeMenu();
      });
   });
}



/*---------------------------------------------------------------------------
Попапы
---------------------------------------------------------------------------*/
function popups() {
   if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPopups);
   } else {
      initPopups();
   }
}

function initPopups() {
   const POPUP_SELECTOR = ".popup";
   const OPEN_BTN_SELECTOR = ".open-popup";
   const ACTIVE_CLASS = "show";
   const BODY_ACTIVE_CLASS = "popup-opened";

   let activeButton = null;

   // =========================
   // OPEN / SWITCH POPUPS
   // =========================
   document.addEventListener("click", (e) => {
      const button = e.target.closest(OPEN_BTN_SELECTOR);
      if (!button) return;

      e.preventDefault();
      e.stopPropagation();

      const popupId = button.dataset.popup;
      if (!popupId) return;

      const popup = document.getElementById(popupId);
      if (!popup) return;

      const currentPopup = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );

      if (activeButton === button && currentPopup) {
         closePopup(currentPopup);
         return;
      }

      if (currentPopup) {
         closePopup(currentPopup);
      }

      openPopup(popup, button);
   });

   // =========================
   // CLOSE POPUPS (overlay / close btn / outside)
   // =========================
   document.addEventListener("click", (e) => {
      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      const isCloseBtn = e.target.closest(".popup__close");
      const isInsideBody = e.target.closest(".popup__body");

      if (isCloseBtn || !isInsideBody) {
         closePopup(openPopupEl);
      }
   });

   // =========================
   // ESC KEY
   // =========================
   document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      closePopup(openPopupEl);
   });

   // =========================
   // HELPERS
   // =========================
   function openPopup(popup, button) {
      popup.classList.add(ACTIVE_CLASS);
      document.body.classList.add(BODY_ACTIVE_CLASS);

      if (button) {
         button.classList.add("active");
         activeButton = button;
      }
   }

   function closePopup(popup) {
      popup.classList.remove(ACTIVE_CLASS);
      document.body.classList.remove(BODY_ACTIVE_CLASS);

      if (activeButton) {
         activeButton.classList.remove("active");
         activeButton = null;
      }
   }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenu();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.popups();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.phoneMask();

/*==========================================================================
Observer Animation
============================================================================*/
/* if (document.readyState === "complete") {
   init();
} else {
   window.addEventListener("load", init);
}

function init() {
   function onEntry(entry) {
      entry.forEach(change => {
         if (change.isIntersecting) {
            change.target.classList.add('element-show');
         }
      });
   }

   let options = { threshold: [0.4] };
   let observer = new IntersectionObserver(onEntry, options);
   let elements = document.querySelectorAll('.element-animation');
   for (let elm of elements) {
      observer.observe(elm);
   }
} */

/*==========================================================================
Fix header
============================================================================*/
const header = document.querySelector('header');

const fxPoint = window.innerHeight * 0.7;
const showPoint = window.innerHeight;

window.addEventListener('scroll', () => {
   const scroll = window.scrollY;

   if (scroll >= fxPoint) {
      header.classList.add('-fx');
   } else {
      header.classList.remove('-fx', 'show');
   }

   if (scroll >= showPoint) {
      header.classList.add('show');
   } else {
      header.classList.remove('show');
   }
});

/*==========================================================================
Hero slider
============================================================================*/
function heroSlider() {
   const sliderEl = document.querySelector('.hero__slider');
   if (!sliderEl) return;

   if (sliderEl.swiper) return;

   new Swiper(sliderEl, {
      slidesPerView: 1,
      loop: true,
      speed: 800,
      spaceBetween: 20,
      effect: 'fade',
      parallax: true,
      pagination: {
         el: '.hero__pagination',
      },
      autoplay: {
         delay: 5000,
         disableOnInteraction: true,
      }
   });
}


/*==========================================================================
Hotspots
============================================================================*/
function initHotspots() {
   const hotspots = document.querySelectorAll('.hotspot');
   if (!hotspots.length) return;

   const mobileBreakpoint = 767;

   function setDefaultState() {
      const isMobile = window.innerWidth <= mobileBreakpoint;

      hotspots.forEach(hotspot => {
         const card = hotspot.querySelector('.hotspot__card');
         if (!card) return;

         card.classList.toggle('show', !isMobile);
      });
   }

   hotspots.forEach(hotspot => {
      const dot = hotspot.querySelector('.hotspot__dot');
      const card = hotspot.querySelector('.hotspot__card');
      if (!dot || !card) return;

      dot.addEventListener('click', () => {
         card.classList.toggle('show');
      });
   });

   setDefaultState();
}


/*==========================================================================
Carousel sliders
============================================================================*/
/*==========================================================================
Products slider
============================================================================*/
function initProductsCarousel() {
   const sliders = document.querySelectorAll('.carousel');

   if (!sliders.length) return;

   sliders.forEach((carousel) => {
      const sliderEl = carousel.querySelector('.carousel__slider');
      const prevEl = carousel.querySelector('.carousel__prev');
      const nextEl = carousel.querySelector('.carousel__next');

      if (!sliderEl) return;

      new Swiper(sliderEl, {
         slidesPerView: 4,
         loop: false,
         speed: 1000,
         navigation: {
            prevEl,
            nextEl,
         },
         breakpoints: {
            320: {
               slidesPerView: 1.05,
               spaceBetween: 20,
            },
            600: {
               slidesPerView: 2,
               spaceBetween: 15,
            },
            900: {
               slidesPerView: 3,
               spaceBetween: 15,
            },
            1200: {
               slidesPerView: 4,
               spaceBetween: 26,
            }
         }
      });
   });
}


/*==========================================================================
faq
============================================================================*/
function initFaqAccordion() {
   const faqItems = document.querySelectorAll('.faq__item');
   if (!faqItems.length) return;

   faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');

      if (!question || !answer || item.dataset.inited) return;

      question.addEventListener('click', () => {
         const isActive = item.classList.contains('active');

         faqItems.forEach(el => {
            const elAnswer = el.querySelector('.faq__answer');
            if (!elAnswer) return;

            el.classList.remove('active');
            elAnswer.style.maxHeight = null;
         });

         if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
         }
      });

      item.dataset.inited = 'true';
   });
}


/*==========================================================================
Dropdowns
============================================================================*/
function initDropdowns() {
   const dropdowns = document.querySelectorAll('.dropdown');

   dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.dropdown__button');
      const buttonText = dropdown.querySelector('.dropdown__button-text');
      const list = dropdown.querySelector('.dropdown__list');
      const items = dropdown.querySelectorAll('.dropdown__item');
      const closeBtn = dropdown.querySelector('.dropdown__list-close');

      button.addEventListener('click', (e) => {
         e.stopPropagation();

         const isOpen = button.classList.contains('active');

         closeAllDropdowns();

         if (!isOpen) {
            openDropdown(button, list);
         }
      });

      items.forEach(item => {
         item.addEventListener('click', () => {
            const text = item.querySelector('span').textContent;

            buttonText.textContent = text;
            dropdown.classList.add('dropdown--selected');

            closeAllDropdowns();
         });
      });

      if (closeBtn) {
         closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns();
         });
      }
   });

   function openDropdown(button, list) {
      button.classList.add('active');
      list.classList.add('show');
      document.body.classList.add('no-scroll');
   }

   function closeAllDropdowns() {
      document.querySelectorAll('.dropdown__button.active')
         .forEach(btn => btn.classList.remove('active'));

      document.querySelectorAll('.dropdown__list.show')
         .forEach(list => list.classList.remove('show'));

      document.body.classList.remove('no-scroll');
   }

   document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
         closeAllDropdowns();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
         closeAllDropdowns();
      }
   });
}

/*==========================================================================
Form groups
============================================================================*/
function requestFormGroups() {
   const forms = document.querySelectorAll('.request__form-col');

   forms.forEach(form => {
      const items = form.querySelectorAll('.dropdown__item');
      const additionals = form.querySelectorAll('.request__form-additional');

      items.forEach(item => {
         item.addEventListener('click', () => {
            const group = item.dataset.formGroup;

            additionals.forEach(el => el.classList.remove('active'));

            const target = form.querySelector(`.request__form-additional[data-form-group="${group}"]`);
            if (target) {
               target.classList.add('active');
            }
         });
      });
   });
}


/*==========================================================================
Form validate
============================================================================*/
function validateArea(area) {

   const additional = area.closest('.request__form-additional');

   const skipRequired = additional && !additional.classList.contains('active');

   let valid = true;

   const input = area.querySelector('input:not([type="checkbox"])');
   const textarea = area.querySelector('textarea');
   const checkbox = area.querySelector('input[type="checkbox"]');
   const dropdown = area.querySelector('.dropdown');

   const field = input || textarea;
   if (field) {
      area.classList.toggle('has-value', field.value.trim().length > 0);
   }

   // ---- required валидация ----
   if (!skipRequired) {
      if (input && !input.value.trim()) valid = false;
      if (textarea && !textarea.value.trim()) valid = false;
      if (checkbox && !checkbox.checked) valid = false;
      if (dropdown && !dropdown.classList.contains('dropdown--selected')) valid = false;

      area.classList.toggle('no-valid', !valid);
   } else {
      area.classList.remove('no-valid');
   }

   return valid;
}

function validateRequestForm(form) {
   let isValid = true;

   const areas = form.querySelectorAll('.request__form-area, .agree');

   areas.forEach(area => {
      if (!validateArea(area)) {
         isValid = false;
      }
   });

   return isValid;
}

/* --- submit --- */
const form = document.querySelector('.request__form');
form.addEventListener('submit', e => {
   if (!validateRequestForm(form)) e.preventDefault();
});

/* --- live проверка --- */
document.addEventListener('input', e => {
   if (e.target.matches('.request__form input, .request__form textarea')) {
      const area = e.target.closest('.request__form-area');
      if (area) validateArea(area);
   }
});

document.addEventListener('change', e => {
   if (e.target.matches('.request__form input[type="checkbox"]')) {
      const area = e.target.closest('.request__form-area, .agree');
      if (area) validateArea(area);
   }
});


/*==========================================================================
Go top
============================================================================*/
const goTopBtn = document.querySelector('.footer__go-top-btn');

function scrollToTop(duration = 400) {
   const start = window.scrollY;
   const startTime = performance.now();

   function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
   }

   function scroll() {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, start * (1 - easedProgress));

      if (progress < 1) {
         requestAnimationFrame(scroll);
      }
   }

   requestAnimationFrame(scroll);
}

goTopBtn.addEventListener('click', () => {
   scrollToTop(400);
});


/*==========================================================================
FIlters groups
============================================================================*/
function initFiltersAccordion() {
   const groups = document.querySelectorAll('.filters__group');

   groups.forEach(group => {
      const title = group.querySelector('.filters__title');
      const items = group.querySelector('.filters__items');

      title.addEventListener('click', () => {

         if (group.classList.contains('opened')) {
            // закрытие
            items.style.maxHeight = items.scrollHeight + 'px';
            requestAnimationFrame(() => {
               items.style.maxHeight = '0px';
            });
            group.classList.remove('opened');
         } else {
            // открытие
            group.classList.add('opened');
            items.style.maxHeight = items.scrollHeight + 'px';
         }

      });
   });
}

/*==========================================================================
Toggle filter
============================================================================*/
function initCategoryAside() {
   const filterToggle = document.querySelector('.filter-toggle');
   const categoryAside = document.querySelector('.category__aside');
   const body = document.body;
   const filtersClose = document.querySelector('.filters__close');

   if (!filterToggle || !categoryAside) return;

   filterToggle.addEventListener('click', () => {
      categoryAside.classList.add('active');
      body.classList.add('bg');
   });

   if (filtersClose) {
      filtersClose.addEventListener('click', () => {
         categoryAside.classList.remove('active');
         body.classList.remove('bg');
      });
   }
}


/*==========================================================================
Product sliders
============================================================================*/
function initProductGallerySlider() {
   const productGallerySliderThumbs = document.querySelector('.product__gallery-slider-thumbs');
   const productGallerySliderBig = document.querySelector('.product__gallery-slider-big');

   if (!productGallerySliderThumbs || !productGallerySliderBig) return;

   const productSwiperThumbs = new Swiper(productGallerySliderThumbs, {
      spaceBetween: 10,
      speed: 600,
      slidesPerView: 5
   });

   const productSwiperBig = new Swiper(productGallerySliderBig, {
      spaceBetween: 0,
      slidesPerView: 1,
      speed: 600,
      thumbs: {
         swiper: productSwiperThumbs,
      }
   });
}

/*==========================================================================
Gallery
============================================================================*/
const lightbox = GLightbox({
   selector: '.glightbox'
});


/*==========================================================================
Videos
============================================================================*/
function initVideoPlayers() {
   const players = document.querySelectorAll('.video-player');
   if (!players.length) return;

   players.forEach(player => {
      const video = player.querySelector('video');
      const button = player.querySelector('.video-player__button');

      if (!video || !button) return;

      button.addEventListener('click', () => {
         player.classList.add('is-playing');
         video.setAttribute('controls', '');
         video.play();
      });
   });
}


/*==========================================================================
Init
============================================================================*/
document.addEventListener("DOMContentLoaded", () => {
   heroSlider();
   initHotspots();
   initProductsCarousel();
   initFaqAccordion();
   initDropdowns();
   requestFormGroups();
   initFiltersAccordion();
   initCategoryAside();
   initProductGallerySlider();
   initVideoPlayers()
})
})();

/******/ })()
;