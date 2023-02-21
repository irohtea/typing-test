const text = [
   "Nature is full of wonder and beauty. From the towering trees in a dense forest to the delicate petals of a flower, the natural world is a never-ending source of inspiration. Whether you're a hiker or a nature lover, there's always something new to discover.",
  "Programming has become an essential skill in today's technology-driven world. From web development to machine learning, the possibilities are endless. With so many resources available online, it's never been easier to get started with programming.",
  "Did you know that the shortest war in history lasted just 38 minutes? It was fought between Britain and Zanzibar in 1896. Despite the short duration, around 500 people lost their lives. History is full of fascinating facts and stories like this.",
  "Animals are some of the most amazing creatures on the planet. From the smallest insect to the largest mammal, every animal has unique traits and behaviors that make it special. Whether you're a cat person or a dog person, there's always something to learn about the animal kingdom.",
  "Cities are centers of culture, innovation, and commerce. From the skyscrapers of New York to the canals of Venice, every city has its own unique character and charm. Whether you're a city dweller or a country person, there's always something to discover in the world's great metropolises.",
  "Space is the final frontier. From the early days of space exploration to the latest discoveries from NASA and other space agencies, we've learned a lot about our place in the universe. With new technologies and missions on the horizon, the future of space exploration looks brighter than ever.",
  "Programming can be both challenging and rewarding. From learning the basics of HTML and CSS to building complex web applications, there's always a new skill to master. With the right resources and a lot of practice, anyone can become a skilled programmer.",
  "Did you know that the tallest waterfall in the world is Angel Falls in Venezuela? It's over 3,200 feet tall! The natural world is full of incredible wonders like this. Whether you're a traveler or a nature lover, there's always something new to discover.",
  "Nuxt 3 is a modern rewrite of the Nuxt framework based on Vite, Vue3, and Nitro with first-class TypeScript support and the result of more than two years of research, community feedback, innovation, and experiment to make a pleasant full-stack Developer Experience for Vue development to everyone.",

]

const typingText = document.querySelector('.typing-text')
const inputText = document.querySelector('.input__text')
const time = document.querySelector('.stats__time')
const mistakesTag = document.querySelector('.stats__mistakes')
const wpmTag = document.querySelector('.stats__wpm')
const cpmTag = document.querySelector('.stats__cpm')
const restart = document.querySelector('.restart-btn')

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = false;
let charIndex = 0;
let mistakes = 0;

function loadTestText() {
   const random = Math.floor(Math.random() * text.length)
   typingText.innerHTML = ''
   text[random].split('').map(char => {
      let span = `<span>${char}</span>`
      typingText.innerHTML += span
   })
   
   typingText.querySelectorAll('span')[0].classList.add('active')
   document.addEventListener('keydown', () => inputText.focus())
   inputText.addEventListener('click', () => inputText.focus())
}

function typingTest() {
   let chars = typingText.querySelectorAll('span')
   let typedChar = inputText.value.split('')[charIndex]
   
   if(charIndex >= chars.length || timeLeft < 0) {
      clearInterval(timer);
      inputText.value = '';
      return;
   }

   if(!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
   }

   if(typedChar == null && charIndex >= 0) {
      charIndex--;
      if(chars[charIndex].classList.contains('incorrect')) {
         mistakes--;
      }
      chars[charIndex].classList.remove('correct', 'incorrect');
   } else if (typedChar !== null) {
      if(chars[charIndex].innerText === typedChar) {
         chars[charIndex].classList.add('correct');
      } else {
         mistakes++;
         chars[charIndex].classList.add('incorrect');
      }
      charIndex++;
   }

   chars.forEach(span => span.classList.remove('active'));
   chars[charIndex].classList.add('active');

   let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
   wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

   mistakesTag.innerText = mistakes;
   wpmTag.innerText = wpm;
   cpmTag.innerText = charIndex - mistakes;
}
function initTimer() {
   console.log('timer working')
   if (timeLeft > 0) {
       timeLeft--;
       time.innerText = timeLeft
       let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60)
       wpmTag.innerText = wpm
   } else {
       clearInterval(timer)
   }
}
function restartTest() {
   loadTestText()
   clearInterval(timer)
   timeLeft = maxTime
   charIndex = mistakes = isTyping = 0
   inputText.value = ''
   time.innerText = timeLeft
   wpmTag.innerText = 0
   mistakesTag.innerText = 0
   cpmTag.innerText = 0
}
loadTestText()
inputText.addEventListener('input', typingTest)
restart.addEventListener('click', restartTest)

