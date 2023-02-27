var audio = document.querySelector('audio')

window.onload = function () {
  var main = document.querySelector('main')
  var song_name = document.querySelector('.songName')
  var author = document.querySelector('.author')
  var pre = document.querySelector('.previous')
  var control = document.querySelector('.control')
  var next = document.querySelector('.next')
  var change = document.querySelector('.change')
  var showTime = document.querySelector('.showTime')
  var progress_bar = document.querySelector('.progress_bar')
  var time_bar = document.querySelector('.time_bar')
  var time_dot = document.querySelector('.time_dot')
  var rotate_img = document.querySelector('.rotate_img')
  var i = 0;
  var flag = true;
  var musicList = [
    {
      "music": "你在终点等我",
      "author": '王菲 ',
      "src": './audio/王菲.mp3',
      "cover": "./image/王菲.JPG"
    },
    {
      "music": "STAY",
      "author": "Justin Bieber",
      "src": "./audio/Stay.mp3",
      "cover": "./image/STAY.JPG"
    },
    {
      "music": "Battle Symphony",
      "author": "Linkin Park",
      "src": "./audio/Linkin Park - Battle Symphony.mp3",
      "cover": "./image/Linkin.JPG"
    },
    {
      "music": "In My Blood",
      "author": "Justin Bieber",
      "src": "./audio/In My Blood.mp3",
      "cover": "./image/changes.jpg"
    },
    {
      "music": "美春の告白",
      "author": "菅野祐悟",
      "src": "./audio/菅野祐悟 - 美春の告白.mp3",
      "cover": "./image/1.JPG"
    },
    {
      "music": " 森閑のまえは",
      "author": "やなぎなぎ",
      "src": "./audio/やなぎなぎ - 森閑のまえは.mp3",
      "cover": "./image/5.JPG"
    },
    {
      "music": "歩いても 歩いても",
      "author": "ゴンチチ",
      "src": './audio/ゴンチチ - 歩いても 歩いても.mp3',
      "cover": "./image/4.JPG"
    },
    {
      "music": "好きでした",
      "author": '横山克',
      "src": './audio/横山克 - 好きでした。.mp3',
      "cover": "./image/2.JPG"
    },
    {
      "music": "また君に恋をする",
      "author": '北澤伸一郎 ',
      "src": './audio/北澤伸一郎 - また君に恋をする.mp3',
      "cover": "./image/3.JPG"
    }


  ]

  //播放功能函数
  function playMusic() {
    author.innerHTML = musicList[i].author
    audio.src = musicList[i].src
    song_name.innerHTML = musicList[i].music
    rotate_img.src = musicList[i].cover
    audio.play()
  }

  // 让按钮图片变成暂停 （播放时使用）
  function toStop() {
    change.src = "./image/暂停.svg"
    change.style.width = '51px'
    flag = false
  }

  // 让按钮图片变成播放  （暂停时使用）
  function toContinue() {
    change.src = "./image/播放.svg"
    change.style.width = '49px'
    flag = true
  }

  // 控制点击播放和暂停
  control.addEventListener('click', () => {
    if (flag) {
      toStop()
      return audio.currentTime ? audio.play() : playMusic()
    } else {
      audio.pause()
      toContinue()
    }
  })

  // 一首歌播放完毕再播放下一首
  audio.onended = function () {
    if (i < musicList.length - 1) {
      i += 1;
      playMusic()
    } else {
      i = 0;
      playMusic()
    }
  }

  //上一首功能
  pre.addEventListener('click', function () {
    toStop()
    if (i == 0) {
      i = musicList.length - 1
      playMusic()
    } else {
      i -= 1
      playMusic()
    }
  })

  //下一首功能
  next.addEventListener('click', function () {
    toStop()
    if (i < musicList.length - 1) {
      i += 1;
      playMusic()
    } else {
      i = 0;
      playMusic()
    }
  })

  //显示播放时间
  showTime.innerHTML = "00:00 / " + format(audio.duration)
  //格式化时间显示
  function format(time) {
    var minute = Math.floor(time / 60)
    var secound = Math.floor(time % 60)
    return zeroPad(minute) + ':' + zeroPad(secound)
  }
  function zeroPad(time) {
    if (time <= 9) {
      return "0" + time
    } else {
      return time
    }
  }

  //实时改变播放时间
  audio.ontimeupdate = function () {
    showTime.innerHTML = format(audio.currentTime) + ' / ' + format(audio.duration)
    time_bar.style.left = ((audio.currentTime / audio.duration) * 1200 - 1200) + 'px'
    time_dot.style.left = ((audio.currentTime / audio.duration) * 1200 - 7) + 'px'
  }

  //在播放的时候，转动专辑封面
  audio.onplaying = function () {
    rotate_img.style.animationPlayState = 'running'
  }
  audio.onpause = function () {
    rotate_img.style.animationPlayState = 'paused'
  }

  //阻止图像默认拖动
  rotate_img.addEventListener('mousedown', function (e) {
    e.preventDefault()
  })

  //点击进度条，控制播放进度
  progress_bar.addEventListener('click', function (e) {
    audio.currentTime = (e.clientX - main.offsetLeft) / 1200 * audio.duration;
    // audio.currentTime = e.offsetX / 900 * audio.duration;
  }, true)
  time_bar.addEventListener('click', function (e) {
    audio.currentTime = (e.clientX - main.offsetLeft) / 1200 * audio.duration
    // audio.currentTime = (e.offsetX + parseInt(time_bar.style.left)) / 900 * audio.duration
    e.stopPropagation()
    e.stopImmediatePropagation()
  })

  //mousemove功能
  function move(e) {
    window.getSelection().removeAllRanges()
    //鼠标距离文档的x距离 - 播放器页面距离文档的x距离 = 鼠标距离播放器边缘的距离
    audio.currentTime = (e.clientX - main.offsetLeft) / 1200 * audio.duration
    
  }

  //拖动进度条功能
  time_dot.addEventListener('mousedown', function () {
    time_bar.style.transition = 'none'
    time_dot.style.transition = 'none'
    audio.pause()
    main.addEventListener('mousemove', move)
    
    
    main.addEventListener('mouseup', function () {
      audio.play()
      this.removeEventListener('mousemove', move)
      time_bar.style.transition = '.5s all'
      time_dot.style.transition = '.5s all'
    })
  })

  //点击喇叭音乐静音功能
  var voice_img = document.querySelector('.voice_img')
  var voice_flag = true;
  voice_img.addEventListener('click', function() {
    if(voice_flag) {
      voice_img.src = './image/声音静音.svg'
      voice_flag = false
      audio.muted = true;
    }else {
      voice_flag = true
      voice_img.src = './image/音量.svg'
      audio.muted = false;

    }
  })

  // 按下空格控制播放暂停
  window.addEventListener('keyup',function(e) {
    if(e.keycode = 49) {
      change.click()
    }
  })
}