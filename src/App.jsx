import React from "react";
import "./assets/styles/App.css";
import "./assets/styles/style.css";
import defaultDataset from "./dataset";
import { AnswersList, Chats, Title,TextInput} from "./components/index";
import FormDialog from "./components/Forms/FormDialog";
import Div100vh from "react-div-100vh";
// import $ from 'jquery';
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
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  // setHeight = () => {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // };

  // 3.ブラウザのサイズが変更された時・画面の向きを変えた時に再計算する
  // window.addEventListener('resize', setHeight);


  //defaultDataset内のIdを引数に引っ張ってくる。
  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: "question",
    });
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    });
  };

  //引数で表示する答えを変える。バケツリレーで使う。
  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === "init":
        this.displayNextQuestion(nextQuestionId);

        break;
      // リンク先に飛ぶスキーム
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();

      case nextQuestionId === "contact":
        this.handleClickOpen();
                break;

      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: "answer",
        });
        this.setState({
          chats: chats,
        });

        setTimeout(() => {
          this.displayNextQuestion(nextQuestionId);
        }, 500);

        break;
    }
  };

  initChats = () => {
    const initDataset = this.state.dataset[this.state.currentId];

    const chats = this.state.chats;
    chats.push({
      text: initDataset.question,
      type: "question",
    });
    this.setState({
      chats: chats,
    });
  };

  initAnswers = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const initAnswers = initDataset.answers;
    this.setState({
      answers: initAnswers,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  // 最初のレンダーが走ったあとに動作する。（stateの初期化）
  componentDidMount() {
    // this.initAnswers();
    // this.initChats();
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //スクロールエリアの要素を取得
    const scrollArea = document.getElementById("scroll-area");
    //スクロールエリアの高さ（scrollHeigh）をトップ（scrollTop)に合わせる
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
    // this.setHeight();
  }

  render() {
    return (
      <div className="c-section">
        <Div100vh>
          <div className="c-box">
            <Title></Title>
            <Chats chats={this.state.chats}></Chats>
            <AnswersList
              answers={this.state.answers}
              select={this.selectAnswer}
            ></AnswersList>
            <FormDialog open={this.state.open} handleClose={this.handleClose} />
          </div>
        </Div100vh>
      </div>
    );
  }
}
