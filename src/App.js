import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import injectSheet from 'react-jss';
import { Route, withRouter } from 'react-router-dom';
import Main from './pages/Main/Main';
import Favorite from './pages/Favorite/Favorite';

const styles = {
  containerContent: {
    maxWidth: '1280px',
    margin: '0 auto'
  }
};

function App(props) {
  const { classes } = props;
  
  useEffect(() => {
    props.history.push('main')
  }, [])

  return (
    <>
      <Header />
      <div className={classes.containerContent}>
        <>
          <Route path="/main" exact component={Main} />
          <Route path="/favorite" exact component={Favorite} />
        </>
      </div>
    </>
  );
}

export default injectSheet(styles)(withRouter(App));
