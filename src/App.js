import React, { useState, useEffect } from 'react';
import { books } from './books';
import { quotes } from './quotes';
import song from "./lullaby.mp3";

function App() {
  const [quote, setQuote] = useState();
  const [showTime, setShowTime] = useState([]);
  const [showQuote, setShowQuote] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const playPause = document.getElementById("playPause");
  const music = new Audio(song);
  music.loop = true;
  let i = 0;

  // window.onscroll = () => {
  //   let navbar = document.getElementById("stickyTop");
  //   let sticky = navbar.offsetTop;
  //   if (window.pageYOffset >= sticky) {
  //     navbar.classList.add("sticky")
  //   } else {
  //     navbar.classList.remove("sticky");
  //   }
  // };
  
  const handleMusicClick = () => {
    if (i === 0) {
      i = 1;
      music.play();
      music.loop = true;
      playPause.removeAttribute("class");
      playPause.setAttribute("class", "far fa-pause-circle");
    } else {
      i = 0;
      music.pause();
      music.loop = false;
      playPause.removeAttribute("class");
      playPause.setAttribute("class", "far fa-play-circle");
    }
  };

  const handleQuoteClick = () => {
    let i = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[i]);
    setShowQuote(true);
  }

  const meetingCountdown = () => {
    let newObjects = [];
    let showDate = new Date("2022-11-12T07:00:00Z");
    const today = new Date();
    const difference = showDate - today;
    
    let displayDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    let displayHours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let displayMinutes = Math.floor((difference / 1000 / 60) % 60);
    let displaySeconds = Math.floor((difference / 1000) % 60);
    
    if (displayDays < 10) displayDays = "0" + displayDays;
    if (displayHours < 10) displayHours = "0" + displayHours;
    if (displayMinutes < 10) displayMinutes = "0" + displayMinutes;
    if (displaySeconds < 10) displaySeconds = "0" + displaySeconds;

    if (difference > 0) {
      newObjects = {
        days: displayDays,
        hours: displayHours,
        minutes: displayMinutes,
        seconds: displaySeconds,
      }
    } else {
      setShowDiscussion(true);
    }
    return setShowTime(newObjects);
  }

  useEffect(() => {
    const tick = setTimeout(() => {
      meetingCountdown();
    }, 1000);
    return () => clearInterval(tick);
  });

  return (
    <div className="App">
      <div id="stickyTop">
        <div id='top'>
          <button onClick={handleMusicClick}><i id="playPause" className="far fa-play-circle"></i></button>
          <p id="nextMtg">{showDiscussion ? 'Discussing the book at the moment 😁' : <span id='nextDiscussion'>Our next book discussion is in: <span id='mtgString'>{showTime.days} :   {showTime.hours} : {showTime.minutes} : {showTime.seconds}</span>November 12th</span>}</p>
        </div>
        <div id="input-container">
          <input
            type="text"
            name="search"
            id="search-two"
            placeholder="Search the books by title, author, month, or year."
          />
        </div>
      </div>

      <div className="title">
        <div id="quote">
          <button onClick={handleQuoteClick} id="quotebutton">{showQuote ? `${quote}` : 'Click here for our favorite "Twilight" quotes!'}</button>
        </div>
        <h1>Bookdemic "Book of the Month" Winners!</h1>
        <p id="description">The stars
          reveal our club's average rating.
        </p>
      </div>

      <div className="container">
        {books.map((element => {
            const {id, name, author, month, rating, cover, link} = element;
            return (
              <div className='book' key={id}>
                <div className="pictures">
                  <figure>
                    <img
                      src={cover}
                      alt={name}
                    />
                    <figcaption>{month}</figcaption>
                  </figure>
                </div>
                <p>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    >"{name}"</a>
                </p>
                <p className="author">{author}</p>
                <p className="rating" alt="">{rating} out of 5</p>
              </div>
            )
          }))}
      </div>
    </div>
  );
}

export default App;