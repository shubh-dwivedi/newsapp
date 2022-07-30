import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalResults: 0,
      totalArticles: [],
      page: 1,
      loading: false,
      errorCode: "",
    };

    document.title = `NewsMurphy - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let newsData = await fetch(url);
    let parsedNewsData = await newsData.json();
    let status = parsedNewsData.status;
    if (status === "ok") {
      this.setState({
        articles: parsedNewsData.articles,
        totalResults: parsedNewsData.totalResults,
        loading: false,
      });
    } else {
      this.setState({ errorCode: parsedNewsData.code, loading: false });
      // alert(this.state.errorCode);
    }
    
  }

  allArticles = [];
  fetchNewsData = async () => {
    if (this.state.page === 1) {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.state.totalResults}`;
      let newsData = await fetch(url);
      let parsedData = await newsData.json();
      this.allArticles = parsedData.articles;
      this.setState({totalResults: this.allArticles.length});
    }
    this.setState({ loading: true });
    let articleLoaded = [];
    for (let i = 0; i < this.props.pageSize; i++) {
      if (this.allArticles[(this.state.page * this.props.pageSize) + i] !== undefined) {
        articleLoaded[i] = this.allArticles[(this.state.page * this.props.pageSize) + i];
      }
    }
    this.setState({
      articles: this.state.articles.concat(articleLoaded),
      page: this.state.page + 1,
      loading: false,
    });
  };
  
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-4">
          Today's Top Headlines -{" "}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {}
        {this.state.errorCode === "apiKeyExhausted" || this.state.errorCode === "rateLimited" ? <div className="my-4"><h2>Oops! Server requests limit has been exhausted. Please try after some time.</h2></div> : this.state.loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchNewsData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          endMessage={
            this.state.errorCode==="" ? !this.state.loading && <p className="my-3" style={{ textAlign: 'center' }}>
              <b>Yay! You have read all the news in {this.capitalizeFirstLetter(this.props.category)} category</b>
            </p>:<h4 className="text-center pt-5">Something went wrong 😰 Please try again later...</h4>}
        >
          <div className="container">
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 col-sm" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      sourceName={element.source.name}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
          </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
