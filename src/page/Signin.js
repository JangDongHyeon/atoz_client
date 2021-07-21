import React, { useState, useCallback, useEffect } from 'react';

import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../actions/types';
import { withRouter } from "react-router-dom";
import KakaoSocialLogin from '../components/auth/KakaoSocialLogin'
import { checkPhonenumber, checkPassword, checkEmail } from '../util/authCheck'
const TextInput = ({ value }) => {
    return (
        <div>{value}</div>
    )
};

TextInput.propTypes = {
    value: PropTypes.string,
};

const Signin = ({ history }) => {


    const dispatch = useDispatch();
    const { logInLoading, logInDone, logInError, me } = useSelector((state) => state.user);

    useEffect(() => {
        if (me && me.id) {
            history.replace('/');
        }
    }, [me && me.id]);

    useEffect(() => {
        if (logInDone) {

            history.replace('/');
        }
    }, [logInDone]);

    useEffect(() => {
        if (logInError) {
            alert(logInError);
        }
    }, [logInError]);




    const [email, onChangeEmail] = useInput('');

    const [password, onChangePassword] = useInput('');



    const onSubmit = useCallback(() => {
        if (!checkEmail(email))
            return alert('이메일 형식이 틀립니다.')
        // else if(checkPassword(password)){
        //     return alert('비밀번호 형식이 틀립니다.')
        // }
        dispatch({
            type: LOG_IN_REQUEST,
            data: { email, password },
        });
    }, [email, password]);



    return (
        <AppLayout>

            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
                </div>

                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>


                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                </div>
            </Form>
            <KakaoSocialLogin />
        </AppLayout>
    );
};

export default withRouter(Signin);