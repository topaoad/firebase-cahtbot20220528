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

const Title = () => {
 

  return (
  <h1　className="top-h1">
    とっぷのチャットアプリ  
  </h1>
  );
};
export default Title;
