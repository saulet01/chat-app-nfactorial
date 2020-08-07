export default {
    palette: {
        primary: {
            light: "#3f50b5",
            main: "#406AFF",
            dark: "#008394",
            contrastText: "#fff"
        },

        secondary: {
            light: "#f44336",
            main: "#f44336",
            dark: "#f44336",
            contrastText: "#fff"
        }
    },
    typography: {
        useNextVariants: true,
        fontFamily: ["Roboto"].join(",")
    },
    theme: {
        button: {
            "&:hover": {
                //you want this to be the same as the backgroundColor above
                backgroundColor: "#3f50b5"
            }
        }
    }
};
