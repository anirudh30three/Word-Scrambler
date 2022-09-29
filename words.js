let wordsList = [
    'straight',
    'fish',
    'mate',
    'cooing',
    'representative',
    'hate',
    'jazzy',
    'jaded',
    'cautious',
    'slip',
    'plan',
    'dirty',
    'shivering',
    'cheese',
    'title',
    'retire',
    'temper',
    'painstaking',
    'guttural',
    'sky',
    'hateful',
    'impartial',
    'lamp',
    'colour',
    'longing',
    'undress',
    'thumb',
    'grip',
    'fence',
    'shallow',
    'black-and-white',
    'ambitious',
    'delicious',
    'terrible',
    'railway',
    'telling',
    'pretend',
    'stew',
    'skirt',
    'excellent',
    'son',
    'possess',
    'cruel',
    'whine',
    'collect',
    'bite',
    'hour',
    'trite',
    'inexpensive',
    'bleach',
    'psychotic',
    'nest',
    'kind',
    'relieved',
    'guide',
    'vast',
    'boil',
    'exist',
    'violent',
    'colossal',
    'ink',
    'cooperative',
    'tight',
    'phobic',
    'thank',
    'crowded',
    'brake',
    'celery',
    'abaft',
    'blush',
    'puffy',
    'breezy',
    'periodic',
    'well-to-do',
    'house',
    'saw',
    'bells',
    'gruesome',
    'scratch',
    'toothsome',
    'crack',
    'buzz',
    'object',
    'shocking',
    'imminent',
    'joke',
    'surprise',
    'wooden',
    'quill',
    'steep',
    'clean',
    'reflect',
    'thoughtless',
    'shoes',
    'voyage',
    'grubby',
    'slip',
    'rampant',
    'acid',
    'deceive'
];

$(".app").hide();
$("#return").hide();
$(".scoreboard").hide();
$("#time").hide();
$(".scores").hide();
$(".end").hide();
$(".skippedWords").hide();
$(".settings").hide();
$(".off").hide();

let answer;
let timeout;
let score = 0;
let time = 60;
let timerInterval;
let skippedWords = [];
let reset;
let seconds;
let music = true;
let count = 0;

$("#currentScore").text(`Score: ${score}`);





function nextWord() {
  $("#wordInput").val("");
  if (reset) {
    $("#time").text(`Time left: ${seconds} secs`);
    time = seconds;
    clearTimeout(timeout);
    timeout = setTimeout(timesUp, seconds * 1000);
  }
  let length = wordsList.length;
  let num = Math.random() * length;
  let randomNum = Math.floor(num);
  answer = wordsList[randomNum];
  let word = scramble(wordsList[randomNum]);
  $("#word").text(word);
  wordsList.splice(randomNum, 1);
}

function scramble(word) {
  let mixed = "";
  let charArray = word.split("");
  while (charArray.length != 0) {
    let length = charArray.length;
    let index = Math.floor(Math.random() * length);
    mixed = mixed + charArray[index];
    charArray.splice(index, 1);
  }
  return mixed;
}

function scrambleAgain() {
  let current = $("#word").text();
  current = scramble(current);
  $("#word").text(current);
}

$("#scramble").click(scrambleAgain);

function play() {
  $(".begin").hide();
  $(".scoreboard").hide();
  $("#showScores").hide();
  $("#goodJobMsg").remove();
  $(".settings").show();
}

$("#play").click(play);

function start() {
  seconds = parseInt($("#seconds").val());
  time = seconds;
  let format = $("#format").val();
  reset = format != "Timer Doesn't Reset";
  $(".settings").hide();
  $("#time").text(`Time left: ${seconds} secs`);
  $("#time").css("color", "black");
  skippedWords = [];
  $(".skippedWord").remove();
  $(".app").show();
  $("#return").show();
  $("#time").show();
  $("#audio")[0].currentTime = 0;
  if (music) {
    $("#audio")[0].play();
  }
  timeout = setTimeout(timesUp, seconds * 1000);
  timerInterval = setInterval(timer, 1000);
  nextWord();
}

$("#start").click(start);

function returnHome() {
  $(".app").hide();
  $("#return").hide();
  $("#time").hide();
  $(".scoreboard").hide();
  $(".scores").hide();
  $(".end").hide();
  $(".settings").hide();
  clearTimeout(timeout);
  clearInterval(timerInterval);
  time = 60;
  score = 0;
  $("#time").text(`Time left: ${time} secs`);
  $(".begin").show();
  $("#showScores").show();
}

$("#home").click(returnHome);
$("#return").click(returnHome);
$("#backHome").click(returnHome);

function addWord() {
  let newWord = window.prompt("Enter word");
  if (!wordsList.includes(newWord) && typeof newWord != "undefined" && newWord != "") {
    wordsList.push(newWord);
  }
}

