// import './App.css';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import News from './components/News'

export default class App extends Component {
  pageSize=6
  apiKey=process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <>
        <Router>
        <Navbar />
          <Routes>
            <Route exact path='/' element={<News key="general" apiKey={this.apiKey} pageSize={this.pageSize} country={'in'} category={'general'}/>}></Route>
            <Route exact path='/business' element={<News key="business" apiKey={this.apiKey} pageSize={this.pageSize} country={'in'} category={'business'}/>}></Route>
            <Route exact path='/health' element={<News key="health" apiKey={this.apiKey} pageSize={this.pageSize} country={'in'} category={'health'}/>}></Route>
            <Route exact path='/entertainment' element={<News key="entertainment" apiKey={this.apiKey} pageSize={this.pageSize} country={'in'} category={'entertainment'}/>}></Route>
            <Route exact path='/sports' element={<News key="sports" apiKey={this.apiKey} pageSize={this.pageSize} country={'in'} category={'sports'}/>}></Route>
            <Route exact path='/science' element={<News key="science" apiKey={this.apiKey} pageSize={this.pageSize} country={'in'} category={'science'}/>}></Route>
            <Route exact path='/technology' element={<News key="technology" apiKey={this.apiKey} pageSize={this.pageSize} country={'in'} category={'technology'}/>}></Route>
          </Routes>
        </Router>
      </>
    )
  }
}

