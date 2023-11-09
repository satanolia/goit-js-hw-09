const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId;


startBtn.addEventListener('click', ()=>{
    intervalId = setInterval(()=>{
        const randomColor = getRandomHexColor();
        document.body.style.backgroundColor = randomColor;
    }, 1000);
    startBtn.disabled = true
})


stopBtn.addEventListener('click', ()=>{
    clearInterval(intervalId);
    startBtn.disabled = false
})


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

