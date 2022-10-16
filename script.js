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
