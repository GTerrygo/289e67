import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  avatarUnderMessage: {
    width: 20,
    height: 19.35,
    marginTop: 9
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, avatarUnderMessage, otherUserAvatar } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {avatarUnderMessage ? 
      <Avatar alt="Remy Sharp" src={otherUserAvatar} className={classes.avatarUnderMessage} alt="avatar"/>: ''}
    </Box>
  );
};

export default SenderBubble;
