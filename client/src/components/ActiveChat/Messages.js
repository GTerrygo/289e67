import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  let latestMessageId = ''
  for(let i=messages.length-1; i>=0 ;i--){
    if(messages[i].senderId === userId && messages[i].isRead){
      latestMessageId = messages[i].id
      break
    }
  }
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUserAvatar={otherUser.photoUrl} avatarUnderMessage={latestMessageId===message.id && message.isRead}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
