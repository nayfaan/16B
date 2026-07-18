(function () {
  "use strict";

  var HID = "samuel_4c07d651-19bd-46e0-abd9-bf1f11977614";
  try {
    if (location.search.indexOf("hid=") === -1) {
      var sep = location.search ? "&" : "?";
      history.replaceState(null, "",
        location.pathname + location.search + sep + "hid=" + HID + "&lang=hk&staff=0");
    }
  } catch (e) {}
  window.hid = HID;

  var BLANK_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M8AAAMCAQGZjW2CAAAAAElFTkSuQmCC";
  var BLANK_SVG = "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%2F%3E";

  // ---- URL rewriting rules -------------------------------------------------
  function rw(u) {
    if (!u || typeof u !== "string") return u;
    var s = u;
	
    if (/textures\/decoration\/|StaticAIIntroduce|pauseAIIntroduce/.test(s))
      return /\.svg(\?|$)/i.test(s) ? BLANK_SVG : BLANK_PNG;

    if (s.charAt(0) === "/" && s.charAt(1) !== "/") return u;
    if (/^(data:|blob:|\.|#|\?)/.test(s)) return u;
    if (s.indexOf("://") === -1 && s.indexOf("//") !== 0) return u;
    if (s.indexOf(location.host) > -1) return u;
    if (s.indexOf("/HouseInfoPostDetail") > -1) return "./data/houseInfo.json";

    var k = "hkvrdata.centanet.com/";
    var i = s.indexOf(k);
    if (i > -1) return "./data/" + s.substring(i + k.length);

    if (/\.(png|jpe?g|gif|svg|webp)(\?|$)/i.test(s)) return BLANK_PNG;
    if (/\.js(\?|$)/i.test(s)) return "./data/empty.js";
    return "./data/empty.json";
  }
  window.__vrRewrite = rw;

  // ---- fetch ---------------------------------------------------------------
  if (window.fetch) {
    var _fetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      try {
        if (typeof input === "string") {
          input = rw(input);
        } else if (input && input.url) {
          var nu = rw(input.url);
          if (nu !== input.url) input = new Request(nu, input);
        }
      } catch (e) {}
      return _fetch(input, init);
    };
  }

  // ---- XMLHttpRequest ------------------------------------------------------
  var _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    try { url = rw(url); } catch (e) {}
    return _open.apply(this, [method, url].concat([].slice.call(arguments, 2)));
  };

  // ---- src property setters (Image, Script, Media, Source) -----------------
  function patchSrc(proto) {
    if (!proto) return;
    var d = Object.getOwnPropertyDescriptor(proto, "src");
    if (!d || !d.set) return;
    Object.defineProperty(proto, "src", {
      configurable: true,
      enumerable: d.enumerable,
      get: function () { return d.get.call(this); },
      set: function (v) { d.set.call(this, rw(v)); }
    });
  }
  patchSrc(window.HTMLImageElement && HTMLImageElement.prototype);
  patchSrc(window.HTMLScriptElement && HTMLScriptElement.prototype);
  patchSrc(window.HTMLMediaElement && HTMLMediaElement.prototype);
  patchSrc(window.HTMLSourceElement && HTMLSourceElement.prototype);

  // ---- setAttribute('src', ...) --------------------------------------------
  var _setAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (typeof value === "string" && name && name.toLowerCase() === "src")
      value = rw(value);
    return _setAttr.call(this, name, value);
  };
})();
