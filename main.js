// Dreamaker Hero Banner 輪播影片
const videoList = [
    "images/02a6e33d547640c58268727f1dc5d787.mp4",
    "images/050ed6dd61b24ae9b49a23a2c58d0a95.mp4",
    "images/07a6b7f8c4f44519bb4045a2da2472d3.mp4",
    "images/1c1f4359bcfc4d51bc9ccb4eb8b6671c.mp4",
    "images/2FD07601-BD12-4735-83C0-90E31C514468.mp4",
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
    "images/copy_A91945F6-5753-41A1-BCF3-4F0A6C557C77.mp4",
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
let currentVideo = 0;
const videoElement = document.getElementById('carouselVideo');

function glitchTransition(callback) {
    videoElement.classList.add('glitch');
    setTimeout(() => {
        videoElement.classList.remove('glitch');
        callback();
    }, 450); // glitch動畫長度
}

function playVideo(index) {
    videoElement.src = videoList[index];
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.autoplay = true;
    videoElement.load();
    videoElement.oncanplay = () => {
        videoElement.style.opacity = 1;
        videoElement.oncanplay = null;
        videoElement.play();
    };
}

function nextVideo() {
    glitchTransition(() => {
        currentVideo = (currentVideo + 1) % videoList.length;
        playVideo(currentVideo);
    });
}

// 初始化
if (videoElement) {
    videoElement.removeAttribute('controls');
    videoElement.style.opacity = 1;
    playVideo(currentVideo);
    setInterval(nextVideo, 5000); // 每 5 秒切換
}

// Ripple effect for all buttons, links, and full page (by Cascade)
// 升級：根據音量峰值分析震動節奏
function playRippleSoundAndVibrate() {
  const audio = document.getElementById('ripple-audio');
  if (audio) {
    audio.volume = 1;
    audio.currentTime = 0;
    audio.play();
    // 使用 Web Audio API 分析音量峰值，動態產生震動 pattern
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      fetch(audio.src)
        .then(res => res.arrayBuffer())
        .then(buf => ctx.decodeAudioData(buf))
        .then(decoded => {
          const channel = decoded.numberOfChannels > 1 ? decoded.getChannelData(0) : decoded.getChannelData(0);
          const duration = decoded.duration;
          const interval = 50; // 每 50ms 分析一次
          const sampleRate = decoded.sampleRate;
          const samplesPerInterval = Math.floor(sampleRate * interval / 1000);
          const pattern = [];
          let lastWasVibrate = false;
          for (let i = 0; i < channel.length; i += samplesPerInterval) {
            let max = 0;
            for (let j = i; j < i + samplesPerInterval && j < channel.length; j++) {
              max = Math.max(max, Math.abs(channel[j]));
            }
            // 門檻值（可微調，越小越敏感）
            if (max > 0.13) {
              pattern.push(interval); // 震動 interval ms
              lastWasVibrate = true;
            } else {
              if (lastWasVibrate) {
                pattern.push(interval); // 停止 interval ms
                lastWasVibrate = false;
              } else {
                // 連續靜音可合併
                if (pattern.length > 0) pattern[pattern.length - 1] += interval;
                else pattern.push(interval);
              }
            }
          }
          if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(pattern);
          }
        });
    } catch (e) {
      // 若失敗則 fallback 用舊的 pattern
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([80, 70, 80, 70, 80, 70, 80, 70, 80, 70]);
      }
    }
  }
}


window.addEventListener('DOMContentLoaded', function() {
  // 按鈕與連結原本的 ripple
  [...document.querySelectorAll('button, input[type="submit"], a')].forEach(el => {
    el.addEventListener('click', function(e) {
      if (e.button !== 0) return;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
      playRippleSoundAndVibrate();
    });
  });
  // 全頁 ripple
  document.body.addEventListener('click', function(e) {
    // 避免點擊到按鈕/連結時重複
    if (e.target.closest('button, input[type="submit"], a')) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple page-ripple';
    const size = Math.max(window.innerWidth, window.innerHeight) * 0.7;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - size / 2) + 'px';
    ripple.style.top = (e.clientY - size / 2) + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
    playRippleSoundAndVibrate();
  });
});

