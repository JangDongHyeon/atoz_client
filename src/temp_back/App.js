import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as StoreProvider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
/*global Kakao*/
import 'antd/dist/antd.css';
import Home from './page/Home';
import Signup from './page/Signup';
import Signin from './page/Signin';
import Confirm from './page/Confirm';
import { LOAD_USER_REQUEST } from './actions/types';
import setAuthToken from './util/setAuthToken';
import axios from 'axios'
import Post from './page/post/Post';
import PostForm from './page/post/PostForm';
import Service from './page/Service';

import PostUpdate from './page/post/PostUpdate';
import Qna from './page/qna/Qna';
import QnaForm from './page/qna/QnaForm';
import './css/index.scss'


const AppMain = () => {

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {



    if (localStorage.getItem('token')) {

      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token').trim();

      dispatch({
        type: LOAD_USER_REQUEST
      });
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }


  }, [isAuthenticated, dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/service" exact component={Service} />

        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/post" exact component={Post} />
        <Route path="/post/add" exact component={PostForm} />
        <Route path="/post/:postId" exact component={PostUpdate} />

        <Route path="/qna" exact component={Qna} />
        <Route path="/qna/add" exact component={QnaForm} />

        <Route path="/confirm/:userId" exact component={Confirm} />


      </Switch>
    </Router>
  )
}
const App = () => {




  return (
    <StoreProvider store={store}>
      <AppMain />

    </StoreProvider>

  );
}
export default App;
