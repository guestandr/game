'use strict';
function rand(from, to) {
  return Math.floor((to - from + 1) * Math.random()) + from;
}

function randomNums() {
  let arr=[];
  for (let i=0; i<numbers.length; i++) {
    let p = true;
    while (p) {
      let num = rand(1,size*size);
      if (arr.indexOf(num) == -1) {
        numbers[i].innerHTML = num;
        arr.push(num);
        p = false; 
      }
    }

  }
}

function createTableNums(size) {
  table = document.createElement('table');
  table = gameField.appendChild(table);
  for (let i=0; i<size; i++) {
    let tr = document.createElement('tr');
    tr = table.appendChild(tr)
    for (let j=0; j<size; j++) {
      let td = document.createElement('td');
      tr.appendChild(td);
    }
  }
}

function loadTopTime() {
  if (!localStorage) return 999999;
  const topTime = localStorage.getItem('topTime');
  return topTime ? topTime : 999999;
}

function saveTopTime(time) {
  if (!localStorage) return;
  localStorage.setItem('topTime', time);
}


function updateTime() {
  let timeout = Date.now() - startedAtTotal;
  if (!isStarted) {
    timer.innerHTML = `Игра закончена, ваш результат ${Math.floor(timeout/1000)}`;
    return;
  }
 
  time.innerHTML = Math.floor(timeout/1000);
}

function updateSound () {
  sound('sound/start_tick.mp3'); 
}

function updateTimer() {
  let timeout = GAME_TIMEOUT - (Date.now() - startedAt);
  if (timeout < 0) {
    table.remove();
    clearInterval(timeInterval);
    clearInterval(timerInterval);
    clearInterval(soundInterval);
    num = 1;
    game.style.display = 'none';
    lost.style.display = 'block';
    exit.style.display='block';
    sound('sound/lost.mp3');
    return;
  }
  timer.innerHTML = Math.floor(timeout/1000);
}


function sound(path) {
  var audio = new Audio(); 
  audio.src = path; 
  audio.autoplay = true; 
}

function handleDownClick() {
  let numb = Number(this.innerHTML);
  if(num == size*size && numb == size*size) {
    table.remove();
    isStarted = false;
    let currentTime = Math.floor((Date.now() -  startedAtTotal)/1000);
    updateTime();
    clearInterval(timeInterval);
    clearInterval(timerInterval);
    clearInterval(soundInterval);
    game.style.display='none';
    gameWin.style.display='block';
    resultWin.innerHTML=time.innerHTML;
    exit.style.display='block';
    gameRecord.style.display='none';
    if (topTime>currentTime) {
      saveTopTime(topTime);
      gameRecord.style.display='block';
      sound('./sound/record.mp3');
    }
    else {
      sound('./sound/show_result.mp3');
    }
  }
  else if(num == numb) {
    currentNumber.innerHTML= `${++num}`;
    sound('./sound/correct.mp3');
    this.style.backgroundColor = 'green';
    startedAt= Date.now();
  } 
  else {
  	sound('./sound/incorrect.mp3');
  	this.style.backgroundColor = 'red';
  }
}


function handleUpClick() {
 let numb = Number(this.innerHTML);
   if(num == numb) {
    this.style.background = 'white';
  } 
  else {
  	this.style.background = 'white'; 
  }
}

function start() {
  num = 1;
  currentNumber.innerHTML='1';
  createTableNums(size);
  randomNums();
  Array.from(numbers).forEach(function (num) { 
    num.addEventListener('mousedown', handleDownClick);
    num.addEventListener('mouseup', handleUpClick);
  });
  startedAt = startedAtTotal =  Date.now();
  menu.style.display='none';
  game.style.display='block';
  isStarted = true;
  sound('./sound/gong.mp3');
  soundInterval = setInterval(updateSound, 1000);
  timeInterval = setInterval(updateTime, 250);
  timerInterval = setInterval(updateTimer, 250);
}

let timeInterval, timerInterval, soundInterval, startedAt, startedAtTotal, isStarted;
let topTime = loadTopTime();
let num = 1;
const GAME_TIMEOUT = 5000;

const numbers = document.getElementsByTagName('td');
const currentNumber = document.getElementById('currentNumber');
const startButton = document.querySelector('.startButton');
const game = document.querySelector('.item-game');
const menu = document.querySelector('.item-menu');
const about = document.querySelector('.item-about');
const time = document.querySelector('.time');
const timer = document.querySelector('.timer');
const aboutGame = document.querySelector('.about-game');
const exit = document.querySelector('.item-exit');
const lost = document.querySelector('.game-lost');
const levelGame = document.querySelector('.level-game');
const level = document.querySelector('.item-level');
const easy = document.querySelector('.easy');
const middle = document.querySelector('.middle');
const hard = document.querySelector('.hard');
const gameField = document.querySelector('.game-field');
const resultWin = document.querySelector('.result-win');
const gameWin = document.querySelector('.game-win');
const gameRecord = document.querySelector('.record');

let size = 5;
let table;


startButton.addEventListener('click', start);
aboutGame.addEventListener('click', function () {
    menu.style.display='none';
    about.style.display='block';
    exit.style.display='block';
});

easy.addEventListener('click', function () {
    easy.style.background = 'blue';
    middle.style.background = 'green';
    hard.style.background = 'green';
    size=5;
});


middle.addEventListener('click', function () {
   middle.style.background = 'blue';
   easy.style.background = 'green';
   hard.style.background = 'green'; 
   size=6;
});


hard.addEventListener('click', function () {
    hard.style.background = 'blue';
    easy.style.background = 'green';
    middle.style.background = 'green';
    size=7;
});

levelGame.addEventListener('click', function () {
    menu.style.display='none';
    level.style.display='block';
    exit.style.display='block';
});

exit.addEventListener('click', function () {
  about.style.display='none';
  exit.style.display='none';
  lost.style.display='none';
  level.style.display='none';
  gameWin.style.display='none';
  menu.style.display='block';
});
currentNumber.innerHTML='Найдите число 1';
