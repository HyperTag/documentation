exports.onRouteUpdate = () => {
  var navList = document.querySelector('.nav-list')
  var navDropdown = document.querySelector('.nav-dropdown select')
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

    if (subheading) {
      var parentAnchor = subheading.closest('section').querySelector('h1 .anchor')
      var url = new URL(parentAnchor.href)
      // TODO add a comment to this re-assignment
      var navItem = navList.querySelector('li a[href="' + url.pathname + url.hash + '"]')
      if (!navItem) {
        navItem = navList.querySelector('li a[href="' + url.pathname + '"]')
      }
      navItem.classList.add(currentNavSelector)
    }
  }

  var setCurrent = function() {
    var href = window.location.pathname + window.location.hash
    var anchor = navList.querySelector('li a[href="' + href + '"]')

    navList.querySelectorAll('a').forEach(function(a) {
      a.classList.remove(currentNavSelector)
    })

    // check if an anchor with the current path exists in nav list
    // will be false for subheading anchors
    if (anchor) {
      anchor.classList.add(currentNavSelector)
    } else {
      setCurrentForSubheading()
    }

    var selectedDropdownIndex = Array.from(navDropdown.options).findIndex(function(option) {
      return option.value === href
    })

    navDropdown.selectedIndex = selectedDropdownIndex
  }

  var setHashByOffset = function(section) {
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

  // highlights the link in TOC for the associated content based on offset
  var setTocByOffset = function(heading) {
    if (!document.querySelector('.toc') || document.body.width < 1280) {
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
    document.querySelectorAll('main section').forEach(setHashByOffset)
    document.querySelectorAll('main h2').forEach(setTocByOffset)
  }, 200)

  // append a list of tags to the primary heading, with values taken from its data attrs
  var renderTags = function() {
    var h1 = document.querySelector('main h1')

    if (h1 && h1.dataset.tags) {
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
    if (navList) {
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
  }

  var setStickyNav = function() {
    var isSticky = document.body.clientWidth > 1280 // corresponds with CSS breakpoint

    if (!isSticky) {
      document.querySelectorAll('.toc a').forEach(function(a) {
        a.classList.remove('font-bold')
      })
    }
  }

  var onNavDropdownChange = function(e) {
    window.location.href = e.target.value
  }

  // functions to run onload
  setCurrent()
  syncNavState()
  renderTags()
  styleTableCells()
  setStickyNav()

  // event handlers
  window.addEventListener('hashchange', setCurrent)
  window.addEventListener('resize', setStickyNav)
  document.addEventListener('scroll', onScroll)
  navList && navList.addEventListener('click', onClickNav)
  navDropdown && navDropdown.addEventListener('change', onNavDropdownChange)
}
