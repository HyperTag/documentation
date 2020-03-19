;(function() {
  var onClickHeader = function(e) {
    var isNav =
      e.target.tagName.toLowerCase() === 'h2' &&
      document.querySelector('.nav-list').contains(e.target)

    if (isNav) {
      e.target.classList.toggle('collapsed')
      e.target.nextSibling.classList.toggle('hidden')
    }
  }

  document.addEventListener('click', onClickHeader)
})()
