import React from 'react';

export default () => (
  <footer className="footer-container">
    <div className="fixed-width footer-content">
      <nav className="social-links inner-fixed-width">
        <a href="https://www.linkedin.com/in/david-bodow-46375053/">
          <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/dbodow/lexicon/">
          <i className="fa fa-github fa-2x" aria-hidden="true"></i>
        </a>
      </nav>
      <div className="footer-credit">
        <span>
          Site by David Bodow. Check out the real &nbsp;
          <a href="http://www.vocabulary.com">Vocabulary.com</a>
          &nbsp; for excellent, fully-featured vocabulary training!
        </span>
      </div>
    </div>
  </footer>
);
