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
      // если клик по кнопке открытия — ничего не делаем
      if (e.target.closest(OPEN_BTN_SELECTOR)) return;

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


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Squircle": () => (/* reexport safe */ _corner_smoothing_react__WEBPACK_IMPORTED_MODULE_1__.Squircle),
/* harmony export */   "renderSquircle": () => (/* reexport safe */ _corner_smoothing_vanilla__WEBPACK_IMPORTED_MODULE_0__.renderSquircle),
/* harmony export */   "squircle": () => (/* reexport safe */ _corner_smoothing_react__WEBPACK_IMPORTED_MODULE_1__.squircle),
/* harmony export */   "squircleObserver": () => (/* reexport safe */ _corner_smoothing_vanilla__WEBPACK_IMPORTED_MODULE_0__.squircleObserver)
/* harmony export */ });
/* harmony import */ var _corner_smoothing_vanilla__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _corner_smoothing_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


//# sourceMappingURL=index.js.map

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderSquircle": () => (/* binding */ renderSquircle),
/* harmony export */   "squircleObserver": () => (/* binding */ squircleObserver)
/* harmony export */ });
/* harmony import */ var figma_squircle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

const createClassName = (length = 8) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `squircle-${result}`;
};
const setCss = (css, styleId) => {
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
};
const renderSquircle = (el, opts, className) => {
    const width = el.clientWidth;
    const height = el.clientHeight;
    const augmentedOpts = {
        preserveSmoothing: true,
        cornerSmoothing: 1,
        width,
        height,
        ...opts,
    };
    if (!opts.borderWidth) {
        el.style.clipPath = `path('${(0,figma_squircle__WEBPACK_IMPORTED_MODULE_0__.getSvgPath)(augmentedOpts)}')`;
    }
    else {
        el.classList.add(className);
        setCss(`
        .${className} {
          position: relative;
          clip-path: path('${(0,figma_squircle__WEBPACK_IMPORTED_MODULE_0__.getSvgPath)(augmentedOpts)}');
        }

        .${className}::before {
          content: '';
          display: block;
          position: absolute;
          inset: ${opts.borderWidth}px;  
          z-index: -1;
          clip-path: path('${(0,figma_squircle__WEBPACK_IMPORTED_MODULE_0__.getSvgPath)({
            ...augmentedOpts,
            width: width - opts.borderWidth * 2,
            height: height - opts.borderWidth * 2,
            cornerRadius: opts.cornerRadius - opts.borderWidth,
        })}');
        }
      `, `style-${className}`);
    }
};
const squircleObserver = (el, opts) => {
    const className = createClassName();
    // Initialize as `undefined` to always run directly when instantiating.
    let dimensions = undefined;
    const func = (newOpts) => {
        if (newOpts !== undefined) {
            opts = newOpts;
        }
        return renderSquircle(el, opts, className);
    };
    const resizeObserver = new ResizeObserver(() => {
        const prevDimemsions = dimensions;
        dimensions = [el.clientWidth, el.clientHeight];
        // Run only if dimensions changed, for performance.
        if (prevDimemsions?.[0] !== dimensions[0] ||
            prevDimemsions?.[1] !== dimensions[1]) {
            func();
        }
    });
    // It calls the callback directly.
    resizeObserver.observe(el);
    // The native code `resizeObserver.disconnect` needs the correct context.
    // Retain the context by wrapping in arrow function. Read more about this:
    // https://stackoverflow.com/a/9678166/19306180
    func.disconnect = () => {
        el.classList.remove(className);
        document.querySelector(`#style-${className}`)?.remove();
        resizeObserver.disconnect();
    };
    return func;
};
//# sourceMappingURL=corner-smoothing-vanilla.js.map

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSvgPath": () => (/* binding */ $6424334e4a2a8c1c$export$4d0751d7849c93f6)
/* harmony export */ });
function $8164c72eb32cbbfc$export$3d870b97f7a56ca3({ topLeftCornerRadius: topLeftCornerRadius , topRightCornerRadius: topRightCornerRadius , bottomRightCornerRadius: bottomRightCornerRadius , bottomLeftCornerRadius: bottomLeftCornerRadius , width: width , height: height  }) {
    const roundingAndSmoothingBudgetMap = {
        topLeft: -1,
        topRight: -1,
        bottomLeft: -1,
        bottomRight: -1
    };
    const cornerRadiusMap = {
        topLeft: topLeftCornerRadius,
        topRight: topRightCornerRadius,
        bottomLeft: bottomLeftCornerRadius,
        bottomRight: bottomRightCornerRadius
    };
    Object.entries(cornerRadiusMap)// Let the bigger corners choose first
    .sort(([, radius1], [, radius2])=>{
        return radius2 - radius1;
    }).forEach(([cornerName, radius])=>{
        const corner = cornerName;
        const adjacents = $8164c72eb32cbbfc$var$adjacentsByCorner[corner];
        // Look at the 2 adjacent sides, figure out how much space we can have on both sides,
        // then take the smaller one
        const budget = Math.min(...adjacents.map((adjacent)=>{
            const adjacentCornerRadius = cornerRadiusMap[adjacent.corner];
            if (radius === 0 && adjacentCornerRadius === 0) return 0;
            const adjacentCornerBudget = roundingAndSmoothingBudgetMap[adjacent.corner];
            const sideLength = adjacent.side === "top" || adjacent.side === "bottom" ? width : height;
            // If the adjacent corner's already been given the rounding and smoothing budget,
            // we'll just take the rest
            if (adjacentCornerBudget >= 0) return sideLength - roundingAndSmoothingBudgetMap[adjacent.corner];
            else return radius / (radius + adjacentCornerRadius) * sideLength;
        }));
        roundingAndSmoothingBudgetMap[corner] = budget;
        cornerRadiusMap[corner] = Math.min(radius, budget);
    });
    return {
        topLeft: {
            radius: cornerRadiusMap.topLeft,
            roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.topLeft
        },
        topRight: {
            radius: cornerRadiusMap.topRight,
            roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.topRight
        },
        bottomLeft: {
            radius: cornerRadiusMap.bottomLeft,
            roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.bottomLeft
        },
        bottomRight: {
            radius: cornerRadiusMap.bottomRight,
            roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.bottomRight
        }
    };
}
const $8164c72eb32cbbfc$var$adjacentsByCorner = {
    topLeft: [
        {
            corner: "topRight",
            side: "top"
        },
        {
            corner: "bottomLeft",
            side: "left"
        }, 
    ],
    topRight: [
        {
            corner: "topLeft",
            side: "top"
        },
        {
            corner: "bottomRight",
            side: "right"
        }, 
    ],
    bottomLeft: [
        {
            corner: "bottomRight",
            side: "bottom"
        },
        {
            corner: "topLeft",
            side: "left"
        }, 
    ],
    bottomRight: [
        {
            corner: "bottomLeft",
            side: "bottom"
        },
        {
            corner: "topRight",
            side: "right"
        }, 
    ]
};


