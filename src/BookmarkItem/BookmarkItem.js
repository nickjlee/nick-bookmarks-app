import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import config from '../config';
import './BookmarkItem.css';

export default class BookmarkItem extends Component {
  static defaultProps = {
    onClickDelete: () => {}
  }

  onDeleteClicked = id => {
    fetch(config.API_ENDPOINT + `${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
      })
      .then(data => {
        this.props.onClickDelete(id);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <li className="BookmarkItem">
        <div className="BookmarkItem__row">
          <h3 className="BookmarkItem__title">
            <a href={this.props.url} target="_blank" rel="noopener noreferrer">
              {this.props.title}
            </a>
          </h3>
          <Rating value={this.props.rating} />
        </div>
        <p className="BookmarkItem__description">{this.props.desc}</p>
        <div className="BookmarkItem__buttons">
          <button className="BookmarkItem__edit">
            <Link to={`/edit-bookmark/${this.props.id}`}>Edit</Link>
          </button>

          <button
            className="BookmarkItem__delete"
            onClick={() => this.onDeleteClicked(this.props.id)}
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}
