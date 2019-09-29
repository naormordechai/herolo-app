import React from 'react';
import injectSheet from 'react-jss';

const styles = {
    btn: {
        outline: 'none',
        border: '1px solid rgba(0,0,0,.2)',
        borderRadius: '100px',
        padding: '0 20px',
        transition: '.2s',
        cursor: 'pointer',
        background:'inherit',
        '&:hover': {
            background: 'rgba(0,0,0,.1)',
            padding: '0 25px'
        },
        '&:active': {
            transform: 'scale(.9)'
        }
    }
};

const Button = props => {
    return <button className={props.classes.btn} onClick={props.clicked}>{props.children}</button>
};

export default injectSheet(styles)(Button)