function $be0670f6a5a657f9$export$a2f9a538d41e7bd0({ cornerRadius: cornerRadius , cornerSmoothing: cornerSmoothing , preserveSmoothing: preserveSmoothing , roundingAndSmoothingBudget: roundingAndSmoothingBudget  }) {
    // From figure 12.2 in the article
    // p = (1 + cornerSmoothing) * q
    // in this case q = R because theta = 90deg
    let p = (1 + cornerSmoothing) * cornerRadius;
    // When there's not enough space left (p > roundingAndSmoothingBudget), there are 2 options:
    //
    // 1. What figma's currently doing: limit the smoothing value to make sure p <= roundingAndSmoothingBudget
    // But what this means is that at some point when cornerRadius is large enough,
    // increasing the smoothing value wouldn't do anything
    //
    // 2. Keep the original smoothing value and use it to calculate the bezier curve normally,
    // then adjust the control points to achieve similar curvature profile
    //
    // preserveSmoothing is a new option I added
    //
    // If preserveSmoothing is on then we'll just keep using the original smoothing value
    // and adjust the bezier curve later
    if (!preserveSmoothing) {
        const maxCornerSmoothing = roundingAndSmoothingBudget / cornerRadius - 1;
        cornerSmoothing = Math.min(cornerSmoothing, maxCornerSmoothing);
        p = Math.min(p, roundingAndSmoothingBudget);
    }
    // In a normal rounded rectangle (cornerSmoothing = 0), this is 90
    // The larger the smoothing, the smaller the arc
    const arcMeasure = 90 * (1 - cornerSmoothing);
    const arcSectionLength = Math.sin($be0670f6a5a657f9$var$toRadians(arcMeasure / 2)) * cornerRadius * Math.sqrt(2);
    // In the article this is the distance between 2 control points: P3 and P4
    const angleAlpha = (90 - arcMeasure) / 2;
    const p3ToP4Distance = cornerRadius * Math.tan($be0670f6a5a657f9$var$toRadians(angleAlpha / 2));
    // a, b, c and d are from figure 11.1 in the article
    const angleBeta = 45 * cornerSmoothing;
    const c = p3ToP4Distance * Math.cos($be0670f6a5a657f9$var$toRadians(angleBeta));
    const d = c * Math.tan($be0670f6a5a657f9$var$toRadians(angleBeta));
    let b = (p - arcSectionLength - c - d) / 3;
    let a = 2 * b;
    // Adjust the P1 and P2 control points if there's not enough space left
    if (preserveSmoothing && p > roundingAndSmoothingBudget) {
        const p1ToP3MaxDistance = roundingAndSmoothingBudget - d - arcSectionLength - c;
        // Try to maintain some distance between P1 and P2 so the curve wouldn't look weird
        const minA = p1ToP3MaxDistance / 6;
        const maxB = p1ToP3MaxDistance - minA;
        b = Math.min(b, maxB);
        a = p1ToP3MaxDistance - b;
        p = Math.min(p, roundingAndSmoothingBudget);
    }
    return {
        a: a,
        b: b,
        c: c,
        d: d,
        p: p,
        arcSectionLength: arcSectionLength,
        cornerRadius: cornerRadius
    };
}
function $be0670f6a5a657f9$export$a4b62df84ac6ef86({ width: width , height: height , topLeftPathParams: topLeftPathParams , topRightPathParams: topRightPathParams , bottomLeftPathParams: bottomLeftPathParams , bottomRightPathParams: bottomRightPathParams  }) {
    return `
    M ${width - topRightPathParams.p} 0
    ${$be0670f6a5a657f9$var$drawTopRightPath(topRightPathParams)}
    L ${width} ${height - bottomRightPathParams.p}
    ${$be0670f6a5a657f9$var$drawBottomRightPath(bottomRightPathParams)}
    L ${bottomLeftPathParams.p} ${height}
    ${$be0670f6a5a657f9$var$drawBottomLeftPath(bottomLeftPathParams)}
    L 0 ${topLeftPathParams.p}
    ${$be0670f6a5a657f9$var$drawTopLeftPath(topLeftPathParams)}
    Z
  `.replace(/[\t\s\n]+/g, " ").trim();
}
function $be0670f6a5a657f9$var$drawTopRightPath({ cornerRadius: cornerRadius , a: a , b: b , c: c , d: d , p: p , arcSectionLength: arcSectionLength  }) {
    if (cornerRadius) return $be0670f6a5a657f9$var$rounded`
    c ${a} 0 ${a + b} 0 ${a + b + c} ${d}
    a ${cornerRadius} ${cornerRadius} 0 0 1 ${arcSectionLength} ${arcSectionLength}
    c ${d} ${c}
        ${d} ${b + c}
        ${d} ${a + b + c}`;
    else return $be0670f6a5a657f9$var$rounded`l ${p} 0`;
}
function $be0670f6a5a657f9$var$drawBottomRightPath({ cornerRadius: cornerRadius , a: a , b: b , c: c , d: d , p: p , arcSectionLength: arcSectionLength  }) {
    if (cornerRadius) return $be0670f6a5a657f9$var$rounded`
    c 0 ${a}
      0 ${a + b}
      ${-d} ${a + b + c}
    a ${cornerRadius} ${cornerRadius} 0 0 1 -${arcSectionLength} ${arcSectionLength}
    c ${-c} ${d}
      ${-(b + c)} ${d}
      ${-(a + b + c)} ${d}`;
    else return $be0670f6a5a657f9$var$rounded`l 0 ${p}`;
}
function $be0670f6a5a657f9$var$drawBottomLeftPath({ cornerRadius: cornerRadius , a: a , b: b , c: c , d: d , p: p , arcSectionLength: arcSectionLength  }) {
    if (cornerRadius) return $be0670f6a5a657f9$var$rounded`
    c ${-a} 0
      ${-(a + b)} 0
      ${-(a + b + c)} ${-d}
    a ${cornerRadius} ${cornerRadius} 0 0 1 -${arcSectionLength} -${arcSectionLength}
    c ${-d} ${-c}
      ${-d} ${-(b + c)}
      ${-d} ${-(a + b + c)}`;
    else return $be0670f6a5a657f9$var$rounded`l ${-p} 0`;
}
function $be0670f6a5a657f9$var$drawTopLeftPath({ cornerRadius: cornerRadius , a: a , b: b , c: c , d: d , p: p , arcSectionLength: arcSectionLength  }) {
    if (cornerRadius) return $be0670f6a5a657f9$var$rounded`
    c 0 ${-a}
      0 ${-(a + b)}
      ${d} ${-(a + b + c)}
    a ${cornerRadius} ${cornerRadius} 0 0 1 ${arcSectionLength} -${arcSectionLength}
    c ${c} ${-d}
      ${b + c} ${-d}
      ${a + b + c} ${-d}`;
    else return $be0670f6a5a657f9$var$rounded`l 0 ${-p}`;
}
function $be0670f6a5a657f9$var$toRadians(degrees) {
    return degrees * Math.PI / 180;
}
function $be0670f6a5a657f9$var$rounded(strings, ...values) {
    return strings.reduce((acc, str, i)=>{
        let value = values[i];
        if (typeof value === "number") return acc + str + value.toFixed(4);
        else return acc + str + (value ?? "");
    }, "");
}


