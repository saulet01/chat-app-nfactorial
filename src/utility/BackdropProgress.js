import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import withStyles from "@material-ui/core/styles/withStyles";
import { useFirebase } from "../components/firebase/useFirebase";

const styles = theme => ({
    ...theme.theme,
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff"
    }
});

const BackdropProgress = props => {
    const { classes } = props;

    const { loading } = useFirebase();

    return (
        <Backdrop open={loading} className={classes.backdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
export default withStyles(styles)(BackdropProgress);
