import React from 'react';
import { Link } from 'react-router-dom';
import prepareVideo from '../../video/hero_video';

export default class Splash extends React.Component {
  componentDidMount() {
    prepareVideo();
  }

  renderHero() {
    return (
      <section className="homepage-hero-module">
        <div className="video-container">
          <div className="splash-hero filter">
            {this.renderHeroArticle()}
          </div>
          {this.renderVideo()}
        </div>
      </section>
    );
  }

  renderHeroArticle() {
    return (
      <div className="fixed-width flex-article splash-hero-container">
        <article className="splash-hero-pitch col-2-3">
          <h1>Welcome to Lexicon.</h1>
          <h2>Isn't it time to expand your lexicon?</h2>
          <p>Lexicon allows you to study and quiz yourself with lists of vocabulary words that will increase your English vocabulary.</p>
          <Link className="signup-link article-sign-up" to='/signup'>
            Start Learning
            &nbsp;
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          </Link>
        </article>
        <aside className="splash-hero-def col-1-3">
          <h1>lex·i·con</h1>
          <p>noun</p>
          <ol>
            <li>The vocabulary of a language.</li>
            <li>A site for expanding your English horizons.</li>
          </ol>
        </aside>
      </div>
    );
  }

  renderVideo() {
    return (
      <video autoPlay loop className="fillWidth">
        <source src="https://s3-us-west-1.amazonaws.com/lexicon-dev/Slide-Show.mp4" type="video/mp4" />
        <source src="https://s3-us-west-1.amazonaws.com/lexicon-dev/Slide-Show.webm" type="video/webm" />
        <source src="https://s3-us-west-1.amazonaws.com/lexicon-dev/Slide-Show.ogv" type="video/ogg" />
      </video>
    );
  }

  renderAbout() {
    return (
      <section className="homepage-about-module">
        <h1>From word lookup to quizzing and study, Lexicon helps you master new vocabulary.</h1>
        <div className="fixed-width flex-article splash-about-container">
          <div className="about-lookups sequence-box col-1-3">
            <div className="sequence-box-headers">
              <h2>1.</h2>
              <h3>Search for new words.</h3>
            </div>
            <i className="fa fa-book fa-4x" aria-hidden="true"></i>
            <p>Lexicon checks multiple dictionaries to give you an in-depth search that finds even the hardest words.</p>
          </div>
          <div className="about-lists sequence-box col-1-3">
            <div className="sequence-box-headers">
              <h2>2.</h2>
              <h3>Make lists you want to study.</h3>
            </div>
            <i className="fa fa-list fa-4x" aria-hidden="true"></i>
            <p>Group new words into lists to learn about new topics, understand difficult books, or prepare for an exam.</p>
          </div>
          <div className="about-quizzes sequence-box col-1-3">
            <div className="sequence-box-headers">
              <h2>3.</h2>
              <h3>Quiz yourself to master words.</h3>
            </div>
            <i className="fa fa-line-chart fa-4x" aria-hidden="true"></i>
            <p>Lexicon tracks your mastery of each word, quizzing you until you remember it perfectly!</p>
          </div>
        </div>
      </section>
    );
  }

  render() {
    return (
      <div className="splash-content">
        {this.renderHero()}
        {this.renderAbout()}
      </div>
    );
  }
}
