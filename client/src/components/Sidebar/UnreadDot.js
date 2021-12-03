import React from "react";
import { Badge, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginRight: "6.75%",
  }
}));

const UnreadDot = (props) => {
  const classes = useStyles();

  const { unreadCount } = props;

  return (
    <Box className={classes.root}>
        {unreadCount === 0 || !unreadCount ? '':
        <Badge badgeContent={unreadCount} color="primary"></Badge>
      }
    </Box>
  );
};

export default UnreadDot;