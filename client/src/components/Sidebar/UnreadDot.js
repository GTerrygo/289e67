import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginRight: "6.75%",
  },
  rectangle: {
    background: "#3F92FF",
    borderRadius: "10px",
    padding:"3px 7px",
  },
  dot: {
    height: "14px",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "10px",
    lineHeight: "14px",
    /* identical to box height */
    letterSpacing: "-0.5px",
    color: "#FFFFFF",
  }
}));

const UnreadDot = (props) => {
  const classes = useStyles();

  const { unreadCount } = props;

  return (
    <Box className={classes.root}>
        {unreadCount === 0 || !unreadCount ? '':
        <div className={classes.rectangle}>
          <div className={classes.dot}>{unreadCount}</div>
        </div>}
    </Box>
  );
};

export default UnreadDot;