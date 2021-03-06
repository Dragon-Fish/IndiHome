// Import html
import html from './index.html'

// Import styles
import './static/style.styl'

// Main
!((window, $) => {
  // Set HTML
  $('#app').html('').append(html)

  // Init BGM
  const bgm = new Audio(
    'https://cdn.jsdelivr.net/gh/Dragon-Fish/IndiHome@main/asset/bgm.mp3'
  )
  bgm.load()
  bgm.addEventListener('error', () => {
    $('#startBtn').text('ERROR!')
  })
  bgm.addEventListener('canplay', () => {
    console.log('Music ready!')
    $('#startBtn').removeAttr('disabled').text('PLAY').click(init)
  })

  function init() {
    // Switch elements
    $('#showArea').show()
    $('#beforeArea').hide()

    // Set scale
    function resizeApp() {
      const $app = $('#showArea')
      const { clientWidth, clientHeight } = document.body
      const widthRatio = clientWidth / ($app.outerWidth(true) + 20)
      const heightRatio = clientHeight / ($app.outerHeight(true) + 20)
      const finalScale = widthRatio > heightRatio ? heightRatio : widthRatio
      $app.css(
        'transform',
        `translateX(-50%) translateY(-50%) scale(${finalScale})`
      )
    }
    resizeApp()
    $(window).on('resize', resizeApp)

    // Start BGM
    bgm.play()

    // Set Timer
    const startTime = new Date().getTime()
    const $timer = $('<div>', { title: 'Debug Timer', id: 'debugTimer' })
    $timer.appendTo('footer')
    setInterval(() => {
      let now = new Date().getTime()
      let timePassed = now - startTime
      $timer.text(`${(timePassed / 1000).toFixed(2)} s`)
    }, 50)

    // Set Character
    // let $charaArea = $('#charaArea')
    setTimeout(() => {
      setInterval(() => {
        let $app = $('#app')
        let now = new Date().getTime()
        let timePassed = now - startTime
        let moreTime = ((timePassed / 1000) % 30).toFixed(2)
        if (moreTime < 15) {
          $app
            .removeClass('show')
            .removeClass('chara2')
            .addClass('before')
            .addClass('chara1')
          if (moreTime > 0.6) {
            $app.addClass('show').removeClass('before')
          }
        } else {
          $app
            .removeClass('show')
            .removeClass('chara1')
            .addClass('before')
            .addClass('chara2')
          if (moreTime - 15 > 0.6) {
            $app.addClass('show').removeClass('before')
          }
        }
      }, 100)
    }, 60 * 1000)
  }
})(window, jQuery)
