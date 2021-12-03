import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  activedText: {
    fontWeight: "600 !important",
    color:"#000000",
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessage, otherUser } = conversation;
  const isActived = !latestMessage.isRead && (latestMessage.senderId === otherUser.id)
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={[classes.previewText, isActived?classes.activedText:'']} >
          {latestMessage.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
