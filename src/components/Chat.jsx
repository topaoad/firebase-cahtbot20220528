import React from "react";
import "../assets/styles/index.css";
import "../assets/styles/style.css";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import defaultDataset from "../dataset";
import { Answer } from "./index";
// import {
//   collection,
//   getDocs,
//   orderBy,
//   query,
//   onSnapshot,
// } from "firebase/firestore";
// import { useState, useEffect } from "react";
import NoProfile from "../assets/img/no-profile.png";
import TopImage from "../assets/img/topimage.jpg";

const Chat = (props) => {
  const isQuestion = props.type === "question";
  const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";

  return (
    <ListItem  className={classes}  alignItems="flex-start" >
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="Top Road" src={TopImage} />
        ) : (
          <Avatar alt="Top Road" src={NoProfile} />
        )}
      </ListItemAvatar>
      <div className="p-chat__bubble">
        
        {props.text}
      </div>
    </ListItem>
  );
};
export default Chat;
