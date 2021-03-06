import React, { useState, useCallback, useEffect } from 'react';

import { Form, Input, Checkbox, Button, Divider } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../actions/types';
import { withRouter } from "react-router-dom";
import KakaoSocialLogin from '../components/auth/KakaoSocialLogin'
import { checkPhonenumber, checkPassword, checkEmail } from '../util/authCheck'
import { UserAddOutlined, SearchOutlined, QuestionCircleFilled, ExclamationCircleOutlined, QuestionCircleOutlined, EditOutlined, ExclamationOutlined, QuestionOutlined, SnippetsOutlined } from '@ant-design/icons';
import google from '../assets/google.png'
const ErrorMessage = styled.div`
  color: red;
`;

const TextInput = ({ value }) => {
    return (
        <div>{value}</div>
    )
};

TextInput.propTypes = {
    value: PropTypes.string,
};

const Signup = ({ history }) => {
    console.log(history)
    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

    useEffect(() => {
        if (me && me.id) {
            history.replace('/');
        }
    }, [me && me.id]);

    useEffect(() => {
        if (signUpDone) {

            history.replace('/');
        }
    }, [signUpDone]);

    useEffect(() => {
        if (signUpError) {
            alert(signUpError);
        }
    }, [signUpError]);

    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const [email, onChangeEmail] = useInput('');
    const [name, onChangeName] = useInput('');
    const [password, onChangePassword] = useInput('');



    const onSubmit = useCallback(() => {

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }

        if (!checkEmail(email))
            return alert('????????? ????????? ????????????.')
        // else if(checkPassword(password)){
        //     return alert('???????????? ????????? ????????????.')
        // }


        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, name },
        });
    }, [email, password, passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    return (
        <AppLayout>
            <div className='signupContainer'>
                <div className='dummy'></div>
                <div className='signupTop'>
                    {/* {isPc&&<Fade Reveal><img src = {backgound} style={{position:'absolute', top:40, right:0, width:1000, zIndex:0}}/></Fade>} */}
                    <span className='size30 bold'><UserAddOutlined style={{ color: '#1C4FA1', marginRight: 10 }} />????????????</span>
                    <div className='subTitle'>
                        <p>??????????????? ?????????, ?????? ?????????, ???????????? ???</p><p> ??????????????? ????????? BIG data ???????????? ????????? ???????????? ??? ????????????. </p>

                    </div>
                </div>

                <div>

                {/* <Divider orientation='left'></Divider> */}
                <Form className='signupForm' onFinish={onSubmit}>
                    <div>                
                <Divider orientation='left'>SNS ??????</Divider>
                <div className='snsSignup'>
                    <KakaoSocialLogin circle={true}/>


                </div>
                <Divider orientation='left'>e-mail ??????</Divider>
                        <label htmlFor="user-email">?????????<span style={{color:'red'}}>*</span></label>
                        <br />
                        <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} placeholder='e-mail'/>
                    </div>
                    <div>
                        <label htmlFor="user-nick">?????????<span style={{color:'red'}}>*</span></label>
                        <br />
                        <Input name="user-nick" value={name} required onChange={onChangeName} />
                    </div>
                    <div>
                        <label htmlFor="user-password">????????????<span style={{color:'red'}}>*</span></label>
                        <br />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword} placeholder='????????????'/>
                        <Input
                            name="user-password-check"
                            type="password"
                            value={passwordCheck}
                            required
                            onChange={onChangePasswordCheck}
                            placeholder='???????????? ??????'
                            style={{margin: '5px 0'}}
                        />
                        {passwordError && <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage>}
                    </div>

                    <div className='terms'>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>?????? ??????</Checkbox>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>??????1 ??????</Checkbox>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>??????2 ??????</Checkbox>
                        {termError && <ErrorMessage>????????? ??????????????? ?????????.</ErrorMessage>}
                    </div>
                    <div className='horizontalCenter' style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>????????????</Button>
                    </div>
                </Form>
                </div>
            </div>
        </AppLayout>
    );
};

export default withRouter(Signup);