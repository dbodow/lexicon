import React from 'react';
import { Link } from 'react-router-dom';
import prepareVideo from '../../video/hero_video';

export default class Splash extends React.Component {
  componentDidMount() {
    prepareVideo();
  }

  renderHero() {
    return (
      <div className="fixed-width flex-article">
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

  render() {
  return (
    <div className="homepage-hero-module">
      <div className="video-container">
        <div className="splash-hero filter">
          {this.renderHero()}
        </div>
        {this.renderVideo()}
      </div>
    </div>
  );}
}
