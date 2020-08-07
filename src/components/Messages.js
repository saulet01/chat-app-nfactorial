import React, { Fragment, useState } from "react";
import { Card, CardContent, Grid, Box, CardHeader, TextField, Button, FormControl } from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useFirebase } from "./firebase/useFirebase";

const Messages = props => {
    const { user, createMessage, messages } = useFirebase();

    const [typeMessage, setTypeMessage] = useState("");
    dayjs.extend(relativeTime);

    const onSubmitMessage = () => {
        const data = {
            email: user.email,
            body: typeMessage,
            date: new Date().toISOString()
        };
        createMessage(data);
        setTypeMessage("");
    };

    const onChangeHandler = event => {
        setTypeMessage(event.target.value);
    };

    const displayMessages =
        messages.length > 0 && user
            ? messages.map((d, index) => (
                  <div key={index} className={user.email === d.email ? "message-user" : "message-guest"}>
                      <Box my={1}>
                          <Card style={{ display: "inline-block" }} className={user.email === d.email ? "isUser" : ""}>
                              <CardHeader titleTypographyProps={{ variant: "h6" }} title={d.email} subheader={dayjs(d.date).fromNow()}></CardHeader>
                              <Box mt={-2}>
                                  <CardContent>{d.body}</CardContent>
                              </Box>
                          </Card>
                      </Box>
                  </div>
              ))
            : "";

    return (
        <Fragment>
            <Grid container style={{ height: "100vh" }} justify="center" spacing={1}>
                <Grid item xs={12}>
                    <div style={{ marginTop: 80, height: 500, overflowY: "scroll" }}>{displayMessages}</div>
                </Grid>
                <Grid item xs={8}>
                    <TextField value={typeMessage} onChange={onChangeHandler} variant="outlined" multiline rows={2} fullWidth label="Отправить Сообщение"></TextField>
                </Grid>
                <Grid item xs={1}>
                    <Button onClick={onSubmitMessage} variant="contained" size="large" color="primary">
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Messages;
