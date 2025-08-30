const wordsWithHints = {
  // 🟢 Programming Related
  javascript: "A popular programming language mainly used for web development",
  typescript: "A superset of JavaScript with static typing",
  python: "A beginner-friendly language known for AI & data science",
  java: "A widely used OOP language, famous for Android development",
  php: "A scripting language used for web development",
  ruby: "Language used in Ruby on Rails framework",
  kotlin: "Google’s preferred language for Android apps",
  swift: "Apple's official language for iOS development",
  react: "A popular JavaScript library for building UIs",
  angular: "A TypeScript-based web app framework",
  vue: "A progressive JavaScript framework for UI",
  node: "JavaScript runtime environment",
  express: "A Node.js framework for backend apps",
  mongodb: "NoSQL database commonly used with Node.js",
  frontend: "Part of a website visible to users",
  backend: "Server-side logic of an app",
  developer: "Someone who writes and builds software",
  fullstack: "Developer skilled in both frontend & backend",
  framework: "A base structure for building apps",
  database: "Stores structured or unstructured data",
  compiler: "Translates code into machine language",
  algorithm: "Step-by-step process to solve problems",
  function: "Reusable block of code",
  variable: "A container for storing data",
  object: "Collection of properties and methods",
  class: "Blueprint for creating objects",
  inheritance: "OOP concept to reuse parent class properties",
  polymorphism: "OOP feature where one function behaves differently",

  // 🍎 Fruits
  mango: "King of fruits, tropical and sweet",
  banana: "Yellow fruit, good source of potassium",
  apple: "Keeps the doctor away 😉",
  orange: "Citrus fruit, rich in vitamin C",
  grapes: "Small round fruit, comes in green or purple",
  papaya: "Orange tropical fruit, good for digestion",
  guava: "Green fruit rich in vitamin C",
  pineapple: "Tropical fruit with a spiky shell",
  watermelon: "Juicy red fruit, perfect for summer",
  strawberry: "Small red fruit with seeds outside",
  cherry: "Small red fruit often used on cakes",
  blueberry: "Tiny blue fruit, high in antioxidants",
  kiwi: "Brown outside, green inside, tangy taste",
  pomegranate: "Fruit with many edible red seeds",

  // 🦁 Animals
  tiger: "Largest cat species, orange with black stripes",
  lion: "King of the jungle",
  elephant: "Largest land animal with a trunk",
  zebra: "Striped black-and-white animal",
  panda: "Cute black & white bear",
  giraffe: "Tallest animal with a long neck",
  cheetah: "Fastest land animal",
  kangaroo: "Australian marsupial that hops",
  monkey: "Playful animal, loves bananas",
  rabbit: "Small furry animal with long ears",
  bear: "Big furry animal, loves honey",
  dolphin: "Smart marine mammal",
  whale: "Largest mammal in the ocean",
  shark: "Predatory fish with sharp teeth",
  penguin: "Flightless bird that swims",

  // 🌎 Countries
  india: "Country famous for Taj Mahal & spices",
  china: "Most populated country in the world",
  japan: "Land of the rising sun & sushi",
  nepal: "Home of Mount Everest",
  bhutan: "Known for Gross National Happiness",
  brazil: "Famous for football & Amazon rainforest",
  argentina: "Land of tango & Messi",
  canada: "Country with maple syrup & Niagara Falls",
  australia: "Known for kangaroos & Sydney Opera House",
  france: "Famous for Eiffel Tower & croissants",
  germany: "Home of BMW, Mercedes, and Oktoberfest",
  england: "Big Ben & London Bridge are here",
  russia: "Largest country by land area",
  italy: "Famous for pizza, pasta, and Rome",
  spain: "Known for flamenco dance & Barcelona",
  sweden: "Land of IKEA and Vikings",

  // 🏏 Sports
  football: "Most popular sport worldwide",
  cricket: "Bat-and-ball game, especially famous in India",
  hockey: "Played on ice or field with sticks",
  tennis: "Played with racket and ball, Wimbledon is famous",
  badminton: "Played with shuttlecock and rackets",
  volleyball: "Popular beach sport",
  basketball: "Michael Jordan made it famous",
  baseball: "America's favorite pastime",
  golf: "Played with clubs and a small ball",
  swimming: "Sport in water, Olympic favorite",
  kabaddi: "Traditional Indian tag sport",

  // 🎬 Movies
  avatar: "Highest-grossing sci-fi movie by James Cameron",
  avengers: "Marvel superheroes unite",
  batman: "Dark Knight from Gotham",
  superman: "Man of Steel",
  spiderman: "Friendly neighborhood hero",
  ironman: "Tony Stark saves the world",
  inception: "Dream within a dream thriller",
  titanic: "Famous ship disaster love story",
  joker: "Famous DC villain",
  frozen: "Disney animated movie with Elsa & Anna",
  moana: "Disney’s Polynesian adventure",
  matrix: "Neo discovers the truth about reality",

  // 🔤 Common Words
  school: "Place where kids learn",
  college: "Higher education after school",
  garden: "Area with plants and flowers",
  river: "Natural flowing water body",
  mountain: "High landform, great for hiking",
  forest: "Home to trees and wildlife",
  desert: "Dry land with little rainfall",
  island: "Land surrounded by water",
  beach: "Sandy area near the ocean",
  market: "Place to buy and sell goods",
  temple: "Place of worship",
  village: "Small rural settlement",
  computer: "Machine that processes data",
  mobile: "Portable phone",
  internet: "Global network connecting people",
  bicycle: "Two-wheeled human-powered vehicle",
  rocket: "Used for space travel",
  space: "Vast universe beyond Earth",
  galaxy: "Collection of stars and planets",
};

