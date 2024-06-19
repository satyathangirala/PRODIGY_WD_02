/* script.js */
let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('lapsList');

startStopButton.addEventListener('click', () => {
    if (!running) {
        startTimer();
    } else {
        stopTimer();
    }
});

resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    running = true;
    startStopButton.textContent = 'Stop';
    resetButton.disabled = false;
    lapButton.disabled = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    running = false;
    startStopButton.textContent = 'Start';
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapsList.innerHTML = '';
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}
