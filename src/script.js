

const searchInputTwo = document.getElementById("search-two");
const mtgString = document.querySelector("#mtgString");
const divs = document.querySelectorAll(".container .book");

searchInputTwo.addEventListener("keyup", function(event) {
  const word = event.target.value.toLowerCase();
  divs.forEach(element => {
    element
      .querySelector("p")
      .textContent.toLowerCase()
      .includes(word) ||
    element
      .querySelector(".author")
      .textContent.toLowerCase()
      .includes(word) ||
    element
      .querySelector("figcaption")
      .textContent.toLowerCase()
      .includes(word)
      ? (element.style.display = "block")
      : (element.style.display = "none");
  });
});

function meetingCountdown() {
  const meetingDate = new Date("2022-11-12T07:00:00Z"); //date in UTC format (hence the Z at the end of the date)
  const today = new Date();
  const difference = meetingDate - today;

  const msInSecond = 1000;
  const msInMinute = 60 * 1000;
  const msInHour = 60 * 60 * 1000;
  const msInDay = 24 * 60 * 60 * 1000;

  const displayDay = Math.floor(difference / msInDay);
  let displayHour = Math.floor((difference % msInDay) / msInHour);
  let displayMinutes = Math.floor((difference % msInHour) / msInMinute);
  let displaySeconds = Math.floor((difference % msInMinute) / msInSecond);
  
  if (displayHour < 10) displayHour = "0" + displayHour;
  if (displayMinutes < 10) displayMinutes = "0" + displayMinutes;
  if (displaySeconds < 10) displaySeconds = "0" + displaySeconds;
  
  mtgString.textContent = `${displayDay} : ${displayHour} : ${displayMinutes} : ${displaySeconds}`;
  
  if (difference <= 0) {
    document.querySelector(".days").textContent = 0;
    document.querySelector(".hours").textContent = 0;
    document.querySelector(".minutes").textContent = 0;
    document.querySelector(".seconds").textContent = 0;
    mtgString.textContent = "Discussing the book at the moment 😁";
    clearInterval(timer);
  }
}

let timer = setInterval(meetingCountdown, 1000);

const music = document.querySelector("#song");
const playPause = document.querySelector("#playPause");
let i = 0;

playPause.addEventListener("click", () => {
  if (i === 0) {
    i = 1;
    music.play();
    playPause.removeAttribute("class");
    playPause.setAttribute("class", "far fa-pause-circle");
  } else {
    i = 0;
    music.pause();
    playPause.removeAttribute("class");
    playPause.setAttribute("class", "far fa-play-circle");
  }
});

let mySeconds;
let intervalHandle;
let timeDisplay = document.getElementById("rTimer");
const myInput = document.querySelector("#inputRTimer");
const btn15 = document.querySelector("#btn15");
const btn30 = document.querySelector("#btn30");
const btn60 = document.querySelector("#btn60");

myInput.addEventListener("keypress", e => {
  if (e.keyCode === 13) startCounterEnter();
});

btn15.addEventListener("click", startCounterBtn15);
btn30.addEventListener("click", startCounterBtn30);
btn60.addEventListener("click", startCounterBtn60);

function startCounterBtn15() {
  btn15.style.display = "none";
  btn30.style.display = "none";
  btn60.style.display = "none";
  myInput.style.display = "none";
  
	let newInput = btn15.value;
    
	mySeconds = newInput * 60;
	
	intervalHandle = setInterval(tick, 1000);
}

function startCounterBtn30() {
  btn15.style.display = "none";
  btn30.style.display = "none";
  btn60.style.display = "none";
  myInput.style.display = "none";
  
	let newInput = btn30.value;
    
	mySeconds = newInput * 60;
	
	intervalHandle = setInterval(tick, 1000);
}

