import React, { useState } from "react";
import { Card, CardContent, TextField, Typography, Button, Grid, Box, Grow } from "@material-ui/core";
import { Link, useNavigate } from "@reach/router";
import withStyles from "@material-ui/core/styles/withStyles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useFirebase } from "../firebase/useFirebase";

const styles = theme => ({
    ...theme.theme,
    headliner: {
        textAlign: "center"
    },
    iconProfile: {
        fontSize: "5em"
    },
    button: {
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#3f50b5"
        }
    },
    input: {
        color: "gray"
    }
});

const Login = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login, setSnackbar, setsnackbarDetails } = useFirebase();

    const [errors, setErrors] = useState({
        email: {
            error: false,
            helperText: ""
        },
        password: {
            error: false,
            helperText: ""
        }
    });

    const assignErrors = (type, state) => {
        setErrors(prevState => ({
            ...prevState,
            [type]: state
        }));
    };

    const valid = () => {
        let validity;
        if (email === "") {
            assignErrors("email", { error: true, helperText: "Please provide an email adress!" });
            validity = false;
        } else {
            assignErrors("email", { error: false, helperText: "" });
            validity = true;
        }

        if (password === "") {
            assignErrors("password", { error: true, helperText: "Please provide password!" });

            validity = false;
        } else if (password.length < 5) {
            assignErrors("password", { error: true, helperText: "Password must be at least 5 characters" });

            validity = false;
        } else {
            assignErrors("password", { error: false, helperText: "" });

            validity = true;
        }
        return validity;
    };

    const handleSubmit = async event => {
        if (valid()) {
            try {
                await login(email, password);
                setsnackbarDetails({ message: "You successfully logged in!", severity: "success" });
                setSnackbar(true);
                navigate("/");
            } catch (err) {
                console.log(err.message);
                setsnackbarDetails({ message: err.message, severity: "error" });
                setSnackbar(true);
            }
        }
    };
    const { classes } = props;

    return (
        <Grid container spacing={3} justify="center" alignItems="center" style={{ height: "100vh" }}>
            <Grow in={true}>
                <Grid item xs={5}>
                    <div className={classes.headliner}>
                        <AccountCircleIcon className={classes.iconProfile} color="primary" />
                        <Box m={1}>
                            <Typography variant="h3" color="primary">
                                Логин
                            </Typography>
                        </Box>
                    </div>

                    <Card>
                        <Box boxShadow={10} p={1}>
                            <CardContent>
                                <Typography variant="subtitle1" className={classes.input}>
                                    Email
                                </Typography>

                                <Box my={1}>
                                    <TextField value={email} type="text" id="standard-basic" fullWidth label="Введите email адрес" variant="outlined" onChange={event => setEmail(event.target.value)} error={errors.email.error} helperText={errors.email.helperText} />
                                </Box>
                                <Typography variant="subtitle1" className={classes.input}>
                                    Пароль
                                </Typography>

                                <Box my={1}>
                                    <TextField value={password} type="password" id="filled-basic" fullWidth label="Введите пароль" variant="outlined" onChange={event => setPassword(event.target.value)} error={errors.password.error} helperText={errors.password.helperText} />
                                </Box>
                                <br />
                                <Button type="submit" onClick={handleSubmit} color="primary" fullWidth variant="contained" className={classes.button}>
                                    Войти
                                </Button>

                                <Box my={2}>
                                    <Typography>
                                        Нет аккаунта? <Link to="/register">Зарегестрируйтесь</Link>{" "}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grow>
        </Grid>
    );
};

export default withStyles(styles)(Login);
