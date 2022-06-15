import React from 'react';
import './App.css';
import { books } from './books';

function App() {
  return (
    <div className="App">
      <audio
      id="song"
      src="https://cdn.glitch.com/a149e74e-9a26-4ad2-937c-331de96a3e0a%2F15eb43f1-1700-4db6-98b7-cda9e2463983.Bella's%20Lullaby.mp3"
      loop="loop"
      ></audio>

      <audio id="win" src="" loop="loop" autoplay="allowed"></audio>
      
      <div id="stickyTop">
        <p id="nextMtg">Our next book discussion is in: <span id="mtgString"></span>
        <button><i id="playPause" className="far fa-play-circle"></i></button>
        </p>
      </div>
      
      <div className="header">
        <div className="countdown">
          <div className="readingTimer">
            <p id="rTimer">IT'S TIME TO READ MORE!</p>
            <div id="readingBtn">
              <button id="btn15" value="15">15 min</button>
              <button id="btn30" value="30">30 min</button>
              <button id="btn60" value="60">1 hour</button>
              <input id="inputRTimer" type="text" placeholder="or enter your own time in minutes!" />
            </div>
            
          </div>
        </div>
        <div id="trivia">
          <div id="triviaGame">
            <p id="question">How old was Edward when he was turned into a vampire?</p>
              <input
                id="guess"
                type="text"
                placeholder="Hold on tight, spidermonkey..."
              />
              <button id="playbutton" class="buttontext">PLAY</button>
          </div>
        </div>
      </div>
      
      <div className="title">
        <div id="quote">
          <button id="quotebutton">Click here for our favorite "Twilight" quotes!</button>
        </div>
        <h1>Bookdemic "Book of the Month" Picks!</h1>
        <p id="description">The stars
          reveal our club's average rating.
        </p>
        <div id="input-container">
          <input
            type="text"
            name="search"
            id="search-two"
            placeholder="Search the books by title, author, month, or year."
          />
        </div>
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
                    >{name}</a>
                </p>
                <p class="author">{author}</p>
                <p class="rating" alt="">{rating}</p>
              </div>
            )
          }))}
      </div>
    </div>
  );
}

export default App;