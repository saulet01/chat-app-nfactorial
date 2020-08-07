import React, { Fragment } from "react";
import { Button, Grid, Card, CardContent, Typography, TextField } from "@material-ui/core";
import { useFirebase } from "./firebase/useFirebase";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import withStyles from "@material-ui/core/styles/withStyles";
import { useNavigate } from "@reach/router";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Profile from "./Profile";
import Favorites from "./Favorites";
import chatImage from "../images/1.png";
const styles = theme => ({
    ...theme.theme,
    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    usersImage: {
        maxWidth: "100%",
        height: 50,
        borderRadius: "50%",
        boxShadow: "2px 2px 10px #ccc",
        marginRight: 15
    },
    jumbotron: {
        maxWidth: "100%",
        height: 300
    }
});

export const MainView = props => {
    const { users, user, handleFavorite, setChatId } = useFirebase();
    const { classes } = props;
    const navigate = useNavigate();

    const handleFavorites = async getFavoriteUser => {
        try {
            handleFavorite(getFavoriteUser);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRedirectRoute = guestEmail => {
        const currentEmailUser = user ? user.email : "";
        const beforeSort = `${currentEmailUser}${guestEmail}`;
        const AfterSort = beforeSort
            .split("")
            .sort()
            .join("");

        setChatId(AfterSort);

        setTimeout(() => {
            navigate(`/messages/${guestEmail}`);
        }, 400);
    };

    const displayInformation = user ? (
        <Typography color="primary" variant="h4" style={{ textAlign: "center" }}>
            Все Контакты
        </Typography>
    ) : (
        ""
    );

    const searchFuncionality =
        user && users ? (
            <Fragment>
                <Typography color="primary" variant="h4" style={{ textAlign: "center" }}>
                    Поиск
                </Typography>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                    <Autocomplete id="combo-box-demo" style={{ width: "80%" }} options={users} getOptionLabel={option => option.email} renderInput={params => <TextField {...params} label="Поиск..." variant="outlined" />} />
                </div>
            </Fragment>
        ) : (
            ""
        );

    const getCurrentUser = user && users.length > 0 ? users.find(d => d.email === user.email) : null;

    const getUsers =
        users && user
            ? users
                  .filter(e => e.email !== user.email)
                  .map(userMap => (
                      <Card key={userMap.email} style={{ marginTop: 10 }}>
                          <CardContent className={classes.root}>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                  <img alt="Profile" src={userMap.image} className={classes.usersImage} />
                                  <Typography> {userMap.email}</Typography>
                              </div>
                              <div>
                                  <Button variant="text" onClick={() => handleFavorites(userMap.email)}>
                                      <FavoriteBorderIcon color="error" />
                                  </Button>

                                  <Button onClick={() => handleRedirectRoute(userMap.email)} color="primary" variant="outlined">
                                      Написать сообщение
                                  </Button>
                              </div>
                          </CardContent>
                      </Card>
                  ))
            : "";

    return (
        <Grid container justify="center" spacing={2} style={{ marginTop: 80 }}>
            <Grid item xs={7}>
                <Profile currentUser={getCurrentUser} />
            </Grid>
            <Grid item xs={5}>
                <img src={chatImage} alt="Chat" className={classes.jumbotron} />
            </Grid>
            <Grid item xs={10}>
                {searchFuncionality}
            </Grid>
            <Grid item xs={12}>
                <hr className="rounded" />
            </Grid>

            <Grid item xs={5}>
                {user ? <Favorites currentUser={getCurrentUser} /> : ""}
            </Grid>
            <Grid item xs={5}>
                {displayInformation}
                {getUsers}
            </Grid>
        </Grid>
    );
};
export default withStyles(styles)(MainView);