function $6424334e4a2a8c1c$export$4d0751d7849c93f6({ cornerRadius: cornerRadius = 0 , topLeftCornerRadius: topLeftCornerRadius , topRightCornerRadius: topRightCornerRadius , bottomRightCornerRadius: bottomRightCornerRadius , bottomLeftCornerRadius: bottomLeftCornerRadius , cornerSmoothing: cornerSmoothing , width: width , height: height , preserveSmoothing: preserveSmoothing = false  }) {
    topLeftCornerRadius = topLeftCornerRadius ?? cornerRadius;
    topRightCornerRadius = topRightCornerRadius ?? cornerRadius;
    bottomLeftCornerRadius = bottomLeftCornerRadius ?? cornerRadius;
    bottomRightCornerRadius = bottomRightCornerRadius ?? cornerRadius;
    if (topLeftCornerRadius === topRightCornerRadius && topRightCornerRadius === bottomRightCornerRadius && bottomRightCornerRadius === bottomLeftCornerRadius && bottomLeftCornerRadius === topLeftCornerRadius) {
        const roundingAndSmoothingBudget = Math.min(width, height) / 2;
        const cornerRadius = Math.min(topLeftCornerRadius, roundingAndSmoothingBudget);
        const pathParams = (0, $be0670f6a5a657f9$export$a2f9a538d41e7bd0)({
            cornerRadius: cornerRadius,
            cornerSmoothing: cornerSmoothing,
            preserveSmoothing: preserveSmoothing,
            roundingAndSmoothingBudget: roundingAndSmoothingBudget
        });
        return (0, $be0670f6a5a657f9$export$a4b62df84ac6ef86)({
            width: width,
            height: height,
            topLeftPathParams: pathParams,
            topRightPathParams: pathParams,
            bottomLeftPathParams: pathParams,
            bottomRightPathParams: pathParams
        });
    }
    const { topLeft: topLeft , topRight: topRight , bottomLeft: bottomLeft , bottomRight: bottomRight  } = (0, $8164c72eb32cbbfc$export$3d870b97f7a56ca3)({
        topLeftCornerRadius: topLeftCornerRadius,
        topRightCornerRadius: topRightCornerRadius,
        bottomRightCornerRadius: bottomRightCornerRadius,
        bottomLeftCornerRadius: bottomLeftCornerRadius,
        width: width,
        height: height
    });
    return (0, $be0670f6a5a657f9$export$a4b62df84ac6ef86)({
        width: width,
        height: height,
        topLeftPathParams: (0, $be0670f6a5a657f9$export$a2f9a538d41e7bd0)({
            cornerSmoothing: cornerSmoothing,
            preserveSmoothing: preserveSmoothing,
            cornerRadius: topLeft.radius,
            roundingAndSmoothingBudget: topLeft.roundingAndSmoothingBudget
        }),
        topRightPathParams: (0, $be0670f6a5a657f9$export$a2f9a538d41e7bd0)({
            cornerSmoothing: cornerSmoothing,
            preserveSmoothing: preserveSmoothing,
            cornerRadius: topRight.radius,
            roundingAndSmoothingBudget: topRight.roundingAndSmoothingBudget
        }),
        bottomRightPathParams: (0, $be0670f6a5a657f9$export$a2f9a538d41e7bd0)({
            cornerSmoothing: cornerSmoothing,
            preserveSmoothing: preserveSmoothing,
            cornerRadius: bottomRight.radius,
            roundingAndSmoothingBudget: bottomRight.roundingAndSmoothingBudget
        }),
        bottomLeftPathParams: (0, $be0670f6a5a657f9$export$a2f9a538d41e7bd0)({
            cornerSmoothing: cornerSmoothing,
            preserveSmoothing: preserveSmoothing,
            cornerRadius: bottomLeft.radius,
            roundingAndSmoothingBudget: bottomLeft.roundingAndSmoothingBudget
        })
    });
}



//# sourceMappingURL=module.js.map


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Squircle": () => (/* binding */ Squircle),
/* harmony export */   "squircle": () => (/* binding */ squircle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _corner_smoothing_vanilla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


const omitUndefined = (obj) => {
    const result = {};
    for (const key in obj) {
        if (obj[key] !== undefined) {
            // @ts-ignore
            result[key] = obj[key];
        }
    }
    return result;
};
const Squircle = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({ children, as: Component = "div", cornerRadius, topLeftCornerRadius, topRightCornerRadius, bottomRightCornerRadius, bottomLeftCornerRadius, cornerSmoothing, preserveSmoothing, borderWidth, ...rest }, forwardedRef) => {
    const funcRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    const refCallback = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((el) => {
        const opts = omitUndefined({
            cornerRadius,
            topLeftCornerRadius,
            topRightCornerRadius,
            bottomRightCornerRadius,
            bottomLeftCornerRadius,
            cornerSmoothing,
            preserveSmoothing,
            borderWidth,
        });
        funcRef.current?.disconnect();
        if (el) {
            funcRef.current = (0,_corner_smoothing_vanilla__WEBPACK_IMPORTED_MODULE_1__.squircleObserver)(el, opts);
        }
        if (typeof forwardedRef === "function") {
            forwardedRef(el);
        }
        else if (forwardedRef) {
            forwardedRef.current = el;
        }
    }, [
        cornerRadius,
        topLeftCornerRadius,
        topRightCornerRadius,
        bottomRightCornerRadius,
        bottomLeftCornerRadius,
        cornerSmoothing,
        preserveSmoothing,
        borderWidth,
    ]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, { ref: refCallback, ...rest }, children));
});
/**
 * HOC that wraps `Component` and injects the squircle style.
 */
const squircle = (Component, opts) => (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, forwardedRef) => {
    const funcRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    const refCallback = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((el) => {
        funcRef.current?.disconnect();
        if (el) {
            funcRef.current = (0,_corner_smoothing_vanilla__WEBPACK_IMPORTED_MODULE_1__.squircleObserver)(el, opts);
        }
        if (typeof forwardedRef === "function") {
            forwardedRef(el);
        }
        else if (forwardedRef) {
            forwardedRef.current = el;
        }
    }, [opts]);
    // @ts-ignore
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, { ref: refCallback, ...props });
});
//# sourceMappingURL=corner-smoothing-react.js.map

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(7);
} else {
  module.exports = __webpack_require__(8);
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {

/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_PORTAL_TYPE = Symbol.for("react.portal"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
  REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
  REACT_CONTEXT_TYPE = Symbol.for("react.context"),
  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
  REACT_MEMO_TYPE = Symbol.for("react.memo"),
  REACT_LAZY_TYPE = Symbol.for("react.lazy"),
  REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var ReactNoopUpdateQueue = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
  assign = Object.assign,
  emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  if (
    "object" !== typeof partialState &&
    "function" !== typeof partialState &&
    null != partialState
  )
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = !0;
var isArrayImpl = Array.isArray;
function noop() {}
var ReactSharedInternals = { H: null, A: null, T: null, S: null },
  hasOwnProperty = Object.prototype.hasOwnProperty;
function ReactElement(type, key, props) {
  var refProp = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: void 0 !== refProp ? refProp : null,
    props: props
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(oldElement.type, newKey, oldElement.props);
}
function isValidElement(object) {
  return (
    "object" === typeof object &&
    null !== object &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
function escape(key) {
  var escaperLookup = { "=": "=0", ":": "=2" };
  return (
    "$" +
    key.replace(/[=:]/g, function (match) {
      return escaperLookup[match];
    })
  );
}
var userProvidedKeyEscapeRegex = /\/+/g;
function getElementKey(element, index) {
  return "object" === typeof element && null !== element && null != element.key
    ? escape("" + element.key)
    : index.toString(36);
}
function resolveThenable(thenable) {
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      switch (
        ("string" === typeof thenable.status
          ? thenable.then(noop, noop)
          : ((thenable.status = "pending"),
            thenable.then(
              function (fulfilledValue) {
                "pending" === thenable.status &&
                  ((thenable.status = "fulfilled"),
                  (thenable.value = fulfilledValue));
              },
              function (error) {
                "pending" === thenable.status &&
                  ((thenable.status = "rejected"), (thenable.reason = error));
              }
            )),
        thenable.status)
      ) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
      }
  }
  throw thenable;
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = !1;
  if (null === children) invokeCallback = !0;
  else
    switch (type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = !0;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = !0;
            break;
          case REACT_LAZY_TYPE:
            return (
              (invokeCallback = children._init),
              mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              )
            );
        }
    }
  if (invokeCallback)
    return (
      (callback = callback(children)),
      (invokeCallback =
        "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar),
      isArrayImpl(callback)
        ? ((escapedPrefix = ""),
          null != invokeCallback &&
            (escapedPrefix =
              invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),
          mapIntoArray(callback, array, escapedPrefix, "", function (c) {
            return c;
          }))
        : null != callback &&
          (isValidElement(callback) &&
            (callback = cloneAndReplaceKey(
              callback,
              escapedPrefix +
                (null == callback.key ||
                (children && children.key === callback.key)
                  ? ""
                  : ("" + callback.key).replace(
                      userProvidedKeyEscapeRegex,
                      "$&/"
                    ) + "/") +
                invokeCallback
            )),
          array.push(callback)),
      1
    );
  invokeCallback = 0;
  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
  if (isArrayImpl(children))
    for (var i = 0; i < children.length; i++)
      (nameSoFar = children[i]),
        (type = nextNamePrefix + getElementKey(nameSoFar, i)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if (((i = getIteratorFn(children)), "function" === typeof i))
    for (
      children = i.call(children), i = 0;
      !(nameSoFar = children.next()).done;

    )
      (nameSoFar = nameSoFar.value),
        (type = nextNamePrefix + getElementKey(nameSoFar, i++)),
        (invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        ));
  else if ("object" === type) {
    if ("function" === typeof children.then)
      return mapIntoArray(
        resolveThenable(children),
        array,
        escapedPrefix,
        nameSoFar,
        callback
      );
    array = String(children);
    throw Error(
      "Objects are not valid as a React child (found: " +
        ("[object Object]" === array
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : array) +
        "). If you meant to render a collection of children, use an array instead."
    );
  }
  return invokeCallback;
}
function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [],
    count = 0;
  mapIntoArray(children, result, "", "", function (child) {
    return func.call(context, child, count++);
  });
  return result;
}
function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    ctor.then(
      function (moduleObject) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 1), (payload._result = moduleObject);
      },
      function (error) {
        if (0 === payload._status || -1 === payload._status)
          (payload._status = 2), (payload._result = error);
      }
    );
    -1 === payload._status && ((payload._status = 0), (payload._result = ctor));
  }
  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}
