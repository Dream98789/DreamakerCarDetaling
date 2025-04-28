// 1. 首頁輪播影片
(function(){
  var videoList = [
    "images/02a6e33d547640c58268727f1dc5d787.mp4",
    "images/050ed6dd61b24ae9b49a23a2c58d0a95.mp4",
    "images/07a6b7f8c4f44519bb4045a2da2472d3.mp4",
    "images/1c1f4359bcfc4d51bc9ccb4eb8b6671c.mp4",
    "images/2FD07601-HEAD LIGHTD12-4735-83C0-90E31C514468.mp4",
    "images/421e6a2d2ad348039612d54c2564113c.mp4",
    "images/4b24177e42e6460091372376ad78b772.mp4",
    "images/55d32823b9574cd8b8fa26802eaf0d95.mp4",
    "images/6d57da0b5d294f11a82c385bfd81d42b.mp4",
    "images/IMG_0548.mp4",
    "images/IMG_1726.mp4",
    "images/a3ce5c56fd0f4bc1b6a4d8a7cfba4ed5.mp4",
    "images/b04e6f42c672476286e862091acfd188.mp4",
    "images/b412be290f0a4260bf8414abde959b06.mp4",
    "images/c1a114746cbb47659771b6d46741f16a.mp4",
    "images/copy_A91945F6-5753-41A1-HEAD LIGHTCF3-4F0A6C557C77.mp4",
    "images/d0c90d6560be4b52a697083ee286e2c3.mp4",
    "images/de54b62fb26b475f968546ac89030d02.mp4",
    "images/df420c42eacd406290975c1ba565ba14.mp4",
    "images/f0d38bcf5aae4f7084b7b827253119f7.mp4",
    "images/f1ea744c8c6f42df916bf60a739d3bcb.mp4",
    "images/f28dcba20b224907914259d5b1b79e0c.mp4",
    "images/f959396a395b45d88903cc5e1293d95b.mp4",
    "images/fc62aacfe6644546a2bdd14c902f08a5.mp4",
    "images/fff596cea980439c8b0affb605200b14.mp4"
  ];
  var currentVideo = 0;
  var videoElement = document.getElementById('carouselVideo');
  function playVideo(index) {
    if (!videoElement) return;
    videoElement.src = videoList[index];
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.autoplay = true;
    videoElement.load();
    videoElement.oncanplay = function() {
      videoElement.style.opacity = 1;
      videoElement.oncanplay = null;
      videoElement.play();
    };
  }
  function nextVideo() {
    currentVideo = (currentVideo + 1) % videoList.length;
    playVideo(currentVideo);
  }
  if (videoElement) {
    videoElement.removeAttribute('controls');
    videoElement.style.opacity = 1;
    playVideo(currentVideo);
    setInterval(nextVideo, 5000);
  }
})();

// 2. Ripple effect for all buttons, links, and full page
// 超級彈的 Dreamaker 3D 彈窗
function showDreamakerPopup() {
  // 動態載入 CSS（只載一次）
  if (!document.getElementById('popup3d-css')) {
    var link = document.createElement('link');
    link.id = 'popup3d-css';
    link.rel = 'stylesheet';
    link.href = 'popup3d.css';
    document.head.appendChild(link);
  }
  // 建立背景
  var bg = document.createElement('div');
  bg.id = 'dreamaker-popup-bg';
  // 建立彈窗本體
  var popup = document.createElement('div');
  popup.id = 'dreamaker-popup';
  // 3D Dreamaker 字
  var text = document.createElement('div');
  text.className = 'dreamaker-3d-text';
  text.textContent = 'Dreamaker';
  // 感謝訊息
  var thanks = document.createElement('div');
  thanks.className = 'dreamaker-popup-thanks';
  thanks.textContent = '感謝您的預約!';
  // 關閉按鈕
  var btn = document.createElement('button');
  btn.id = 'dreamaker-popup-close';
  btn.innerHTML = '&times;';
  btn.onclick = function() {
    if(bg.parentNode) bg.parentNode.removeChild(bg);
  };
  // 組合
  popup.appendChild(btn);
  popup.appendChild(text);
  popup.appendChild(thanks);
  bg.appendChild(popup);
  document.body.appendChild(bg);
}

