import React from 'react';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';

const styles = {
    header: {
        height: '50px',
        background: '#333',
        display: 'flex',
        alignItems: 'center',
        padding: '0 50px',
        justifyContent: 'space-between',
        color: '#fff',
        marginBottom: '20px'
    },
    link: {
        color: '#fff',
        transtion: '1s',
        '&:first-child': {
            marginRight: '8px'
        },
    },
    active: {
        opacity: '.7',

    },
    '@media(max-width:600px)': {
        header: {
            padding: '0 16px'
        }
    }
};

const Header = props => {
    const { classes } = props;
    return (
        <div className={classes.header}>
            <div>Herolo Weather Task</div>
            <div>
                <NavLink to="/main" className={classes.link} activeClassName={classes.active}>Main</NavLink>
                <NavLink to="/favorite" className={classes.link} activeClassName={classes.active}>Favorite</NavLink>
            </div>
        </div>
    );
};


export default injectSheet(styles)(Header);