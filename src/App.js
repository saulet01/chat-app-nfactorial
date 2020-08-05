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
const theme = createMuiTheme(themeFile);

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Navbar />
            <Container maxWidth="lg" style={{ marginTop: "80px" }}>
                <Router>
                    <MainView path="/" />
                    <Login path="/login" />
                    <Register path="/register" />
                </Router>
            </Container>
        </MuiThemeProvider>
    );
}

export default App;
