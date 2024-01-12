import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  constructor(){
    super();
    this.state={
      articles:[],
      page:1
    }
  }
  async componentDidMount(){
    let url='https://newsapi.org/v2/top-headlines?country=in&apiKey=aed1518dcf6b4e9791036d090e49c406&page=1&pageSize=20';
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults});
  }
  handleNextClick =async ()=>{
    console.log("Next")
    if(this.state.page+1>Math.ceil(this.state.totalResults/20)){
    }
    else{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=aed1518dcf6b4e9791036d090e49c406&page=${this.state.page +1}&pageSize=20`;
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,page:this.state.page+1});
    
    
  }}
  handlePrevClick =async ()=>{
    console.log("Previous")
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=aed1518dcf6b4e9791036d090e49c406&page=${this.state.page -1}&pageSize=20`;
    let data=await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,page:this.state.page-1});
  }
 
  render() {
    return (
      <div className='container my-3'>
        <h1>News-Monkey top headlines</h1>
        <div className='row'>
          {this.state.articles.map((element)=>{
            return <div className='col md-4' key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,85):" "} imageUrl={element.urlToImage?element.urlToImage:"https://c.ndtvimg.com/2024-01/h4squk1_china-taiwan-afp-_625x300_11_January_24.jpeg?ver-20231203.06"} textUrl={element.url} />
              </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
