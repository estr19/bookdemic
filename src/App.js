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
  const [playLogo, setPlayLogo] = useState('play_circle');
  const [showDate, setShowDate] = useState(new Date("2023-01-11T19:00:00Z"));
  const [isLoading, setLoading] = useState(true);
  const song = useRef(new Audio(lullaby));
  const options = { month: 'long'};
  let mtgDate = (new Intl.DateTimeFormat('en-US', options).format(showDate) + ' ' + showDate.getDate());
  let todayMonth = new Date().getMonth();
  let todayYear = new Date().getFullYear();
  let k = 0;

  // console.log(showDate);

  const handleChange = (e) => {
    setMySearch(e.target.value);
  }

  const filteredBooks = !mySearch
    ? myBooks
    : myBooks.filter(book => {
    return (
      book.name.toLowerCase().includes(mySearch.toLowerCase()) ||
      book.author.toLowerCase().includes(mySearch.toLowerCase()) ||
      book.month.toLowerCase().includes(mySearch.toLowerCase())
    );
  });

  const handleMusicClick = () => {
    if (k === 0) {
      k = 1;
      song.current.play();
      setPlayLogo('pause_circle');
    } else {
      k = 0;
      song.current.pause();
      setPlayLogo('play_circle');
    }
  };

  const handleQuoteClick = () => {
    let i = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[i]);
    setShowQuote(true);
  }

  const meetingCountdown = () => {
    let todate;
    let timeObjects = [];
    const today = new Date();
    if (new Date().getDate() <= 14) {
      todate = new Date(Date.UTC(todayYear, todayMonth, 1, todayMonth % 2 === 1 ? 19 : 4, 0, 0, 0));
      // console.log('1 ' + todayMonth + " " + today.getTime() + " " + todate.getTime());
      if (new Date(todate) > today) {
        // console.log('2 ' + (today < new Date(todate)));
        todate = new Date(Date.UTC(todayYear, todayMonth, 1, todayMonth % 2 === 1 ? 19 : 4, 0, 0, 0));
        // console.log('2 ' + todate);
      } 
      else
      // if (new Date(todate) > today)
       {
        // console.log('3 ' + (today < new Date(todate)));
        todayMonth = todayMonth + 1;
        todate = new Date(Date.UTC(todayYear, todayMonth, 1, todayMonth % 2 === 1 ? 19 : 4, 0, 0, 0));
        // console.log('3 ' + todate);
      }
    }
    if (new Date().getDate() > 14) {
      todayMonth = todayMonth + 1;
      // console.log('4 ' + todate);
    }
    if (new Date().getDate() > 14) todate = new Date(Date.UTC(todayYear, todayMonth + 1, 1, todayMonth % 2 === 1 ? 19 : 4, 0, 0, 0));
    todate = new Date(Date.UTC(todayYear, todayMonth, 1, todayMonth % 2 === 1 ? 19 : 4, 0, 0, 0));
    todate.setDate(14 - todate.getDay());
    // console.log('5 ' + todate);
    setShowDate(todate);
    setLoading(false);

    const difference = todate - today;
    let displayDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    let displayHours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let displayMinutes = Math.floor((difference / 1000 / 60) % 60);
    let displaySeconds = Math.floor((difference / 1000) % 60);
    
    if (displayDays < 10) displayDays = "0" + displayDays;
    if (displayHours < 10) displayHours = "0" + displayHours;
    if (displayMinutes < 10) displayMinutes = "0" + displayMinutes;
    if (displaySeconds < 10) displaySeconds = "0" + displaySeconds;

    if (difference > 0) {
      timeObjects = {
        days: displayDays,
        hours: displayHours,
        minutes: displayMinutes,
        seconds: displaySeconds,
      }
    }
    return setShowTime(timeObjects);
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
        <div id="top">
          <button onClick={handleMusicClick} title="Play our anthem">
            <span className="material-symbols-outlined">{playLogo}</span>
          </button>
          {isLoading ? <p className="nextMtg">L o a d i n g . . . </p> :
          <p className="nextMtg">
              <span id="nextDiscussion">
                Our next book discussion is in:{" "}
                <span id="mtgString">
                  {showTime.days} : {showTime.hours} : {showTime.minutes} : {showTime.seconds}
                </span>
                {mtgDate}th
              </span>
          </p>}
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
          <button onClick={handleQuoteClick} id="quotebutton">
            {showQuote
              ? `${quote}`
              : 'Click here for our favorite "Twilight" quotes!'}
          </button>
        </div>
        <h1>Bookdemic "Book of the Month" picks!</h1>
        <p id="description">The stars reveal our club's average rating.</p>
      </div>

      <div className="container">
        {filteredBooks.map((book) => {
          const { id, name, author, month, bookRating, cover, link, theme } =
            book;
          return (
            <div className="book" key={id}>
              <a href={link} target="_blank" rel="noreferrer">
                <figure>
                  <img src={cover} alt={name} />
                  <figcaption className={theme}>{month}</figcaption>
                </figure>
                <p fontFamily={author === "Stephenie Meyer" ? "Twilight": "Acme"}>
                    "{name}"
                </p>
                <p className="author">{author}</p>
                <div
                  className="Stars"
                  style={{ "--rating": `${bookRating}` }}
                  title={
                    bookRating === "0"
                      ? "Not yet rated"
                      : `${bookRating} out of 5`
                  }
                />
              </a>
            </div>
          );
        })}
      </div>
      <button
        className="scrollBack"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      >
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
    </div>
  );
}

export default App;