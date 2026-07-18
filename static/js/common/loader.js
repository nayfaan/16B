loadJavaScript = function (url, success) {
  let domScript = document.createElement('script');
  domScript.src = url;
  success = success || function () {
    // do nothing
  };

  if (navigator.userAgent.indexOf("MSIE") > 0) {
    domScript.onreadystatechange = function () {
      if ('loaded' === this.readyState || 'complete' === this.readyState) {
        success();
        this.onload = null;
        this.onreadystatechange = null;
        this.parentNode.removeChild(this);
      }
    }
  } else {
    domScript.onload = function () {
      success();
      this.onload = null;
      this.onreadystatechange = null;
      this.parentNode.removeChild(this);
    }
  }

  document.getElementsByTagName('head')[0].appendChild(domScript);
};

loadJavaScripts = function (urls, onLoad) {
  let loadIndex = 0;

  let onLoaded = function () {
    loadIndex++;

    if (loadIndex === urls.length) {
      if (onLoad) onLoad();
    } else {
      loadJavaScript(urls[loadIndex], onLoaded);
    }
  };

  loadJavaScript(urls[loadIndex], onLoaded);
};

(function (g) {
  g.hideCoverImage = function () {
    document.body.style.backgroundImage = 'unset';
    document.body.style.backgroundColor = 'unset';
    document.body.style.backgroundRepeat = 'unset';
    document.body.style.backgroundPosition = 'unset';
    document.body.style.backgroundSize = 'unset';
    // ie11
    document.body.style.opacity = '1';
  };

  g.showCoverImage = function () {
    let url = new URL(location.href);
    let domain = url.searchParams.get("domain");
    document.body.style.backgroundImage = 'url(' + domain + 'CoverImage/Cover.jpg)';
    document.body.style.backgroundColor = 'rgb(45, 46, 40)';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.opacity = '0.65';
  };
  // g.addEventListener('load', function (e) {
  //   g.showCoverImage();
  // })
})(window, undefined);
