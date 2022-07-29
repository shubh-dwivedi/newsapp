import React, { Component } from 'react'
import imagePlaceholder from './placeholderImage.jpg'

export default class NewsItem extends Component {
   
  render() {
    let {title,description, imageUrl, newsUrl, author, date, sourceName} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{margin: 'auto'}}>
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">{sourceName}</span>
        <img src={imageUrl?imageUrl:imagePlaceholder} onError={this.errorHandler = (event) => {event.target.src = imagePlaceholder}} className='card-img-top' alt="news" />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><i><small className="text-muted">by {author} on {new Date(date).toUTCString()}</small></i></p>
            <a href={newsUrl} className="btn btn-primary" target='_blank' rel="noreferrer">Read more...</a>
        </div>
        </div>
        </div>
    )
  }
}
