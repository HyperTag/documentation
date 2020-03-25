exports.onRouteUpdate = () => {
  var navList = document.querySelector('.nav-list')
  var selectedItem = 'selected-item'
  var sectionAnchor = 'section-anchor' // <h1> with this class indicates the page is made of merged markdown files

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

  var onClickNav = function(e) {
    var tag = e.target.tagName.toLowerCase()

    // toggle section when header is clicked
    if (tag === 'h2') {
      e.target.classList.toggle('collapsed')
      e.target.nextSibling.classList.toggle('hidden')
    }

    // set class when link is clicked (hashchange does not get triggered)
    else if (tag === 'a' && !e.target.classList.contains('logo')) {
      navList.querySelectorAll('li a').forEach(function(a) {
        a.classList.remove(selectedItem)
      })
      e.target.classList.add(selectedItem)
    }
  }

  // find the parent heading for the subheading, get its internal anchor and highlight the corresponding menu item
  var setCurrentForSubheading = function() {
    var subheading = document.querySelector('main a[href="' + window.location.hash + '"]')
    var parentAnchor = subheading.closest('section').querySelector('h1 .anchor')
    var url = new URL(parentAnchor.href)

    // TODO add a comment to this re-assignment
    var navItem = navList.querySelector('li a[href="' + url.pathname + url.hash + '"]')

    if (!navItem) {
      navItem = navList.querySelector('li a[href="' + url.pathname + '"]')
    }

    navItem.classList.add(selectedItem)
  }

  var setCurrent = function() {
    // check if an anchor with the current path exists in nav
    // will be false for subheading anchors
    var anchor = navList.querySelector('li a[href="' + window.location.pathname + window.location.hash + '"]')

    navList.querySelectorAll('a').forEach(function(a) {
      a.classList.remove(selectedItem)
    })

    if (anchor) {
      anchor.classList.add(selectedItem)
    } else {
      setCurrentForSubheading()
    }
  }

  var checkSectionOffset = function(section) {
    if (!document.querySelector('.' + sectionAnchor)) {
      return // bail out if this is a single page
    }

    var hasHash = window.location.hash !== ''
    var isSectionSubheading = false

    // check whether the current hash belongs to a subheading (h2, h3, etc.) in this section
    if (hasHash) {
      var currentEl = document.getElementById(window.location.hash.substring(1))
      isSectionSubheading = currentEl && section.contains(currentEl) && !currentEl.classList.contains(sectionAnchor)
    }

    if (
      !isSectionSubheading && // prevents hash change to section anchor when clicking one of its subheading links
      section.offsetTop < window.pageYOffset &&
      section.offsetTop + section.offsetHeight > window.pageYOffset
    ) {
      // TODO deal with cases where this isn't an h1
      window.location.hash = '#' + section.querySelector('.' + sectionAnchor).id
    }
  }

  var checkSubheadingOffset = function(heading) {
    if (!document.querySelector('.toc')) {
      return
    }

    if (heading.getBoundingClientRect().top < 100) {
      // highlight the corresponding link in table of contents
      var url = new URL(heading.querySelector('.anchor').href)
      var tocLink = heading.closest('section').querySelector('.toc a[href="' + url.hash + '"]')

      document.querySelectorAll('.toc a').forEach(function(a) {
        a.classList.remove('font-bold')
      })
      tocLink.classList.add('font-bold')
    }
  }

  var onScroll = throttle(function() {
    document.querySelectorAll('main section').forEach(checkSectionOffset)
    document.querySelectorAll('main h2').forEach(checkSubheadingOffset)
  }, 250)

  setCurrent()

  window.addEventListener('hashchange', setCurrent)
  document.addEventListener('scroll', onScroll)
  navList.addEventListener('click', onClickNav)
}
