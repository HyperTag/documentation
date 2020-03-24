;(function() {
  var throttle = function(callback, limit) {
    var wait = false
    return function() {
      if (!wait) {
        callback.call()
        wait = true
        setTimeout(function() {
          wait = false
        }, limit)
      }
    }
  }

  var onClickHeader = function(e) {
    var isNav = e.target.tagName.toLowerCase() === 'h2' && $document.querySelector('.nav-list').contains(e.target)

    if (isNav) {
      e.target.classList.toggle('collapsed')
      e.target.nextSibling.classList.toggle('hidden')
    }
  }

  var setCurrent = function() {
    var hash = window.location.hash
    var $navList = document.querySelector('.nav-list')

    $navList.querySelectorAll('a').forEach(function(a) {
      a.classList.remove('selected-item')
    })
    console.log(hash)
    // $navList
    //   .querySelector('a[href$="' + hash + '"]')
    //   .classList.add('selected-item')
  }

  var checkOffset = function(section) {
    var hasHash = document.location.hash !== ''
    var isSectionSubheading = false

    // check whether the current hash belongs to a subheading (h2, h3, etc.) in this section
    if (hasHash) {
      var currentEl = document.getElementById(document.location.hash.substring(1))
      isSectionSubheading = currentEl && section.contains(currentEl) && !currentEl.classList.contains('section-anchor')
    }

    if (
      !isSectionSubheading && // prevents hash change to section anchor when clicking one of its subheading links
      section.offsetTop < window.pageYOffset &&
      section.offsetTop + section.offsetHeight > window.pageYOffset
    ) {
      // TODO deal with cases where this isn't an h1
      history.replaceState({}, '', '#' + section.querySelector('.section-anchor').id)
    }
  }

  var onScroll = throttle(function() {
    document.querySelectorAll('main section').forEach(checkOffset)
  }, 250)

  // window.addEventListener('hashchange', setCurrent)
  document.addEventListener('click', onClickHeader)
  document.addEventListener('scroll', onScroll)
})()