window.addEventListener('DOMContentLoaded', function() {
  // === 測試震動按鈕 ===
  var testBtn = document.createElement('button');
  testBtn.textContent = '測試手機震動';
  testBtn.style.position = 'fixed';
  testBtn.style.top = '18px';
  testBtn.style.left = '50%';
  testBtn.style.transform = 'translateX(-50%)';
  testBtn.style.zIndex = 99999;
  testBtn.style.background = '#ff9800';
  testBtn.style.color = '#191e2a';
  testBtn.style.padding = '18px 38px';
  testBtn.style.borderRadius = '16px';
  testBtn.style.fontSize = '1.55em';
  testBtn.style.fontWeight = 'bold';
  testBtn.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
  testBtn.style.letterSpacing = '2px';
  testBtn.style.border = '2px solid #fff';
  testBtn.style.opacity = '0.96';
  testBtn.style.cursor = 'pointer';
  testBtn.style.userSelect = 'none';
  testBtn.style.touchAction = 'manipulation';
  testBtn.onclick = function() {
    if (navigator.vibrate) {
      console.log('【測試按鈕】vibrate 即將執行');
      const result = navigator.vibrate([200, 80, 200, 80, 200]);
      console.log('【測試按鈕】vibrate 執行結果:', result);
    } else {
      console.log('【測試按鈕】此裝置不支援 vibrate');
    }
  };
  document.body.appendChild(testBtn);
  // 新硬幣翻轉按鈕動畫
  var coinBtn = document.getElementById('coinFlipBtn');
  if (coinBtn) {
    coinBtn.classList.add('flipping');
    coinBtn.addEventListener('animationend', function() {
      coinBtn.classList.remove('flipping');
    });
    // 專用顯示表單函數，避免重複顯示，並強制 reflow
function showBookingSection(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  var bookingSection = document.getElementById('bookingSection');
  if (bookingSection) {
    // 強制顯示
    bookingSection.style.display = 'block';
    bookingSection.style.visibility = 'visible';
    bookingSection.style.opacity = '1';
    // 強制 reflow
    void bookingSection.offsetHeight;
    // 確保動畫 class 不影響顯示
    bookingSection.classList.remove('hide');
    bookingSection.scrollIntoView({behavior:'smooth'});
    console.log('[VVIP] Booking section shown');
  }
}
// 綁定 click、touchend、pointerup
['click','touchend','pointerup'].forEach(function(evt){
  coinBtn.addEventListener(evt, function(e) {
    coinBtn.classList.remove('flipping');
    void coinBtn.offsetWidth;
    coinBtn.classList.add('flipping');
    showBookingSection(e);
  }, {passive:false});
});
  }

  // Ripple for buttons, links
  var rippleEls = document.querySelectorAll('button, input[type="submit"], a');
  for (var i = 0; i < rippleEls.length; i++) {
    rippleEls[i].addEventListener('click', function(e) {
      if (e.button !== 0) return;
      // 僅產生ripple效果，不播放音效
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      var rect = this.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(function(){ if(ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 1000);
    });
  }
  // Ripple for full page
  document.body.addEventListener('click', function(e) {
    if (e.target.closest('button, input[type="submit"], a')) return;
    var ripple = document.createElement('span');
    ripple.className = 'ripple page-ripple';
    var size = Math.max(window.innerWidth, window.innerHeight) * 0.7;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - size / 2) + 'px';
    ripple.style.top = (e.clientY - size / 2) + 'px';
    document.body.appendChild(ripple);
    setTimeout(function(){ if(ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 1000);
  });

  // 3. 黑幕特效與音效（舊版瀏覽器兼容）
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault(); // 先阻止預設送出
      var blackout = document.getElementById('blackout-mask');
      if (blackout) {
        blackout.className = 'active head-lighting';
        // 動態生成光帶
        var light = document.createElement('div');
        light.className = 'head-light';
        blackout.appendChild(light);
        // 動態生成兩個亮點
        var dotL = document.createElement('div');
        dotL.className = 'head-light-dot left';
        var dotR = document.createElement('div');
        dotR.className = 'head-light-dot right';
        blackout.appendChild(dotL);
        blackout.appendChild(dotR);
        // 0.2秒後啟動動畫
        setTimeout(function(){ blackout.classList.add('light-animate'); blackout.classList.add('head-lighting'); }, 200);
        // 0.9秒後光帶和亮點淡出，黑幕恢復黑色
        setTimeout(function(){ blackout.classList.add('light-fadeout'); blackout.classList.remove('head-lighting'); }, 900);
        // 1.3秒後黑幕淡出
        setTimeout(function(){ blackout.className = 'fadeout'; }, 1300);
        // 2.1秒後全部移除class和內容
        setTimeout(function(){ 
          blackout.className = '';
          blackout.innerHTML = '';
        }, 2100);
      }
      // 僅在送出預約時播放音效
      // 立即觸發手機震動，確保一定有感覺
      if (navigator.vibrate) {
        console.log('vibrate 即將執行');
        const result = navigator.vibrate([100, 60, 120, 60, 100]);
        console.log('vibrate 執行結果:', result);
      } else {
        console.log('此裝置不支援 vibrate');
      }
      // 使用 Web Audio API 播放音效並同步震動（高擬真）
      playAudioWithVibration('lambo-start-up-sound-26364.mp3');
      // 光條展開後才顯示送出成功訊息與寄信
      setTimeout(function(){
        // 收集表單資料
        var formData = {
          name: bookingForm.name.value,
          phone: bookingForm.phone.value,
          date: bookingForm.date.value,
          time: bookingForm.time.value,
          service: bookingForm.service.value,
          note: bookingForm.note.value
        };
        var bookingMsg = document.getElementById('bookingMsg');
        if (bookingMsg) bookingMsg.textContent = '預約送出中...';
        // EmailJS 寄信功能
        emailjs.send(
          'service_lfsjrh9', // 用戶提供的 service_id
          'template_lgxxahm', // 用戶提供的 template_id
          formData,
          'djoCxb0sRajSB5mxC' // 用戶提供的 user_id
        ).then(function(response) {
          if (bookingMsg) bookingMsg.textContent = '預約已送出！我們將盡快與您聯絡。';
          bookingForm.reset();
          showDreamakerPopup();
          setTimeout(function(){
            if (bookingMsg) bookingMsg.textContent = '';
          }, 4000);
        }, function(error) {
          if (bookingMsg) bookingMsg.textContent = '送出失敗，請稍後再試或聯絡我們！';
          setTimeout(function(){
            if (bookingMsg) bookingMsg.textContent = '';
          }, 4000);
        });
      }, 900);
    });
  }
});