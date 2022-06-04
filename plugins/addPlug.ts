export default function () {
  ;(function (ac) {
    const d = document,
      s = 'script',
      id = 'adplugg-adjs'
    let js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) return
    js = d.createElement(s)
    js.id = id
    js.async = true
    js.src = '//www.adplugg.com/serve/' + ac + '/js/1.1/ad.js'
    if (fjs.parentNode) fjs.parentNode.insertBefore(js, fjs)
  })('A48217487')
}
