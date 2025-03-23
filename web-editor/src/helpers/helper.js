export const helper = {
  openLinkInNewTab(link) {
    if (!link) return
    const url = link.getAttribute('href')

    if (url) window.open(url, '_blank')
  }
}