var reportGlobalError =
    "function" === typeof reportError
      ? reportError
      : function (error) {
          if (
            "object" === typeof window &&
            "function" === typeof window.ErrorEvent
          ) {
            var event = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                "object" === typeof error &&
                null !== error &&
                "string" === typeof error.message
                  ? String(error.message)
                  : String(error),
              error: error
            });
            if (!window.dispatchEvent(event)) return;
          } else if (
            "object" === typeof process &&
            "function" === typeof process.emit
          ) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        },
  Children = {
    map: mapChildren,
    forEach: function (children, forEachFunc, forEachContext) {
      mapChildren(
        children,
        function () {
          forEachFunc.apply(this, arguments);
        },
        forEachContext
      );
    },
    count: function (children) {
      var n = 0;
      mapChildren(children, function () {
        n++;
      });
      return n;
    },
    toArray: function (children) {
      return (
        mapChildren(children, function (child) {
          return child;
        }) || []
      );
    },
    only: function (children) {
      if (!isValidElement(children))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return children;
    }
  };
exports.Activity = REACT_ACTIVITY_TYPE;
exports.Children = Children;
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
  ReactSharedInternals;
exports.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function (size) {
    return ReactSharedInternals.H.useMemoCache(size);
  }
};
exports.cache = function (fn) {
  return function () {
    return fn.apply(null, arguments);
  };
};
exports.cacheSignal = function () {
  return null;
};
exports.cloneElement = function (element, config, children) {
  if (null === element || void 0 === element)
    throw Error(
      "The argument must be a React element, but you passed " + element + "."
    );
  var props = assign({}, element.props),
    key = element.key;
  if (null != config)
    for (propName in (void 0 !== config.key && (key = "" + config.key), config))
      !hasOwnProperty.call(config, propName) ||
        "key" === propName ||
        "__self" === propName ||
        "__source" === propName ||
        ("ref" === propName && void 0 === config.ref) ||
        (props[propName] = config[propName]);
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;
  else if (1 < propName) {
    for (var childArray = Array(propName), i = 0; i < propName; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  return ReactElement(element.type, key, props);
};
exports.createContext = function (defaultValue) {
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = defaultValue;
  defaultValue.Consumer = {
    $$typeof: REACT_CONSUMER_TYPE,
    _context: defaultValue
  };
  return defaultValue;
};
exports.createElement = function (type, config, children) {
  var propName,
    props = {},
    key = null;
  if (null != config)
    for (propName in (void 0 !== config.key && (key = "" + config.key), config))
      hasOwnProperty.call(config, propName) &&
        "key" !== propName &&
        "__self" !== propName &&
        "__source" !== propName &&
        (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;
  else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps)
    for (propName in ((childrenLength = type.defaultProps), childrenLength))
      void 0 === props[propName] &&
        (props[propName] = childrenLength[propName]);
  return ReactElement(type, key, props);
};
exports.createRef = function () {
  return { current: null };
};
exports.forwardRef = function (render) {
  return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };
};
exports.isValidElement = isValidElement;
exports.lazy = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: { _status: -1, _result: ctor },
    _init: lazyInitializer
  };
};
exports.memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
exports.startTransition = function (scope) {
  var prevTransition = ReactSharedInternals.T,
    currentTransition = {};
  ReactSharedInternals.T = currentTransition;
  try {
    var returnValue = scope(),
      onStartTransitionFinish = ReactSharedInternals.S;
    null !== onStartTransitionFinish &&
      onStartTransitionFinish(currentTransition, returnValue);
    "object" === typeof returnValue &&
      null !== returnValue &&
      "function" === typeof returnValue.then &&
      returnValue.then(noop, reportGlobalError);
  } catch (error) {
    reportGlobalError(error);
  } finally {
    null !== prevTransition &&
      null !== currentTransition.types &&
      (prevTransition.types = currentTransition.types),
      (ReactSharedInternals.T = prevTransition);
  }
};
exports.unstable_useCacheRefresh = function () {
  return ReactSharedInternals.H.useCacheRefresh();
};
exports.use = function (usable) {
  return ReactSharedInternals.H.use(usable);
};
exports.useActionState = function (action, initialState, permalink) {
  return ReactSharedInternals.H.useActionState(action, initialState, permalink);
};
exports.useCallback = function (callback, deps) {
  return ReactSharedInternals.H.useCallback(callback, deps);
};
exports.useContext = function (Context) {
  return ReactSharedInternals.H.useContext(Context);
};
exports.useDebugValue = function () {};
exports.useDeferredValue = function (value, initialValue) {
  return ReactSharedInternals.H.useDeferredValue(value, initialValue);
};
exports.useEffect = function (create, deps) {
  return ReactSharedInternals.H.useEffect(create, deps);
};
exports.useEffectEvent = function (callback) {
  return ReactSharedInternals.H.useEffectEvent(callback);
};
exports.useId = function () {
  return ReactSharedInternals.H.useId();
};
exports.useImperativeHandle = function (ref, create, deps) {
  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
};
exports.useInsertionEffect = function (create, deps) {
  return ReactSharedInternals.H.useInsertionEffect(create, deps);
};
exports.useLayoutEffect = function (create, deps) {
  return ReactSharedInternals.H.useLayoutEffect(create, deps);
};
exports.useMemo = function (create, deps) {
  return ReactSharedInternals.H.useMemo(create, deps);
};
exports.useOptimistic = function (passthrough, reducer) {
  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
};
exports.useReducer = function (reducer, initialArg, init) {
  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
};
exports.useRef = function (initialValue) {
  return ReactSharedInternals.H.useRef(initialValue);
};
exports.useState = function (initialState) {
  return ReactSharedInternals.H.useState(initialState);
};
exports.useSyncExternalStore = function (
  subscribe,
  getSnapshot,
  getServerSnapshot
) {
  return ReactSharedInternals.H.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
};
exports.useTransition = function () {
  return ReactSharedInternals.H.useTransition();
};
exports.version = "19.2.4";


