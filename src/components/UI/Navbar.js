import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import SmsIcon from "@material-ui/icons/Sms";
import { Link } from "@reach/router";

const styles = theme => ({
    ...theme.theme,
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        textDecoration: "none",
        color: "#fff"
    }
});

const Navbar = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <SmsIcon className={classes.menuButton} />
                    <Link to="/" className={classes.title}>
                        <Typography variant="h6">Chat App</Typography>
                    </Link>
                    <Link to="/login" className="button-link">
                        <Button color="secondary">Login</Button>
                    </Link>
                    <Link to="/register" className="button-link">
                        <Button color="secondary">Sign Up</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(Navbar);
