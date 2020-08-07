import React, { Fragment } from "react";
import { Typography, Card, CardContent, Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import withStyles from "@material-ui/core/styles/withStyles";
import { useFirebase } from "./firebase/useFirebase";

const styles = theme => ({
    ...theme.theme
});

const Favorites = props => {
    const { currentUser } = props;
    const { handleRemoveFavorite } = useFirebase();

    const handleRemove = removeUser => {
        handleRemoveFavorite(removeUser);
    };

    const favorites =
        currentUser && currentUser.favorites.length > 0 ? (
            currentUser.favorites.map(d => (
                <Card key={d} style={{ marginTop: 10, height: 90 }}>
                    <CardContent style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <div>{d}</div>
                        <div>
                            <Fab color="secondary" aria-label="remove" size="small" onClick={() => handleRemove(d)}>
                                <DeleteIcon />
                            </Fab>
                        </div>
                    </CardContent>
                </Card>
            ))
        ) : (
            <p>Пожалуйста добавьте пользователя в Избранные</p>
        );

    return (
        <Fragment>
            <Typography variant="h4" color="primary" style={{ textAlign: "center" }}>
                Избранные
            </Typography>
            {favorites}
        </Fragment>
    );
};
export default withStyles(styles)(Favorites);