// --- 預約日期禁用星期六 ---
const dateInput = document.getElementById('date');
if (dateInput) {
    dateInput.addEventListener('input', function() {
        const val = this.value;
        if (val) {
            const day = new Date(val).getDay();
            if (day === 6) {
                this.value = '';
                alert('星期六不開放預約，請選擇其他日期！');
            }
        }
    });
    // 禁用日期選擇器的星期六（僅部分瀏覽器支援）
    dateInput.addEventListener('keydown', function(e) {
        // 防止手動輸入星期六
        setTimeout(() => {
            const val = this.value;
            if (val) {
                const day = new Date(val).getDay();
                if (day === 6) {
                    this.value = '';
                    alert('星期六不開放預約，請選擇其他日期！');
                }
            }
        }, 10);
    });
}
// --- EmailJS 寄送預約 ---
const bookingForm = document.getElementById('bookingForm');
const bookingMsg = document.getElementById('bookingMsg');
const serviceId = 'service_lfsjrh9';
const templateId = 'template_lgxxahm'; // 已填入你的 Template ID
const publicKey = 'djoCxb0sRajSB5mxC';   // 已填入你的 Public Key

// 電話顯示/隱藏功能
const phoneInput = document.getElementById('phone');
const togglePhoneBtn = document.getElementById('togglePhone');
const eyeIcon = document.getElementById('eyeIcon');
if (togglePhoneBtn && phoneInput) {
    togglePhoneBtn.addEventListener('click', function() {
        if (phoneInput.type === 'password') {
            phoneInput.type = 'tel';
            eyeIcon.textContent = '🙈';
        } else {
            phoneInput.type = 'password';
            eyeIcon.textContent = '👁️';
        }
    });
}

if (bookingForm) {
    emailjs.init(publicKey);
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: bookingForm.name.value,
            phone: bookingForm.phone.value,
            date: bookingForm.date.value,
            time: bookingForm.time.value,
            service: bookingForm.service.value,
            note: bookingForm.note.value
        };

        // 產生 Google Calendar 事件連結（根據選擇的時段）
        function pad(n) { return n < 10 ? '0' + n : n; }
        const dt = new Date(formData.date);
        const yyyy = dt.getFullYear();
        const mm = pad(dt.getMonth() + 1);
        const dd = pad(dt.getDate());
        // 根據選擇的時段決定開始與結束時間
        let startHour = '10', endHour = '11';
        if (formData.time === '早8:00~12:00') {
          startHour = '08'; endHour = '12';
        } else if (formData.time === '中13:00~17:00') {
          startHour = '13'; endHour = '17';
        } else if (formData.time === '晚18:00~22:00') {
          startHour = '18'; endHour = '22';
        }
        const start = `${yyyy}${mm}${dd}T${startHour}0000`;
        const end = `${yyyy}${mm}${dd}T${endHour}0000`;
        const details =
          '服務方案：' + formData.service + '%0A' +
          '姓名：' + formData.name + '%0A' +
          '電話：' + formData.phone + '%0A' +
          '預約時段：' + formData.time + '%0A' +
          '備註：' + formData.note;
        const gcalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Dreamaker汽車美容預約&dates=${start}/${end}&details=${details}&location=Dreamaker汽車美容&sf=true&output=xml`;
        formData.gcal_link = gcalUrl;

        // 禁用按鈕避免重複送出
        const btn = bookingForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        bookingMsg.textContent = '預約送出中...';
        emailjs.send(serviceId, templateId, formData)
            .then(function(response) {
                bookingMsg.textContent = '預約已送出！我們將盡快與您聯絡。';
                bookingForm.reset();
            }, function(error) {
                bookingMsg.textContent = '預約送出失敗，請稍後再試。';
            })
            .finally(() => {
                btn.disabled = false;
                setTimeout(() => { bookingMsg.textContent = ''; }, 5000);
            });
    });
}
