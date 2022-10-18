import React, { useState, useEffect, useRef } from 'react';
import { books } from './books';
import { quotes } from './quotes';
import lullaby from "./lullaby.mp3";

function App() {
  const [myBooks] = useState(books);
  const [quote, setQuote] = useState();
  const [showTime, setShowTime] = useState([]);
  const [mySearch, setMySearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const playPause = document.getElementById("playPauseBtn");
  const song = useRef(new Audio(lullaby));
  let k = 0;

  const handleChange = (e) => {
    setMySearch(e.target.value);
  }

  const filteredBooks = !mySearch
    ? myBooks
    : myBooks.filter(book => {
    return (
      book
      .name
      .toLowerCase()
      .includes(mySearch.toLowerCase()) ||
      book
      .author
      .toLowerCase()
      .includes(mySearch.toLowerCase()) ||
      book
      .month
      .toLowerCase()
      .includes(mySearch.toLowerCase())
    );
  });

  const handleMusicClick = () => {
    if (k === 0) {
      k = 1;
      song.current.play();
      playPause.innerHTML = 'pause_circle';
    } else {
      k = 0;
      song.current.pause();
      playPause.innerHTML = 'play_circle';
    }
  };

  const handleQuoteClick = () => {
    let i = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[i]);
    setShowQuote(true);
  }

  const getBackgroundColor = (theme) => {
    if (theme === 'halloween') return '#F75F1C';
    if (theme === 'holidays') return '#e4181e';
    if (theme === 'trueCrime') return '#648eac';
    if (theme === 'phoenix') return 'linear-gradient(0.33turn, #E5B2EF, #B5A6EA, #A7CDF5, #CEE6C3, #F3EECC, #F3C2C0)';
    return '#11144c';
  }

  const getColor = (theme) => {
    // if (theme === 'halloween') return '#F75F1C';
    // if (theme === 'holidays') return '#fde28e ';
    // if (theme === 'trueCrime') return '#648eac';
    if (theme === 'phoenix' || theme === 'halloween') return '#000000';
    return '#FFFFFF';
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

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) setVisible(true)
    else if (scrolled <= 300) setVisible(false)
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('scroll', toggleVisible);

  return (
    <div className="App">
      <div id="stickyTop">
        <div id='top'>
          <button onClick={handleMusicClick} title='Play our anthem'><span id='playPauseBtn' className="material-symbols-outlined">play_circle</span></button>
          <p id="nextMtg">{showDiscussion ? 'Discussing the book at the moment 😁' : <span id='nextDiscussion'>Our next book discussion is in: <span id='mtgString'>{showTime.days} :   {showTime.hours} : {showTime.minutes} : {showTime.seconds}</span>November 12th</span>}</p>
        </div>
        <div id="input-container">
          <input
            onChange={(e) => handleChange(e)}
            value={mySearch}
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
        {filteredBooks.map((book => {
            const {id, name, author, month, bookRating, cover, link, theme} = book;
            return (
              <div className='book' key={id}>
                <div className="pictures">
                  <figure>
                    <img
                      src={cover}
                      alt={name}
                    />
                    <figcaption style={{ 'background': getBackgroundColor(theme), 'color': getColor(theme)}}>{month}</figcaption>
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
                <div className="Stars" style={{'--rating': `${bookRating}`}} title={bookRating === '0' ? 'Not yet rated' : `${bookRating} out of 5`} />
              </div>
            )
          }))}
      </div>
      <button className='scrollBack' onClick={scrollToTop} 
        style={{display: visible ? 'inline' : 'none'}} >
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
    </div>
  );
}

export default App;