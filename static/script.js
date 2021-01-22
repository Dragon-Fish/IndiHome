!((window, $) => {
  // Start button
  $('#startBtn').click(init)

  function init() {
    // Switch elements
    $('#showArea').show()
    $('#beforeArea').hide()

    // init bgm
    const bgm = new Audio('asset/bgm.mp3')
    bgm.load()
    bgm.play()

    // Set Timer
    window.showTime = 0
    setInterval(function() {
      window.showTime += 10
    }, 10)
    const $timer = $('<div>', { title: 'Debug Timer', id: 'debugTimer' })
    $timer.appendTo('footer')
    setInterval(() => {
      $timer.text(`${(window.showTime / 1000).toFixed(2)} s`)
    }, 50)

    // Set Character
    $charaArea = $('#charaArea')
    $charaArea.find('#chara1').show()
  }
})(window, jQuery)