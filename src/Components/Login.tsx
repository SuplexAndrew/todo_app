import {useActions} from "../Hooks/useActions";
import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => createStyles({
    root: {
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: '10px',
        width: '16%',
        margin: '13% 42%',
        padding: '8px 5px 18px 5px'
    },
    textInput: {
        padding: '10px'
    },
    btn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '10px 30px',
    },
}));

export const Login = () => {
    const {userLogin} = useActions()
    const classes = useStyles()
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    return (
        <div className={classes.root}>
            <TextField required id="login" label="Логин" variant="outlined" className={classes.textInput}
                       onChange={(e) => setLogin(e.target.value)}/>
            <TextField id="outlined-password-input"
                       type="password" label="Пароль" variant="outlined" className={classes.textInput}
                       onChange={(e) => setPassword(e.target.value)}/>
            <Button className={classes.btn} onClick={() => userLogin({login, password})}>
                Login
            </Button>
        </div>
    )
}
