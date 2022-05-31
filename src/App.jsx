import React from "react";
import "./assets/styles/App.css";
import "./assets/styles/style.css";
import defaultDataset from "./dataset";
import { AnswersList, Chats } from "./components/index";
import db from "./index";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false,
    };

    // this.initAnswers = this.initAnswers.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  //defaultDataset内のIdを引数に引っ張ってくる。
displayNextQuestion=(nextQuestionId)=>{
  const chats = this.state.chats;
  chats.push({
    text:this.state.dataset[nextQuestionId].question,
    type:"question",


  });
  this.setState({
    answers:this.state.dataset[nextQuestionId].answers,
    chats:chats,
    currentId:nextQuestionId

  })

}

//引数で表示する答えを変える。バケツリレーで使う。
selectAnswer=(selectedAnswer,nextQuestionId)=>{
switch(true){
  case(nextQuestionId==="init"):
  this.displayNextQuestion(nextQuestionId);

  break;
  default:
    const chats = this.state.chats;
    chats.push({
      text:selectedAnswer,
      type: "answer",
    });
    this.setState({
      chats:chats
    })

    this.displayNextQuestion(nextQuestionId);

    break;

}

}

//なぜかinitChatsが2回走る問題は追々の課題(20220530)

  initChats = () => {
    const initDataset = this.state.dataset[this.state.currentId];

    const chats = this.state.chats;
    chats.push({
      text: initDataset.question,
      type: "question",
    });
    this.setState({
      chats:chats
    })
  }

  initAnswers = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const initAnswers = initDataset.answers;
    this.setState({
      answers: initAnswers,
    });
  };



  // 最初のレンダーが走ったあとに動作する。（stateの初期化）
  componentDidMount() {
    // this.initAnswers();
    // this.initChats();
   const initAnswer="";
    this.selectAnswer(initAnswer,this.state.currentId);

  }

  render() {

    return (
      <div className="c-section">
        <div className="c-box">
        <Chats chats={this.state.chats}></Chats>
          <AnswersList answers={this.state.answers} select={this.selectAnswer}></AnswersList>
        </div>
      </div>
    );
  }
}
