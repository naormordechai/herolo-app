import React from 'react';
import Header from './components/Header/Header';
import injectSheet from 'react-jss';
import { Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Favorite from './pages/Favorite/Favorite';

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto'
  }
};

function App(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Header />
      <>
        <Route path="/main" exact component={Main} />
        <Route path="/favorite" exact component={Favorite}/>
      </>
    </div>
  );
}

export default injectSheet(styles)(App);
