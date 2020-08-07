import React, { Fragment } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import SmsIcon from "@material-ui/icons/Sms";
import { Link } from "@reach/router";
import { useFirebase } from "../firebase/useFirebase";

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
    const { user, signout } = useFirebase();
    // const navigate = useNavigate();

    const handleSignOut = () => {
        signout();
        window.location.href = "/";
    };

    const navigation = !user ? (
        <Fragment>
            <Link to="/login" className="button-link">
                <Button style={{ color: "#fff" }}>Логин</Button>
            </Link>
            <Link to="/register" className="button-link">
                <Button style={{ color: "#fff" }}>Регистрация</Button>
            </Link>
        </Fragment>
    ) : (
        <Fragment>
            <Button style={{ color: "#fff" }} onClick={handleSignOut}>
                Выход
            </Button>
        </Fragment>
    );

    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <SmsIcon className={classes.menuButton} />
                    <Link to="/" className={classes.title}>
                        <Typography variant="h6">Chat App</Typography>
                    </Link>
                    {navigation}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(Navbar);
