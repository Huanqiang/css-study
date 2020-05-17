var hasClass = function (node, className) {
  if ('classList' in node && typeof node.classList.contains === 'function') {
    return node.classList.contains(className)
  } else {
    var classes = node.className.split(/\s+/)
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] === className) {
        return true
      }
    }
    return false
  }
}

export default {
  hasClass
}
