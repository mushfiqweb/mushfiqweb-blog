window.addEventListener('load', function () {
  var allimages = document.getElementsByTagName('img');
  for (var i = 0; i < allimages.length; i++) {
    if (allimages[i].getAttribute('data-src')) {
      allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
    }

    if (allimages[i].getAttribute('data-width')) {
      allimages[i].setAttribute('width', allimages[i].getAttribute('data-width'));
    }

    if (allimages[i].getAttribute('data-height')) {
      allimages[i].setAttribute('height', allimages[i].getAttribute('data-height'));
    }
  }
}, false);