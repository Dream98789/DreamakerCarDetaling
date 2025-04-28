// 用 Web Audio API 播放音效並同步震動
// 音效檔案名稱與路徑請依實際狀況調整
// 使用: playAudioWithVibration('lambo-start-up-sound-26364.mp3')

function playAudioWithVibration(audioUrl, onEnded) {
  if (!window.AudioContext && !window.webkitAudioContext) {
    alert('您的瀏覽器不支援高擬真音效震動同步功能');
    return;
  }
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var ctx = new AudioContext();
  var analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  var source;
  var gainNode = ctx.createGain();
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  var vibratePattern = [];
  var isPlaying = false;

  fetch(audioUrl)
    .then(function(response) { return response.arrayBuffer(); })
    .then(function(arrayBuffer) {
      return ctx.decodeAudioData(arrayBuffer);
    })
    .then(function(audioBuffer) {
      source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(ctx.destination);
      isPlaying = true;
      source.start();
      var lastVibrate = 0;
      var step = 50; // ms
      var maxDuration = audioBuffer.duration * 1000;
      var currentTime = 0;
      function analyseAndVibrate() {
        if (!isPlaying) return;
        analyser.getByteTimeDomainData(dataArray);
        // 計算本段最大音量
        var max = 0;
        for (var i = 0; i < bufferLength; i++) {
          var v = Math.abs(dataArray[i] - 128);
          if (v > max) max = v;
        }
        // 音量門檻: 震動長度與音量成正比
        var vibrateMs = 0;
        if (max > 12) { // 過門檻才震動
          vibrateMs = Math.min(50 + Math.round(max * 1.2), step);
        }
        vibratePattern.push(vibrateMs, step - vibrateMs);
        currentTime += step;
        if (currentTime < maxDuration) {
          setTimeout(analyseAndVibrate, step);
        } else {
          isPlaying = false;
          // 結束時執行 vibrate
          if (navigator.vibrate) {
            // 過濾掉 0ms 片段
            var filtered = vibratePattern.filter(function(val, idx){ return idx % 2 === 0 ? val > 0 : true; });
            navigator.vibrate(filtered);
          }
          if (onEnded) onEnded();
          ctx.close();
        }
      }
      analyseAndVibrate();
      source.onended = function() {
        isPlaying = false;
      };
    });
}
