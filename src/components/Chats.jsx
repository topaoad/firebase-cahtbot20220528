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
import { Answer, Chat } from "./index";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const Chats = (props) => {
  // console.log(props);ここではすでに複数入っている
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.chats.map((chat, index) => {
        return (
          <Chat text={chat.text} type={chat.type} key={index.toString()}></Chat>
        );
      })}

      <Divider variant="inset" component="li" />
    </List>
  );
};
export default Chats;
