import React from "react";
import "../assets/styles/index.css";
import "../assets/styles/style.css";
import {Answer} from './index'
import defaultDataset from "../dataset";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";


const AnswersList = (props) => {
  // const answersList = props.answers.map((key, index) => {
  //     return <Answer answer={props.answers[index]} key={index.toString()} select={props.select} />
  // });

  return (
    // <Answer answer={props.answers[index]} key={index.toString()} select={props.select} />
    <div className="c-grid__answer">
      {props.answers.map((value,index)=>{
        return   (
        <Answer  content={value.content} key={index.toString()} nextId={value.nextId} select={props.select}/>
        );

      })}


    </div>

  );
};

export default AnswersList;