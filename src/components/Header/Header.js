import React from 'react';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';

const styles = {
    header: {
        height: '50px',
        background: '#333',
        display: 'flex',
        alignItems: 'center'
    }
};

const Header = props => {
    const { classes } = props;
    return (
        <div className={classes.header}>
            <NavLink to="/main">Main</NavLink>
            <NavLink to="/favorite">Favorite</NavLink>
        </div>
    );
};


export default injectSheet(styles)(Header);