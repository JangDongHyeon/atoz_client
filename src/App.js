import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as StoreProvider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
/*global Kakao*/
import 'antd/dist/antd.css';
import Home from './page/Home';
// import Signup from './page/Signup';
// import Signin from './components/sign/Signin';
import Confirm from './page/Confirm';
import { LOAD_USER_REQUEST } from './actions/types';
import setAuthToken from './util/setAuthToken';
import axios from 'axios'
import Post from './page/post/Post';
// import PostForm from './page/post/PostForm';
import Service from './page/Service';

// import PostUpdate from './components/post/PostUpdate';
import Qna from './page/qna/Qna';
import QnaForm from './page/qna/QnaForm';
import QnaUpdate from './page/qna/QnaUpdate';
import AdminAnswer from './page/admin/AdminAnswer';
import AdminInvoice from './page/admin/AdminInvoice';

import './css/index.scss'
import InvoiceList from './page/invoice/InvoiceList';
import InvoiceRead from './page/invoice/InvoiceRead';
import Faq from './page/faq/Faq';
// import FaqForm from './page/faq/FaqForm';
// import FaqUpdate from './page/faq/FaqUpdate';
import Profile from './page/Profile';
import ForgotPassword from './page/auth/ForgotPassword';
import ResetPassword from './page/auth/ResetPassword';
import Signin from './components/sign/Signin';
import PrivateRoute from './util/PrivateRoute';
import AdminChart from './page/admin/AdminChart';
import InvoiceLike from './page/invoice/InvoiceLike';


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

        <PrivateRoute path="/profile" exact component={Profile} />

        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
        <Route path="/service" exact component={Service} />

        {/* <Route path="/signup" exact component={Signup} /> */}
        <Route path="/signin" exact component={Signin} />
        <Route path="/post" exact component={Post} />
        {/* <PrivateRoute path="/post/add" exact component={PostForm} /> */}
        {/* <PrivateRoute path="/post/:postId" exact component={PostUpdate} /> */}

        <Route path="/faq" exact component={Faq} />
        {/* <PrivateRoute path="/faq/add" exact component={FaqForm} /> */}
        {/* <PrivateRoute path="/faq/:faqId" exact component={FaqUpdate} /> */}

        <PrivateRoute path="/qna" exact component={Qna} />
        <PrivateRoute path="/qna/add" exact component={QnaForm} />
        <PrivateRoute path="/qna/:qnaId" exact component={QnaUpdate} />

        <Route path="/confirm/:userId" exact component={Confirm} />

        <PrivateRoute path="/invoice" exact component={InvoiceList} />
        <PrivateRoute path="/invoices/like" exact component={InvoiceLike} />
        <Route path="/invoice/:number" exact component={InvoiceRead} />

        <PrivateRoute path="/admin/answer" exact component={AdminAnswer} />
        <PrivateRoute path="/admin/chart" exact component={AdminChart} />
        <PrivateRoute path="/admin/invoice" exact component={AdminInvoice} />


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
