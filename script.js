const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const data = [
  {
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80',
    text: "I'm Thirsty"
  },
  {
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    text: "I'm Hungry"
  },
  {
  image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
  text: "I'm Tired"
  },
  {
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400&q=80',
    text: "I'm Hurt"
  },
  {
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&q=80',
    text: "I'm Happy"
  },
  {
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
    text: "I'm Angry"
  },
  {
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80',
    text: "I'm Sad"
  },
  {
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80',
    text: "I'm Scared"
  },
  {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
    text: 'I Want To Go Outside'
  },
  {
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80',
    text: 'I Want To Go Home'
  },
  {
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80',
    text: 'I Want To Go To School'
  },
  {
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80',
    text: 'I Want To Go To Grandmas'
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
