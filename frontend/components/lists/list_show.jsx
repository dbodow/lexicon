import React from 'react';
import ListShowIndexItem from './list_show_index_item';
import { Link } from 'react-router-dom';

export default class ListShow extends React.Component {
  componentDidMount(e) {
    this.props.fetchListShow(this.props.match.params.id);
  }

  handleToggleListActivation(e) {
    this.props.toggleListActiveStatus(this.props.match.params.id);
  }

  handleListDeletion(e) {
    this.props.deleteList(this.props.match.params.id);
    this.props.history.push('/lists');
  }

  renderListData() {
    const list = this.props.lists[this.props.match.params.id];
    return (
      <article className='list-show-data-background'>
        <div className='list-show-data-positioning fixed-width'>
          {list ? (
            <div className="list-show-data">
              <h1 className='list-show-data-header'>VOCAUBLARY LISTS</h1>
              <h2>{list.title}</h2>
              <p>{list.description}</p>
              <h3>Activities for this list:</h3>
              <div className='list-show-start-quiz'>
                <h4>
                  <i className="fa fa-check-square fa-2x" aria-hidden="true"/>
                  Practice
                </h4>
                <p>
                  {"Test your knowledge by quizzing these words' defintions. " +
                    "Earn points for every correct definition that you can match! " +
                    "We make studying fun."}
                </p>
                <Link to="/quiz">Start Practice Session</Link>
              </div>
            </div>
          ) : "" }
          <aside className='list-show-management'>
            <Link to='/lists' className='list-show-navigate-back'>
              <i className="fa fa-arrow-circle-left fa-2x" aria-hidden="true"/>
              Back to My Lists
            </Link>
            { list ?
              <div className={`list-show-toggle-list-activation list-activity-${list.active}`}
                   onClick={this.handleToggleListActivation.bind(this)}>
                { list.active ?
                  <div>
                    <i className="fa fa-times-circle fa-2x" aria-hidden="true"/>
                    Remove List from Study Program
                  </div> :
                  <div>
                    <i className="fa fa-plus-circle fa-2x" aria-hidden="true"/>
                    Add List to Study Program
                  </div>
                }
              </div>
              : ""
            }
            <div className='list-show-delete-list-button'
                 onClick={this.handleListDeletion.bind(this)}>
              <i className="fa fa-trash fa-2x" aria-hidden="true"/>
              Delete List
            </div>
          </aside>
        </div>
      </article>
    );
  }

  topDefinition(word) {
    const definitionId = this.props.words[word].definitions[0];
    return (
      this.props.definitions[definitionId].definition || ''
    );
  }

  topExample(word) {
    const exampleId = this.props.words[word].examples[0];
    return (
      this.props.examples[exampleId].example || ''
    );
  }

  renderWords() {
    const wordList = Object.keys(this.props.words);
    return (
      <article className='list-show-container fixed-width'>
        {(Object.keys(this.props.definitions).length > 0) ?
          <ol className='list-show-index'>
            {wordList.map(word => (
              <ListShowIndexItem word={word}
                definition={this.topDefinition(word)}
                example={this.topExample(word)}
                key={word} />
            ))}
          </ol> :
        "" }
      </article>
    );
  }

  render() {
    return (
      <div className='list-show-page-content'>
        {this.renderListData()}
        {this.renderWords()}
      </div>
    );
  }
}