/***/ }),
/* 8 */
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


"production" !== process.env.NODE_ENV &&
  (function () {
    function defineDeprecationWarning(methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function () {
          console.warn(
            "%s(...) is deprecated in plain JavaScript React classes. %s",
            info[0],
            info[1]
          );
        }
      });
    }
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable)
        return null;
      maybeIterable =
        (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
        maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function warnNoop(publicInstance, callerName) {
      publicInstance =
        ((publicInstance = publicInstance.constructor) &&
          (publicInstance.displayName || publicInstance.name)) ||
        "ReactClass";
      var warningKey = publicInstance + "." + callerName;
      didWarnStateUpdateForUnmountedComponent[warningKey] ||
        (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ),
        (didWarnStateUpdateForUnmountedComponent[warningKey] = !0));
    }
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    function ComponentDummy() {}
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    function noop() {}
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = !1;
      } catch (e) {
        JSCompiler_inline_result = !0;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 =
          ("function" === typeof Symbol &&
            Symbol.toStringTag &&
            value[Symbol.toStringTag]) ||
          value.constructor.name ||
          "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE
          ? null
          : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch (
          ("number" === typeof type.tag &&
            console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ),
          type.$$typeof)
        ) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type ||
              ((type = innerType.displayName || innerType.name || ""),
              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
            return type;
          case REACT_MEMO_TYPE:
            return (
              (innerType = type.displayName || null),
              null !== innerType
                ? innerType
                : getComponentNameFromType(type.type) || "Memo"
            );
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if (
        "object" === typeof type &&
        null !== type &&
        type.$$typeof === REACT_LAZY_TYPE
      )
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return !1;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown ||
          ((specialPropKeyWarningShown = !0),
          console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
      }
      warnAboutAccessingKey.isReactWarning = !0;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: !0
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] ||
        ((didWarnAboutElementRef[componentName] = !0),
        console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        props: props,
        _owner: owner
      };
      null !== (void 0 !== refProp ? refProp : null)
        ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
          })
        : Object.defineProperty(type, "ref", { enumerable: !1, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      newKey = ReactElement(
        oldElement.type,
        newKey,
        oldElement.props,
        oldElement._owner,
        oldElement._debugStack,
        oldElement._debugTask
      );
      oldElement._store &&
        (newKey._store.validated = oldElement._store.validated);
      return newKey;
    }
    function validateChildKeys(node) {
      isValidElement(node)
        ? node._store && (node._store.validated = 1)
        : "object" === typeof node &&
          null !== node &&
          node.$$typeof === REACT_LAZY_TYPE &&
          ("fulfilled" === node._payload.status
            ? isValidElement(node._payload.value) &&
              node._payload.value._store &&
              (node._payload.value._store.validated = 1)
            : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return (
        "object" === typeof object &&
        null !== object &&
        object.$$typeof === REACT_ELEMENT_TYPE
      );
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return (
        "$" +
        key.replace(/[=:]/g, function (match) {
          return escaperLookup[match];
        })
      );
    }
    function getElementKey(element, index) {
      return "object" === typeof element &&
        null !== element &&
        null != element.key
        ? (checkKeyStringCoercion(element.key), escape("" + element.key))
        : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch (
            ("string" === typeof thenable.status
              ? thenable.then(noop, noop)
              : ((thenable.status = "pending"),
                thenable.then(
                  function (fulfilledValue) {
                    "pending" === thenable.status &&
                      ((thenable.status = "fulfilled"),
                      (thenable.value = fulfilledValue));
                  },
                  function (error) {
                    "pending" === thenable.status &&
                      ((thenable.status = "rejected"),
                      (thenable.reason = error));
                  }
                )),
            thenable.status)
          ) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = !1;
      if (null === children) invokeCallback = !0;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = !0;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = !0;
                break;
              case REACT_LAZY_TYPE:
                return (
                  (invokeCallback = children._init),
                  mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  )
                );
            }
        }
      if (invokeCallback) {
        invokeCallback = children;
        callback = callback(invokeCallback);
        var childKey =
          "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
        isArrayImpl(callback)
          ? ((escapedPrefix = ""),
            null != childKey &&
              (escapedPrefix =
                childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),
            mapIntoArray(callback, array, escapedPrefix, "", function (c) {
              return c;
            }))
          : null != callback &&
            (isValidElement(callback) &&
              (null != callback.key &&
                ((invokeCallback && invokeCallback.key === callback.key) ||
                  checkKeyStringCoercion(callback.key)),
              (escapedPrefix = cloneAndReplaceKey(
                callback,
                escapedPrefix +
                  (null == callback.key ||
                  (invokeCallback && invokeCallback.key === callback.key)
                    ? ""
                    : ("" + callback.key).replace(
                        userProvidedKeyEscapeRegex,
                        "$&/"
                      ) + "/") +
                  childKey
              )),
              "" !== nameSoFar &&
                null != invokeCallback &&
                isValidElement(invokeCallback) &&
                null == invokeCallback.key &&
                invokeCallback._store &&
                !invokeCallback._store.validated &&
                (escapedPrefix._store.validated = 2),
              (callback = escapedPrefix)),
            array.push(callback));
        return 1;
      }
      invokeCallback = 0;
      childKey = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          (nameSoFar = children[i]),
            (type = childKey + getElementKey(nameSoFar, i)),
            (invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            ));
      else if (((i = getIteratorFn(children)), "function" === typeof i))
        for (
          i === children.entries &&
            (didWarnAboutMaps ||
              console.warn(
                "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
              ),
            (didWarnAboutMaps = !0)),
            children = i.call(children),
            i = 0;
          !(nameSoFar = children.next()).done;

        )
          (nameSoFar = nameSoFar.value),
            (type = childKey + getElementKey(nameSoFar, i++)),
            (invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            ));
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " +
            ("[object Object]" === array
              ? "object with keys {" + Object.keys(children).join(", ") + "}"
              : array) +
            "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [],
        count = 0;
      mapIntoArray(children, result, "", "", function (child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ioInfo = payload._ioInfo;
        null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
        ioInfo = payload._result;
        var thenable = ioInfo();
        thenable.then(
          function (moduleObject) {
            if (0 === payload._status || -1 === payload._status) {
              payload._status = 1;
              payload._result = moduleObject;
              var _ioInfo = payload._ioInfo;
              null != _ioInfo && (_ioInfo.end = performance.now());
              void 0 === thenable.status &&
                ((thenable.status = "fulfilled"),
                (thenable.value = moduleObject));
            }
          },
          function (error) {
            if (0 === payload._status || -1 === payload._status) {
              payload._status = 2;
              payload._result = error;
              var _ioInfo2 = payload._ioInfo;
              null != _ioInfo2 && (_ioInfo2.end = performance.now());
              void 0 === thenable.status &&
                ((thenable.status = "rejected"), (thenable.reason = error));
            }
          }
        );
        ioInfo = payload._ioInfo;
        if (null != ioInfo) {
          ioInfo.value = thenable;
          var displayName = thenable.displayName;
          "string" === typeof displayName && (ioInfo.name = displayName);
        }
        -1 === payload._status &&
          ((payload._status = 0), (payload._result = thenable));
      }
      if (1 === payload._status)
        return (
          (ioInfo = payload._result),
          void 0 === ioInfo &&
            console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ioInfo
            ),
          "default" in ioInfo ||
            console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ioInfo
            ),
          ioInfo.default
        );
      throw payload._result;
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H;
      null === dispatcher &&
        console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      return dispatcher;
    }
    function releaseAsyncTransition() {
      ReactSharedInternals.asyncTransitions--;
    }
    function enqueueTask(task) {
      if (null === enqueueTaskImpl)
        try {
          var requireString = ("require" + Math.random()).slice(0, 7);
          enqueueTaskImpl = (module && module[requireString]).call(
            module,
            "timers"
          ).setImmediate;
        } catch (_err) {
          enqueueTaskImpl = function (callback) {
            !1 === didWarnAboutMessageChannel &&
              ((didWarnAboutMessageChannel = !0),
              "undefined" === typeof MessageChannel &&
                console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
            var channel = new MessageChannel();
            channel.port1.onmessage = callback;
            channel.port2.postMessage(void 0);
          };
        }
      return enqueueTaskImpl(task);
    }
    function aggregateErrors(errors) {
      return 1 < errors.length && "function" === typeof AggregateError
        ? new AggregateError(errors)
        : errors[0];
    }
    function popActScope(prevActQueue, prevActScopeDepth) {
      prevActScopeDepth !== actScopeDepth - 1 &&
        console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
      actScopeDepth = prevActScopeDepth;
    }
    function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
      var queue = ReactSharedInternals.actQueue;
      if (null !== queue)
        if (0 !== queue.length)
          try {
            flushActQueue(queue);
            enqueueTask(function () {
              return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
            });
            return;
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
        else ReactSharedInternals.actQueue = null;
      0 < ReactSharedInternals.thrownErrors.length
        ? ((queue = aggregateErrors(ReactSharedInternals.thrownErrors)),
          (ReactSharedInternals.thrownErrors.length = 0),
          reject(queue))
        : resolve(returnValue);
    }
    function flushActQueue(queue) {
      if (!isFlushing) {
        isFlushing = !0;
        var i = 0;
        try {
          for (; i < queue.length; i++) {
            var callback = queue[i];
            do {
              ReactSharedInternals.didUsePromise = !1;
              var continuation = callback(!1);
              if (null !== continuation) {
                if (ReactSharedInternals.didUsePromise) {
                  queue[i] = callback;
                  queue.splice(0, i);
                  return;
                }
                callback = continuation;
              } else break;
            } while (1);
          }
          queue.length = 0;
        } catch (error) {
          queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
        } finally {
          isFlushing = !1;
        }
      }
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
      REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
      REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
      REACT_MEMO_TYPE = Symbol.for("react.memo"),
      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
      didWarnStateUpdateForUnmountedComponent = {},
      ReactNoopUpdateQueue = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function (publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function (publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function (publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      },
      assign = Object.assign,
      emptyObject = {};
    Object.freeze(emptyObject);
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function (partialState, callback) {
      if (
        "object" !== typeof partialState &&
        "function" !== typeof partialState &&
        null != partialState
      )
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    var deprecatedAPIs = {
      isMounted: [
        "isMounted",
        "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
      ],
      replaceState: [
        "replaceState",
        "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
      ]
    };
    for (fnName in deprecatedAPIs)
      deprecatedAPIs.hasOwnProperty(fnName) &&
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    ComponentDummy.prototype = Component.prototype;
    deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
    deprecatedAPIs.constructor = PureComponent;
    assign(deprecatedAPIs, Component.prototype);
    deprecatedAPIs.isPureReactComponent = !0;
    var isArrayImpl = Array.isArray,
      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
      ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      },
      hasOwnProperty = Object.prototype.hasOwnProperty,
      createTask = console.createTask
        ? console.createTask
        : function () {
            return null;
          };
    deprecatedAPIs = {
      react_stack_bottom_frame: function (callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
      deprecatedAPIs,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutMaps = !1,
      userProvidedKeyEscapeRegex = /\/+/g,
      reportGlobalError =
        "function" === typeof reportError
          ? reportError
          : function (error) {
              if (
                "object" === typeof window &&
                "function" === typeof window.ErrorEvent
              ) {
                var event = new window.ErrorEvent("error", {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    "object" === typeof error &&
                    null !== error &&
                    "string" === typeof error.message
                      ? String(error.message)
                      : String(error),
                  error: error
                });
                if (!window.dispatchEvent(event)) return;
              } else if (
                "object" === typeof process &&
                "function" === typeof process.emit
              ) {
                process.emit("uncaughtException", error);
                return;
              }
              console.error(error);
            },
      didWarnAboutMessageChannel = !1,
      enqueueTaskImpl = null,
      actScopeDepth = 0,
      didWarnNoAwaitAct = !1,
      isFlushing = !1,
      queueSeveralMicrotasks =
        "function" === typeof queueMicrotask
          ? function (callback) {
              queueMicrotask(function () {
                return queueMicrotask(callback);
              });
            }
          : enqueueTask;
    deprecatedAPIs = Object.freeze({
      __proto__: null,
      c: function (size) {
        return resolveDispatcher().useMemoCache(size);
      }
    });
    var fnName = {
      map: mapChildren,
      forEach: function (children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function () {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function (children) {
        var n = 0;
        mapChildren(children, function () {
          n++;
        });
        return n;
      },
      toArray: function (children) {
        return (
          mapChildren(children, function (child) {
            return child;
          }) || []
        );
      },
      only: function (children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = fnName;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
      ReactSharedInternals;
    exports.__COMPILER_RUNTIME = deprecatedAPIs;
    exports.act = function (callback) {
      var prevActQueue = ReactSharedInternals.actQueue,
        prevActScopeDepth = actScopeDepth;
      actScopeDepth++;
      var queue = (ReactSharedInternals.actQueue =
          null !== prevActQueue ? prevActQueue : []),
        didAwaitActCall = !1;
      try {
        var result = callback();
      } catch (error) {
        ReactSharedInternals.thrownErrors.push(error);
      }
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw (
          (popActScope(prevActQueue, prevActScopeDepth),
          (callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
          (ReactSharedInternals.thrownErrors.length = 0),
          callback)
        );
      if (
        null !== result &&
        "object" === typeof result &&
        "function" === typeof result.then
      ) {
        var thenable = result;
        queueSeveralMicrotasks(function () {
          didAwaitActCall ||
            didWarnNoAwaitAct ||
            ((didWarnNoAwaitAct = !0),
            console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
        });
        return {
          then: function (resolve, reject) {
            didAwaitActCall = !0;
            thenable.then(
              function (returnValue) {
                popActScope(prevActQueue, prevActScopeDepth);
                if (0 === prevActScopeDepth) {
                  try {
                    flushActQueue(queue),
                      enqueueTask(function () {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                  } catch (error$0) {
                    ReactSharedInternals.thrownErrors.push(error$0);
                  }
                  if (0 < ReactSharedInternals.thrownErrors.length) {
                    var _thrownError = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    );
                    ReactSharedInternals.thrownErrors.length = 0;
                    reject(_thrownError);
                  }
                } else resolve(returnValue);
              },
              function (error) {
                popActScope(prevActQueue, prevActScopeDepth);
                0 < ReactSharedInternals.thrownErrors.length
                  ? ((error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    )),
                    (ReactSharedInternals.thrownErrors.length = 0),
                    reject(error))
                  : reject(error);
              }
            );
          }
        };
      }
      var returnValue$jscomp$0 = result;
      popActScope(prevActQueue, prevActScopeDepth);
      0 === prevActScopeDepth &&
        (flushActQueue(queue),
        0 !== queue.length &&
          queueSeveralMicrotasks(function () {
            didAwaitActCall ||
              didWarnNoAwaitAct ||
              ((didWarnNoAwaitAct = !0),
              console.error(
                "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
              ));
          }),
        (ReactSharedInternals.actQueue = null));
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw (
          ((callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
          (ReactSharedInternals.thrownErrors.length = 0),
          callback)
        );
      return {
        then: function (resolve, reject) {
          didAwaitActCall = !0;
          0 === prevActScopeDepth
            ? ((ReactSharedInternals.actQueue = queue),
              enqueueTask(function () {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              }))
            : resolve(returnValue$jscomp$0);
        }
      };
    };
    exports.cache = function (fn) {
      return function () {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function () {
      return null;
    };
    exports.captureOwnerStack = function () {
      var getCurrentStack = ReactSharedInternals.getCurrentStack;
      return null === getCurrentStack ? null : getCurrentStack();
    };
    exports.cloneElement = function (element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " +
            element +
            "."
        );
      var props = assign({}, element.props),
        key = element.key,
        owner = element._owner;
      if (null != config) {
        var JSCompiler_inline_result;
        a: {
          if (
            hasOwnProperty.call(config, "ref") &&
            (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) &&
            JSCompiler_inline_result.isReactWarning
          ) {
            JSCompiler_inline_result = !1;
            break a;
          }
          JSCompiler_inline_result = void 0 !== config.ref;
        }
        JSCompiler_inline_result && (owner = getOwner());
        hasValidKey(config) &&
          (checkKeyStringCoercion(config.key), (key = "" + config.key));
        for (propName in config)
          !hasOwnProperty.call(config, propName) ||
            "key" === propName ||
            "__self" === propName ||
            "__source" === propName ||
            ("ref" === propName && void 0 === config.ref) ||
            (props[propName] = config[propName]);
      }
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        JSCompiler_inline_result = Array(propName);
        for (var i = 0; i < propName; i++)
          JSCompiler_inline_result[i] = arguments[i + 2];
        props.children = JSCompiler_inline_result;
      }
      props = ReactElement(
        element.type,
        key,
        props,
        owner,
        element._debugStack,
        element._debugTask
      );
      for (key = 2; key < arguments.length; key++)
        validateChildKeys(arguments[key]);
      return props;
    };
    exports.createContext = function (defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      defaultValue._currentRenderer = null;
      defaultValue._currentRenderer2 = null;
      return defaultValue;
    };
    exports.createElement = function (type, config, children) {
      for (var i = 2; i < arguments.length; i++)
        validateChildKeys(arguments[i]);
      i = {};
      var key = null;
      if (null != config)
        for (propName in (didWarnAboutOldJSXRuntime ||
          !("__self" in config) ||
          "key" in config ||
          ((didWarnAboutOldJSXRuntime = !0),
          console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )),
        hasValidKey(config) &&
          (checkKeyStringCoercion(config.key), (key = "" + config.key)),
        config))
          hasOwnProperty.call(config, propName) &&
            "key" !== propName &&
            "__self" !== propName &&
            "__source" !== propName &&
            (i[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) i.children = children;
      else if (1 < childrenLength) {
        for (
          var childArray = Array(childrenLength), _i = 0;
          _i < childrenLength;
          _i++
        )
          childArray[_i] = arguments[_i + 2];
        Object.freeze && Object.freeze(childArray);
        i.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in ((childrenLength = type.defaultProps), childrenLength))
          void 0 === i[propName] && (i[propName] = childrenLength[propName]);
      key &&
        defineKeyPropWarningGetter(
          i,
          "function" === typeof type
            ? type.displayName || type.name || "Unknown"
            : type
        );
      var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return ReactElement(
        type,
        key,
        i,
        getOwner(),
        propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    exports.createRef = function () {
      var refObject = { current: null };
      Object.seal(refObject);
      return refObject;
    };
    exports.forwardRef = function (render) {
      null != render && render.$$typeof === REACT_MEMO_TYPE
        ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          )
        : "function" !== typeof render
          ? console.error(
              "forwardRef requires a render function but was given %s.",
              null === render ? "null" : typeof render
            )
          : 0 !== render.length &&
            2 !== render.length &&
            console.error(
              "forwardRef render functions accept exactly two parameters: props and ref. %s",
              1 === render.length
                ? "Did you forget to use the ref parameter?"
                : "Any additional parameter will be undefined."
            );
      null != render &&
        null != render.defaultProps &&
        console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
      var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render: render },
        ownName;
      Object.defineProperty(elementType, "displayName", {
        enumerable: !1,
        configurable: !0,
        get: function () {
          return ownName;
        },
        set: function (name) {
          ownName = name;
          render.name ||
            render.displayName ||
            (Object.defineProperty(render, "name", { value: name }),
            (render.displayName = name));
        }
      });
      return elementType;
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function (ctor) {
      ctor = { _status: -1, _result: ctor };
      var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        },
        ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
      ctor._ioInfo = ioInfo;
      lazyType._debugInfo = [{ awaited: ioInfo }];
      return lazyType;
    };
    exports.memo = function (type, compare) {
      null == type &&
        console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
      compare = {
        $$typeof: REACT_MEMO_TYPE,
        type: type,
        compare: void 0 === compare ? null : compare
      };
      var ownName;
      Object.defineProperty(compare, "displayName", {
        enumerable: !1,
        configurable: !0,
        get: function () {
          return ownName;
        },
        set: function (name) {
          ownName = name;
          type.name ||
            type.displayName ||
            (Object.defineProperty(type, "name", { value: name }),
            (type.displayName = name));
        }
      });
      return compare;
    };
    exports.startTransition = function (scope) {
      var prevTransition = ReactSharedInternals.T,
        currentTransition = {};
      currentTransition._updatedFibers = new Set();
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(),
          onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish &&
          onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue &&
          null !== returnValue &&
          "function" === typeof returnValue.then &&
          (ReactSharedInternals.asyncTransitions++,
          returnValue.then(releaseAsyncTransition, releaseAsyncTransition),
          returnValue.then(noop, reportGlobalError));
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null === prevTransition &&
          currentTransition._updatedFibers &&
          ((scope = currentTransition._updatedFibers.size),
          currentTransition._updatedFibers.clear(),
          10 < scope &&
            console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )),
          null !== prevTransition &&
            null !== currentTransition.types &&
            (null !== prevTransition.types &&
              prevTransition.types !== currentTransition.types &&
              console.error(
                "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
              ),
            (prevTransition.types = currentTransition.types)),
          (ReactSharedInternals.T = prevTransition);
      }
    };
    exports.unstable_useCacheRefresh = function () {
      return resolveDispatcher().useCacheRefresh();
    };
    exports.use = function (usable) {
      return resolveDispatcher().use(usable);
    };
    exports.useActionState = function (action, initialState, permalink) {
      return resolveDispatcher().useActionState(
        action,
        initialState,
        permalink
      );
    };
    exports.useCallback = function (callback, deps) {
      return resolveDispatcher().useCallback(callback, deps);
    };
    exports.useContext = function (Context) {
      var dispatcher = resolveDispatcher();
      Context.$$typeof === REACT_CONSUMER_TYPE &&
        console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
      return dispatcher.useContext(Context);
    };
    exports.useDebugValue = function (value, formatterFn) {
      return resolveDispatcher().useDebugValue(value, formatterFn);
    };
    exports.useDeferredValue = function (value, initialValue) {
      return resolveDispatcher().useDeferredValue(value, initialValue);
    };
    exports.useEffect = function (create, deps) {
      null == create &&
        console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
      return resolveDispatcher().useEffect(create, deps);
    };
    exports.useEffectEvent = function (callback) {
      return resolveDispatcher().useEffectEvent(callback);
    };
    exports.useId = function () {
      return resolveDispatcher().useId();
    };
    exports.useImperativeHandle = function (ref, create, deps) {
      return resolveDispatcher().useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function (create, deps) {
      null == create &&
        console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
      return resolveDispatcher().useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function (create, deps) {
      null == create &&
        console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
      return resolveDispatcher().useLayoutEffect(create, deps);
    };
    exports.useMemo = function (create, deps) {
      return resolveDispatcher().useMemo(create, deps);
    };
    exports.useOptimistic = function (passthrough, reducer) {
      return resolveDispatcher().useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function (reducer, initialArg, init) {
      return resolveDispatcher().useReducer(reducer, initialArg, init);
    };
    exports.useRef = function (initialValue) {
      return resolveDispatcher().useRef(initialValue);
    };
    exports.useState = function (initialState) {
      return resolveDispatcher().useState(initialState);
    };
    exports.useSyncExternalStore = function (
      subscribe,
      getSnapshot,
      getServerSnapshot
    ) {
      return resolveDispatcher().useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    exports.useTransition = function () {
      return resolveDispatcher().useTransition();
    };
    exports.version = "19.2.4";
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var corner_smoothing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenu();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.popups();


/*==========================================================================
Smooth corners
============================================================================*/
const smoothElements = document.querySelectorAll('.smooth');

smoothElements.forEach(el => {
   const radius = parseInt(el.dataset.radius, 10) || 20;
   const smoothing = parseFloat(el.dataset.smooth) || 1;

   const render = (0,corner_smoothing__WEBPACK_IMPORTED_MODULE_1__.squircleObserver)(el, {
      element: el,
      cornerRadius: radius,
      cornerSmoothing: smoothing,
      preserveSmoothing: true
   });

   render();
});


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
         clickable: true,
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

   const singleOpenBreakpoint = 880;
   const mobileBreakpoint = 767;

   function setDefaultState() {
      const width = window.innerWidth;

      hotspots.forEach((hotspot, index) => {
         const card = hotspot.querySelector('.hotspot__card');
         if (!card) return;

         if (width > singleOpenBreakpoint) {
            card.classList.add('show');
         } else if (width > mobileBreakpoint) {
            card.classList.toggle('show', index === 0);
         } else {
            card.classList.remove('show');
         }
      });
   }

   hotspots.forEach(hotspot => {
      const dot = hotspot.querySelector('.hotspot__dot');
      const card = hotspot.querySelector('.hotspot__card');
      if (!dot || !card) return;

      dot.addEventListener('click', () => {
         const width = window.innerWidth;

         if (width <= singleOpenBreakpoint) {
            hotspots.forEach(h => {
               const c = h.querySelector('.hotspot__card');
               if (c && c !== card) {
                  c.classList.remove('show');
               }
            });
         }

         card.classList.toggle('show');
      });
   });

   setDefaultState();
   window.addEventListener('resize', setDefaultState);
}

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
         mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
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
   const isRequired = area.dataset.area === 'required';

   if (!skipRequired && isRequired) {
      if (input && !input.value.trim()) valid = false;
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

if (form) {
   form.addEventListener('submit', (e) => {
      if (!validateRequestForm(form)) e.preventDefault();
   });
}

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
Article gallery
============================================================================*/
function initGallerySlider() {
   const galleries = document.querySelectorAll('.article__gallery');

   if (!galleries.length) return;

   const swipers = [];

   galleries.forEach(gallery => {
      const slider = gallery.querySelector('.article__gallery-slider');
      const prev = gallery.querySelector('.article__gallery-prev');
      const next = gallery.querySelector('.article__gallery-next');

      if (!slider) return;

      const swiper = new Swiper(slider, {
         loop: false,
         spaceBetween: 10,
         speed: 600,
         navigation: {
            prevEl: prev,
            nextEl: next,
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
               slidesPerView: 3,
               spaceBetween: 26,
            }
         }
      });

      swipers.push(swiper);
   });

   return swipers;
}


/*==========================================================================
Marque slider
============================================================================*/
const marqueSlider = document.querySelector(".dealers__slider");

if (marqueSlider) {
   const brandsSwiper = new Swiper(marqueSlider, {
      slidesPerView: "auto",
      spaceBetween: 60,
      loop: true,
      freeMode: false,
      simulateTouch: false,
      slideToClickedSlide: false,
      speed: 3000,
      autoplay: {
         delay: 0,
         disableOnInteraction: false,
      },
   });
}

/*==========================================================================
Cookie
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {

   const COOKIE_NAME = 'cookiesAccepted';

   function setCookie(name, value, days = 365) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
   }

   function getCookie(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
   }

   const cookiesWrapper = document.querySelector('.cookies');
   if (!cookiesWrapper) return;

   if (!getCookie(COOKIE_NAME)) {
      cookiesWrapper.style.display = 'block';
   }

   // ===== Аккордеон =====
   const cookieSettings = document.querySelectorAll('.cookies__setting');

   if (cookieSettings.length) {
      cookieSettings.forEach(setting => {
         const title = setting.querySelector('.cookies__setting-title');
         const descr = setting.querySelector('.cookies__setting-descr');
         if (!title || !descr) return;

         descr.style.maxHeight = '0px';
         descr.style.overflow = 'hidden';
         descr.style.transition = 'max-height 0.3s ease';

         title.addEventListener('click', () => {
            const isOpened = setting.classList.contains('opened');

            cookieSettings.forEach(s => {
               s.classList.remove('opened');
               const sDescr = s.querySelector('.cookies__setting-descr');
               if (sDescr) sDescr.style.maxHeight = '0px';
            });

            if (!isOpened) {
               setting.classList.add('opened');
               descr.style.maxHeight = descr.scrollHeight + 'px';
            }
         });
      });
   }

   // ===== Переключение настроек =====
   const banner = document.querySelector('.cookies__att');
   const settingsBlock = document.querySelector('.cookies__settings');
   const buttons = document.querySelectorAll('.cookies__settings-btn');

   if (banner && settingsBlock && buttons.length) {

      banner.style.opacity = '1';
      banner.style.transition = 'opacity 0.3s ease';

      settingsBlock.style.display = 'none';
      settingsBlock.style.opacity = '0';
      settingsBlock.style.transition = 'opacity 0.3s ease';

      buttons.forEach(btn => {
         btn.addEventListener('click', () => {

            if (banner.style.display !== 'none') {

               banner.style.opacity = '0';

               setTimeout(() => {
                  banner.style.display = 'none';
                  settingsBlock.style.display = 'block';

                  setTimeout(() => {
                     settingsBlock.style.opacity = '1';
                  }, 10);

               }, 300);

            } else {

               settingsBlock.style.opacity = '0';

               setTimeout(() => {
                  settingsBlock.style.display = 'none';
                  banner.style.display = 'block';

                  setTimeout(() => {
                     banner.style.opacity = '1';
                  }, 10);

               }, 300);

            }

         });
      });
   }

   // ===== Accept / Reject =====
   const actionButtons = cookiesWrapper.querySelectorAll('.cookies__apply, .cookies__reject');

   actionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
         setCookie(COOKIE_NAME, 'true', 365);
         cookiesWrapper.style.display = 'none';
      });
   });

});

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
   initVideoPlayers();
   initGallerySlider();
})
})();

/******/ })()
;