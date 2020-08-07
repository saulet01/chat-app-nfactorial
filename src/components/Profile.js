import React, { Fragment } from "react";
import { Button, Box, Grid, Card, CardContent, Typography } from "@material-ui/core";
import { useFirebase } from "./firebase/useFirebase";
import withStyles from "@material-ui/core/styles/withStyles";
import BackupIcon from "@material-ui/icons/Backup";

const styles = theme => ({
    ...theme.theme,
    fluid: {
        maxWidth: "100%",
        height: 120,
        borderRadius: "50%",
        boxShadow: "2px 2px 10px #ccc"
    }
});

const Profile = props => {
    const { user, users, handleImage } = useFirebase();

    const { classes, currentUser } = props;

    const handleSubmit = event => {
        handleImage(event.currentTarget.files[0]);
    };

    const displayInfo =
        currentUser && user ? (
            <Typography variant="h4" color="primary" style={{ textAlign: "center" }}>
                Профиль
            </Typography>
        ) : (
            ""
        );

    const profile =
        currentUser && user ? (
            <Grid container>
                <Grid item xs={4}>
                    <img className={classes.fluid} alt="Profile" src={currentUser.image} />
                </Grid>
                <Grid item xs={8}>
                    <Box mb={1}>
                        <Typography color="textSecondary" variant="h6">
                            Email: {currentUser.email}
                        </Typography>
                    </Box>

                    <input accept="image/*" className={classes.input} style={{ display: "none" }} id="raised-button-file" type="file" onChange={handleSubmit} />

                    <label htmlFor="raised-button-file">
                        <Button size="small" color="primary" variant="contained" component="span" className={classes.button}>
                            <BackupIcon style={{ marginRight: 5 }} />
                            Опубликовать фотографию
                        </Button>
                    </label>
                </Grid>
            </Grid>
        ) : (
            <Typography color="primary" variant="h4" style={{ textAlign: "center" }}>
                Пожалуйста авторизуйтесь чтобы воспользоваться функционалом сайта!
            </Typography>
        );

    return (
        <Fragment>
            {displayInfo}
            <Box m={1}>
                <Card>
                    <CardContent>{profile}</CardContent>
                </Card>
            </Box>
        </Fragment>
    );
};

export default withStyles(styles)(Profile);