$("#add").click(addWord);

function check() {
  let typed = $("#wordInput").val();
  if (typed == answer) {
    score++;
    $("#score").text(`Score: ${score}`);
    nextWord();
  } else if (answer.startsWith(typed)) {
    $("#wordInput").removeClass("wrong");
  } else {
    $("#wordInput").addClass("wrong");
  }
}

$("#wordInput").keyup(check);

function timesUp() {
  $(".app").hide();
  $("#time").hide();
  $("#showScores").show();
  if (score == 1) {
    $("#finalCount").text(`You solved 1 word.`);
  } else if (score == 0) {
    $("#finalCount").text(`You solved 0 words.`);
  } else {
    $("#finalCount").text(`You solved ${score} words!`);
  }
  recordScore();
  clearInterval(timerInterval);
  clearTimeout(timeout);
  end();
}


function timer() {
  time--;
  if (time <= 5) {
    $("#time").css("color", "red");
    $("#time").css("font-weight", "bold");
  } else {
    $("#time").css("color", "black");
    $("#time").css("font-weight", "normal");
  }
  $("#time").text(`Time left: ${time} secs`);
}

function restart() {
  time = 60;
  score = 0;
  $("#score").text(`Score: ${score}`);
  $("#time").text(`Time left: ${time} secs`);
  $("#time").css("color", "black");
  $("#time").css("font-weight", "normal");
  $("#wordInput").css("color", "lightblue");
  $("#wordInput").css("border-bottom", "1px solid #ffeaa7");
  $("#wordInput")
  $("#return").hide();
  play();
}

$("#restart").click(restart);



let counter = 1;
function recordScore() {
  let date = new Date();
  let currentDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  let scoreHTML = `<p class="pastScores" id="score${counter}"><span><button class="save" id="${counter}"><i class="fa fa-save"></i></button></span>  ${currentDate}: ${score}</p>`;
  counter++;
  $(".scores").append(scoreHTML);
  $(".save").click(saveScore);
}

function showScores() {
  $(".begin").hide();
  $(".scoreboard").hide();
  $("#showScores").hide();
  $("#return").hide();
  $(".scores").show();
}

$("#showScores").click(showScores);


let totalScores = 0;
function saveScore(e) {
  let clicked = e.currentTarget;
  let id = $(clicked).attr("id");
  if (localStorage.getItem("score" + id) == null) {
    let scoreText = $("#score" + id).text();
    localStorage.setItem("score" + id, scoreText);
    totalScores++;
  }
  localStorage.setItem("totalScores", totalScores);
}

$(".save").click(saveScore);

function showPast() {
  if (count == 0) {
    let numberOfScores = parseInt(localStorage.getItem("totalScores"));
    for (let i = 1; i <= numberOfScores; i++) {
      let scoreText = localStorage.getItem("score" + i);
      let scoreHTML = `<p class="pastScores" id="score${i}"><span><button class="save" id="${counter}"><i class="fa fa-save"></i>    </button></span>${scoreText}</p>`;
      $(".scores").append(scoreHTML);
    }
    count++;
  }
}

$("#showScores").click(showPast);

function end() {
  $("#audio")[0].pause();
  $(".end").show();
  $("#showScores").hide();
  $("#lastWord").text(`The word was: ${answer}`);
}

function showResults() {
  $(".end").hide();
  $("#showScores").show();
  $(".scoreboard").show();
}

$("#results").click(showResults);

function next() {
  skipped();
  nextWord();
}

$("#next").click(next);

function skipped() {
  skippedWords.push(answer);
}

function showSkipped() {
  $(".scoreboard").hide();
  $("#showScores").hide();
  $("#return").hide();
  let num = skippedWords.length;
  if (num > 0) {
    for (let i = 0; i < num; i++) {
      let word = skippedWords[i];
      let wordHTML = `<p class="skippedWord">${word}</p>`;
      $(".skippedWords").append(wordHTML);
    }
  } else {
    let message = `<h2 id="goodJobMsg">You didn't skip anything! Great Job!</h2>`;
    $(".skippedWords").append(message);
  }
  $(".skippedWords").show();
}

$("#skipped").click(showSkipped);

function back() {
  $(".skippedWords").hide();
  $(".scoreboard").show();
  $("#showScores").show();
  $("#return").show();
}

$("#back").click(back);


function toggleMusic() {
  if (music) {
    $(".on").hide();
    $(".off").show();
    $(".music").css("background-color", "lightgrey");
    music = false;
  } else {
    $(".off").hide();
    $(".on").show();
    $(".music").css("background-color", "pink");
    music = true;
  }
}

$(".music").click(toggleMusic);