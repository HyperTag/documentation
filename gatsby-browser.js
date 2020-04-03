exports.onRouteUpdate = () => {
  var navList = document.querySelector('.nav-list')
  var currentNavSelector = 'selected-item'
  var sectionAnchorSelector = 'section-anchor' // <h1> with this class indicates the page is made of merged markdown files

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

  var inViewport = function(el, offsetTop) {
    var rect = el.getBoundingClientRect()

    return (
      rect.top >= 0 + offsetTop &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  var stringToHTML = function(str) {
    var parser = new DOMParser()
    var doc = parser.parseFromString(str, 'text/html')
    return doc.body
  }

  var insertAfter = function(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
  }

  var onClickNav = function(e) {
    var tag = e.target.tagName.toLowerCase()

    // toggle section when header is clicked
    if (tag === 'h2') {
      e.target.classList.toggle('collapsed')
      e.target.nextSibling.classList.toggle('hidden')
      setNavCollapsedState()
    } else if (tag === 'a' && !e.target.classList.contains('logo')) {
      // save the navigation scroll position
      sessionStorage.setItem('navStateScroll', navList.querySelector('.scrollbox').scrollTop)

      // set class when link is clicked (hashchange does not get triggered)
      navList.querySelectorAll('li a').forEach(function(a) {
        a.classList.remove(currentNavSelector)
      })
      e.target.classList.add(currentNavSelector)
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

    navItem.classList.add(currentNavSelector)
  }

  var setCurrent = function() {
    // check if an anchor with the current path exists in nav
    // will be false for subheading anchors
    var anchor = navList.querySelector('li a[href="' + window.location.pathname + window.location.hash + '"]')

    navList.querySelectorAll('a').forEach(function(a) {
      a.classList.remove(currentNavSelector)
    })

    if (anchor) {
      anchor.classList.add(currentNavSelector)
    } else {
      setCurrentForSubheading()
    }
  }

  var checkSectionOffset = function(section) {
    if (!document.querySelector('.' + sectionAnchorSelector)) {
      return // bail out if this is a single page
    }

    var hasHash = window.location.hash !== ''
    var isSectionSubheading = false

    // check whether the current hash belongs to a subheading (h2, h3, etc.) in this section
    if (hasHash) {
      var currentEl = document.getElementById(window.location.hash.substring(1))
      isSectionSubheading =
        currentEl && section.contains(currentEl) && !currentEl.classList.contains(sectionAnchorSelector)
    }

    if (
      !isSectionSubheading && // prevents hash change to section anchor when clicking one of its subheading links
      section.offsetTop < window.pageYOffset &&
      section.offsetTop + section.offsetHeight > window.pageYOffset
    ) {
      // TODO deal with cases where this isn't an h1
      window.location.hash = '#' + section.querySelector('.' + sectionAnchorSelector).id
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
  }, 200)

  // append a list of tags to the primary heading, with values taken from its data attrs
  var renderTags = function() {
    var h1 = document.querySelector('main h1')

    if (h1.dataset.tags) {
      var tags = `<ul class="tags">${h1.dataset.tags
        .split(',')
        .map(function(tag) {
          var text = tag === 'sources' ? 'sources &amp; SDKs' : tag

          return `<li class="${tag}">${text}</li>`
        })
        .join('')}</ul>`

      var tagsList = stringToHTML(tags).querySelector('ul') // get the list from the new document returned by stringToHTML
      insertAfter(tagsList, h1)
    }
  }

  // add cloud green for table checkmarks
  var styleTableCells = function() {
    var cells = document.querySelectorAll('main table td')

    cells.forEach(function(cell) {
      if (cell.innerText === '✔') {
        cell.style.color = '#5fa284'
      }
    })
  }

  var setNavCollapsedState = function() {
    var collapsedGroups = navList.querySelectorAll('.scrollbox ul.hidden')
    var collapsed = collapsedGroups.length
      ? Array.from(collapsedGroups).map(function(group) {
          return group.dataset.title
        })
      : []

    sessionStorage.setItem('navStateCollapsed', collapsed.join(','))
  }

  // get nav state from session storage
  var syncNavState = function() {
    var titles = sessionStorage.getItem('navStateCollapsed')
    var scrollPosition = Number(sessionStorage.getItem('navStateScroll'))
    var currentNav = navList.querySelector('.' + currentNavSelector)
    var navHeaderHeight = navList.querySelector('header').clientHeight

    if (titles) {
      titles.split(',').forEach(function(title) {
        navList.querySelector(`[data-title=${title}]`).classList.add('hidden')
      })
    }

    if (scrollPosition) {
      navList.querySelector('.scrollbox').scrollTo(0, scrollPosition)
    }

    if (currentNav && !inViewport(currentNav, navHeaderHeight)) {
      navList.querySelector('.scrollbox').scrollTo(0, currentNav.offsetTop - navHeaderHeight)
    }
  }

  // functions to run onload
  setCurrent()
  syncNavState()
  renderTags()
  styleTableCells()

  // event handlers
  window.addEventListener('hashchange', setCurrent)
  document.addEventListener('scroll', onScroll)
  navList.addEventListener('click', onClickNav)
}
