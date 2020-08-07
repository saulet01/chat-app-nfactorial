import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import "./App.css";
import themeFile from "./utility/theme";
import Navbar from "./components/UI/Navbar";
import MainView from "./components/MainView";
import { Router } from "@reach/router";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ProvideFirebase } from "./components/firebase/useFirebase";
import Snackbar from "./utility/Snackbar";
import Messages from "./components/Messages";
import Backdrop from "./utility/BackdropProgress";
const theme = createMuiTheme(themeFile);

function App() {
    return (
        <div className="App">
            <MuiThemeProvider theme={theme}>
                <ProvideFirebase>
                    <Backdrop />
                    <Snackbar />
                    <Navbar />
                    <Container maxWidth="lg">
                        <Router>
                            <MainView path="/" />
                            <Login path="/login" />
                            <Register path="/register" />
                            <Messages path="/messages/:Id" />
                        </Router>
                    </Container>
                </ProvideFirebase>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
