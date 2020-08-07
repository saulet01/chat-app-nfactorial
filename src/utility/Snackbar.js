import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useFirebase } from "../components/firebase/useFirebase";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarNotification = () => {
    const { snackbar, setSnackbar, snackbarDetails, setsnackbarDetails } = useFirebase();

    return (
        <div>
            <Snackbar anchorOrigin={{ horizontal: "right", vertical: "top" }} autoHideDuration={3000} open={snackbar} onClose={() => setSnackbar(false)}>
                <Alert onClose={() => setSnackbar(false)} severity={snackbarDetails.severity}>
                    {snackbarDetails.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SnackbarNotification;
