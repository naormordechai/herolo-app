import React from 'react';
import injectSheet from 'react-jss';

const styles = {
    card: {
        boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)',
        padding: '16px',
        borderRadius: '4px'
    }
};

const Card = props => {
    const { classes, clicked, styles } = props;
    return (
        <div className={`${classes.card} ${styles}`}>
            {props.children}
        </div>
    )
};

export default injectSheet(styles)(Card);