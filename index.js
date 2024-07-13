// Get the canvas element and its context
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

// Initial wave parameters
let frequency = 1; // Hz
let amplitude = 100;
let phase = 0;
let waveSpeed = 0.02; // Controls how fast the wave moves

// Variable to track animation state
let animationId = null;
let isWaveRunning = false;

// Variable to track the last logged parameters
let lastLoggedFrequency = frequency;
let lastLoggedAmplitude = amplitude;
let lastLoggedPhase = phase;

// Function to log wave parameters with debouncing (removed for speed dial)

function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let x = 0; x < canvas.width; x++) {
        let y = amplitude * Math.sin((2 * Math.PI * frequency * x / canvas.width) + phase) + canvas.height / 2;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#3498db';
    ctx.stroke();

    // Continue animation if wave is running
    if (isWaveRunning) {
        phase += waveSpeed; // Move the wave forward
        animationId = requestAnimationFrame(drawWave);
    }
}

function updateWave() {
    const newFrequency = parseInt(document.getElementById('frequency').value);
    if (newFrequency !== frequency) {
        frequency = newFrequency;
        drawWave();
    }
}

function startWave() {
    if (!isWaveRunning) {
        isWaveRunning = true;
        drawWave();
    }
}

function stopWave() {
    if (isWaveRunning) {
        cancelAnimationFrame(animationId);
        isWaveRunning = false;
    }
}

function changeWaveSpeed(value) {
    waveSpeed = parseFloat(value);
    document.getElementById('speedValue').textContent = value;
}

// Initial draw
drawWave();