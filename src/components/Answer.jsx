import React from "react";
import "../assets/styles/index.css";
import "../assets/styles/style.css";
import Button from "@mui/material/Button";
import defaultDataset from "../dataset";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const Answer = (props) => {
  return (
    <div className="">
      <Button  className="button-red" variant="contained" disableElevation   onClick={()=>{props.select(props.content,props.nextId)}}>
        {props.content}
      </Button>
    </div>
  );
};
export default Answer;