// Extract only the keys (words)
const words = Object.keys(wordsWithHints);

const wordElement = document.getElementById("word");
const keyboard = document.getElementById("keyboard");
const hangmanImg = document.getElementById("hangman-img");
const livesCount = document.getElementById("lives-count");
const message = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again");
const newGameBtn = document.getElementById("new-game");
const restartGameBtn = document.getElementById("restart-game");
const quitGameBtn = document.getElementById("quit-game");
const hintElement = document.getElementById("hint"); // NEW ELEMENT

let selectedWord = "";
let correctLetters = [];
let wrongGuesses = 0;
const maxLives = 6;
let currentWord = "";

// Initialize game
function initGame(newWord = true) {
  selectedWord = newWord
    ? words[Math.floor(Math.random() * words.length)]
    : currentWord;
  currentWord = selectedWord;
  correctLetters = [];
  wrongGuesses = 0;
  livesCount.textContent = maxLives;
  hangmanImg.src = `images/0.png`;
  message.textContent = "";
  hintElement.textContent = `💡 Hint: ${wordsWithHints[selectedWord]}`; // SHOW HINT
  playAgainBtn.style.display = "none";
  displayWord();
  createKeyboard();
}

// Display word
function displayWord() {
  wordElement.textContent = selectedWord
    .split("")
    .map((letter) => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

// Create on-screen keyboard
function createKeyboard() {
  keyboard.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const button = document.createElement("button");
    button.textContent = String.fromCharCode(i);
    button.addEventListener("click", handleGuess);
    keyboard.appendChild(button);
  }
}

// Handle letter guess
function handleGuess(e) {
  const letter = e.target.textContent.toLowerCase();
  e.target.disabled = true;

  if (selectedWord.includes(letter)) {
    correctLetters.push(letter);
    e.target.classList.add("correct");
    displayWord();
    document.body.classList.add("correct-flash");
    setTimeout(() => document.body.classList.remove("correct-flash"), 2000);
    checkWin();
  } else {
    wrongGuesses++;
    hangmanImg.src = `images/${wrongGuesses}.png`;
    livesCount.textContent = maxLives - wrongGuesses;
    document.body.classList.add("wrong-flash");
    e.target.classList.add("wrong");
    setTimeout(() => document.body.classList.remove("wrong-flash"), 2000);
    checkLose();
  }
}

// Check win
function checkWin() {
  if (
    selectedWord.split("").every((letter) => correctLetters.includes(letter))
  ) {
    message.textContent = "🎉 You Win!";
    disableKeyboard();
    playAgainBtn.style.display = "block";
  }
}

// Check lose
function checkLose() {
  if (wrongGuesses === maxLives) {
    message.textContent = `😢 You Lose! Word: ${selectedWord}`;
    disableKeyboard();
    playAgainBtn.style.display = "block";
  }
}

// Disable all keyboard buttons
function disableKeyboard() {
  document
    .querySelectorAll(".keyboard button")
    .forEach((btn) => (btn.disabled = true));
}

// Button Handlers
playAgainBtn.addEventListener("click", () => initGame(true));
newGameBtn.addEventListener("click", () => initGame(true));
restartGameBtn.addEventListener("click", () => initGame(false));
quitGameBtn.addEventListener("click", () => {
  message.textContent = "❌ Game Over!";
  disableKeyboard();
});

initGame();
