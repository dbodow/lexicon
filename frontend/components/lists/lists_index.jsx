import React from 'react';
import { Link } from 'react-router-dom';
import ListIndexItem from './list_index_item';

export default class ListsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchListsIndex();
  }

  renderHero() {
    return (
      <div className="lists-index-hero">
        <h1>Vocabulary Lists</h1>
        <h2>Build a library of your favorite words.</h2>
      </div>
    );
  }

  renderSidebar() {
    return (
      <aside className="list-index-list-management">
        <div to='/lists/new' className="navigate-to-new-list-button">
          <Link to='/lists/new'>
            <i className="fa fa-plus" aria-hidden="true"></i>
            &nbsp;Start a new list...
          </Link>
        </div>
        <div className="list-ideas">
          <h3>
            <i className="fa fa-star" aria-hidden="true"/>
            List Topic Ideas
          </h3>
          <div className="list-ideas-item">
            <i className="fa fa-pencil" aria-hidden="true"/>
            <Link to='/lists/new'>Test Prep</Link>
          </div>
          <div className="list-ideas-item">
            <i className="fa fa-pagelines" aria-hidden="true"/>
            <Link to='/lists/new'>Morphology & Roots</Link>
          </div>
          <div className="list-ideas-item">
            <i className="fa fa-book" aria-hidden="true" />
            <Link to='/lists/new'>Literature</Link>
          </div>
          <div className="list-ideas-item">
            <i className="fa fa-grav" aria-hidden="true" />
            <Link to='/lists/new'>Non-Fiction</Link>
          </div>
          <div className="list-ideas-item">
            <i className="fa fa-globe" aria-hidden="true" />
            <Link to='/lists/new'>Historical Documents</Link>
          </div>
          <div className="list-ideas-item">
            <i className="fa fa-comment" aria-hidden="true" />
            <Link to='/lists/new'>Speeches</Link>
          </div>
          <div className="list-ideas-item">
            <i className="fa fa-futbol-o" aria-hidden="true" />
            <Link to='/lists/new'>Just for fun</Link>
          </div>
          <div className="list-ideas-item">
            <i className="fa fa-newspaper-o" aria-hidden="true" />
            <Link to='/lists/new'>News</Link>
          </div>
        </div>
      </aside>
    );
  }

  renderAllLists() {
    const listIds = Object.keys(this.props.lists) || [];
    return (
      <div className="all-lists-container">
        {listIds.map(id => (
          <ListIndexItem key={id} list={this.props.lists[id]}/>
        ))}
        <div className="flex-stretch-preventer"/>
      </div>
    );
  }

  renderListIndex() {
    return (
      <div className="lists-index fixed-width">
        {this.renderSidebar()}
        <article className="list-index-content">
          <h3><i className="fa fa-star" aria-hidden="true"/>My Lists</h3>
          {this.renderAllLists()}
        </article>
      </div>
    );
  }

  render() {
    return (
      <div className='lists-index-container'>
        {this.renderHero()}
        {this.renderListIndex()}
      </div>
    );
  }
}
