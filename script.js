const sentences = [
    "The cat sat on the mat.",
    "As the sun set over the horizon, the sky turned a brilliant shade of orange, signaling the end of the day.",
    "Can you believe how fast the seasons change in this part of the world?",
    "What an incredible performance that was!",
    "Please complete the assignment by the end of the week.",
    "\"The only limit to our realization of tomorrow is our doubts of today,\" said Franklin D. Roosevelt.",
    "The ancient forest was dense with towering trees, their leaves whispering secrets in the wind.",
    "Once upon a time in a small village, a young girl discovered a magical garden hidden behind an old, crumbling wall.",
    "If you study hard and stay focused, you will pass the exam with flying colors.",
    "The new model is faster and more efficient than the old one.",
    "While the mountains were bathed in sunlight, the valleys remained shrouded in mist.",
    "Imagine a world where technology allows us to communicate with anyone, anywhere, in an instant.",
    "Who wouldn’t want to explore the mysteries of the universe?",
    "In summary, the project was a success due to the team’s dedication and innovative approach.",
    "Time is a river, flowing endlessly towards the vast ocean of the future."
];

const textToTypeElement = document.getElementById('text-to-type');
const typingInput = document.getElementById('typing-input');
const resultArea = document.querySelector('.result-area');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restart-button');

let startTime = null;
let timerRunning = false;
let typingTimeout;

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function startTyping() {
    if (!timerRunning) {
        startTime = new Date().getTime();
        timerRunning = true;
    }
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(calculateResult, 100);
    provideRealTimeFeedback();
}

function stopTyping() {
    if (typingInput.value === textToTypeElement.innerText) {
        calculateResult();
        timerRunning = false;
    }
}

function calculateResult() {
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;
    const typedText = typingInput.value.trim();
    const wordCount = typedText.split(/\s+/).length;
    const wordsPerMinute = (wordCount / timeTaken) * 60;

    const accuracy = calculateAccuracy(typedText);

    resultDisplay.innerHTML = `
        <strong>Time Taken:</strong> ${timeTaken.toFixed(2)} seconds<br>
        <strong>Words Per Minute (WPM):</strong> ${wordsPerMinute.toFixed(2)}<br>
        <strong>Accuracy:</strong> ${accuracy.toFixed(2)}%
    `;
    resultArea.style.display = 'block';
}

function calculateAccuracy(typedText) {
    const typedWords = typedText.split(/\s+/);
    const originalWords = textToTypeElement.innerText.split(/\s+/);
    let correctWords = 0;

    typedWords.forEach((word, index) => {
        if (word === originalWords[index]) {
            correctWords++;
        }
    });

    return (correctWords / originalWords.length) * 100;
}

function provideRealTimeFeedback() {
    const typedWords = typingInput.value.split(/\s+/);
    const originalWords = textToTypeElement.innerText.split(/\s+/);
    const inputWords = typingInput.value.split(' ');

    typingInput.innerHTML = '';

    inputWords.forEach((word, index) => {
        if (word !== originalWords[index]) {
            typingInput.style.borderColor = 'red';
        } else {
            typingInput.style.borderColor = 'green';
        }
    });
}

function initializeTest() {
    textToTypeElement.innerText = getRandomSentence();
    typingInput.value = '';
    resultArea.style.display = 'none';
    typingInput.focus();
    startTime = null;
    timerRunning = false;
    typingInput.style.borderColor = '#ddd';
}

typingInput.addEventListener('input', startTyping);
typingInput.addEventListener('input', stopTyping);

restartButton.addEventListener('click', initializeTest);

initializeTest();
