import { Input, Button, Form } from 'antd';

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FORGOT_PASSWORD_REQUEST } from '../../actions/types';
import AppLayout from '../../components/AppLayout';
import useInput from '../../hooks/useInput';
import { checkEmail } from '../../util/authCheck';

const ForgotPassword = ({ forgotPassword }) => {
    const [email, onChangeEmail] = useInput('');

    const dispatch = useDispatch();
    const { forgotPasswordLoading, forgotPasswordDone, forgotPasswordError, forgotPasswordMsg, me } = useSelector((state) => state.user);


    useEffect(() => {
        if (forgotPasswordError) {
            alert(forgotPasswordError);
        }
    }, [forgotPasswordError]);

    useEffect(() => {
        if (forgotPasswordMsg)
            alert(forgotPasswordMsg)
    }, [forgotPasswordMsg])

    const onSubmit = useCallback(() => {
        console.log('ssssssssss')
        if (!checkEmail(email))
            return alert('이메일 형식이 틀립니다.')

        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
            data: { email },
        });
    }, [email]);



    return (
        <AppLayout>
            <h2>비밀번호 재설정 요청</h2>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={forgotPasswordLoading}>메일 보내기</Button>
                </div>
            </Form>
        </AppLayout>
    );
};


export default ForgotPassword;