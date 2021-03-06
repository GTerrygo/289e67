import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent, UnreadDot } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setAscActiveChat } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser, unreadCount } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation, unreadCount);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      <UnreadDot unreadCount={unreadCount}/>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (conversation, unreadCount) => {
      dispatch(setAscActiveChat(conversation, unreadCount));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