function startCounterBtn60() {
  btn15.style.display = "none";
  btn30.style.display = "none";
  btn60.style.display = "none";
  myInput.style.display = "none";
  
	let newInput = btn60.value;
    
	mySeconds = newInput * 60;
	
	intervalHandle = setInterval(tick, 1000);
}

function startCounterEnter() {
  btn15.style.display = "none";
  btn30.style.display = "none";
  btn60.style.display = "none";
  
	if (isNaN(myInput.value)) {
		alert("Type a valid number please");
		return;
	}
	mySeconds = myInput.value * 60;
	
	intervalHandle = setInterval(tick, 1000);
  myInput.style.display = "none";
}

function tick() {
	let min = Math.floor(mySeconds / 60);
	let sec = mySeconds % 60;
	
	if (sec < 10) sec = "0" + sec;

  if (sec < 10 && min === 0) timeDisplay.style.color = "red";
  
  timeDisplay.style.display = "block";
  timeDisplay.textContent = `${min} : ${sec}`;
	
	if (mySeconds===0) {
		clearInterval(intervalHandle);
		resetPage();
	}
	mySeconds--;
}

function resetPage() {
  timeDisplay.textContent = "It's time to finally read more!";
  myInput.style.display = "block";
  btn15.style.display = "block";
  btn30.style.display = "block";
  btn60.style.display = "block";
  timeDisplay.style.color = "#022E57";
}

const input = document.querySelector("#guess");
const button = document.querySelector("#playbutton");
const answer = 17;

button.addEventListener("click", play);

input.addEventListener("keypress", e => {
  if (e.keyCode === 13) play();
});

function play() {
  const userNumber = document.querySelector("#guess").value;
  if (userNumber < 13 || userNumber > 27) {
    Swal.fire({
      icon: "error",
      title: `Huh?!`,
      text: "You are WAAAYYYY off",
      imageUrl:
        "https://filmdaily.co/wp-content/uploads/2020/10/edward-lede.jpg",
      imageWidth: 400,
      imageHeight: 225,
      imageAlt: "yuck"
    });
  } else if (isNaN(userNumber)) {
    Swal.fire({
      icon: "error",
      title: `What if you're the bad guy?`,
      text: "Age can only be a number...",
      imageUrl:
        "https://cdn.glitch.com/a149e74e-9a26-4ad2-937c-331de96a3e0a%2Fbellaswan_header__span.jpg",
      imageWidth: 400,
      imageHeight: 225,
      imageAlt: "huh?"
    });
  } else {
    if (userNumber < answer) {
      Swal.fire({
        icon: "warning",
        title: "Not quite!",
        text: `Bella, you don't wanna get involved with a kid`,
        imageUrl: "https://media3.giphy.com/media/NYIn1MKzf0abu/200.gif",
        imageWidth: 400,
        imageHeight: 225,
        imageAlt: "disgust"
      });
    } else if (userNumber > answer) {
      Swal.fire({
        icon: "warning",
        title: `I'm not THAT ancient`,
        text: `Wow, maybe I shouldn't be dating such an old man.`,
        imageUrl:
          "https://64.media.tumblr.com/c11d2642239d927be854c18927bea78d/tumblr_inline_oiy7d1nDAD1rp269s_500.gif",
        imageWidth: 400,
        imageHeight: 225,
        imageAlt: "shock"
      });
    } else {
      document.querySelector("#win").src =
        "https://cdn.glitch.com/a149e74e-9a26-4ad2-937c-331de96a3e0a%2FMonsters%20(mp3cut.net).mp3";
      Swal.fire({
        title: `- How long have you been 17?`,
        imageUrl: "https://data.whicdn.com/images/192576145/original.gif",
        imageWidth: 400,
        imageHeight: 171,
        imageAlt: "victory",
        confirmButtonText: "- A while..."
      });
      const guessPause = document.querySelector("button.swal2-confirm");
      console.log(guessPause);
      guessPause.addEventListener("click", () => {
        document.querySelector("#win").pause();
      });
    }
  }
}
