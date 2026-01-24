const a = document.getElementById("test-id");
a.addEventListener("click", () => {
  console.log("CLICKED");
});


const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();

const audio = document.querySelector("audio");
audio.addEventListener('play', draw);

const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);

analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

analyser.getByteTimeDomainData(dataArray);
analyser.connect(audioCtx.destination);
const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API 

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
canvasCtx.fillStyle = "rgb(0,0,0)";
canvasCtx.fillRect(0, 0 , WIDTH, HEIGHT);

function draw() {
  requestAnimationFrame(draw);
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.fillStyle = "rgb(0,0,0)";
  canvasCtx.fillRect(0, 0 , WIDTH, HEIGHT);

  analyser.getByteFrequencyData(dataArray);

  console.log("debug ", dataArray[0], Math.floor(dataArray[0]/32));

  for (let i = 0; i < bufferLength; i++) {
    for (let j = 0; j < Math.floor(dataArray[i]/16); j++) {
      canvasCtx.fillStyle = j < 5 ? "rgb(0,255,0)" : 
        j < 10 ? "rgb(255, 255, 0)" :
        "rgb(255,0,0)";
      canvasCtx.fillRect(i*20+5, HEIGHT-j*20-5, 10 , -10);
    }
  }
}