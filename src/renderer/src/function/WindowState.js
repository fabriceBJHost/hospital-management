export const isMaximized = () => {
  return window.outerWidth == screen.availWidth && window.outerHeight == screen.availHeight
}

export const isNotMaximized = () => {
  return !isMaximized()
}
