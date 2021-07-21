import React, { useState, useCallback, useEffect } from 'react';

import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST, USER_UPDATE_REQUEST } from '../actions/types';
import { withRouter } from "react-router-dom";
import KakaoSocialLogin from '../components/auth/KakaoSocialLogin'
import User from '../components/auth/User';
import { checkPhonenumber, checkPassword } from '../util/authCheck'

const TextInput = ({ value }) => {
    return (
        <div>{value}</div>
    )
};

TextInput.propTypes = {
    value: PropTypes.string,
};

const Profile = ({ history }) => {
    const ErrorMessage = styled.div`
    color: red;
  `;

    const dispatch = useDispatch();
    const { profileUpdateLoading, profileUpdateDone, profileUpdateError, me } = useSelector((state) => state.user);

    // useEffect(() => {
    //     if (me && me.id) {
    //         history.replace('/');
    //     }
    // }, [me && me.id]);

    useEffect(() => {
        if (profileUpdateDone) {

            history.replace('/');
        }
    }, [profileUpdateDone]);

    useEffect(() => {
        if (profileUpdateError) {
            alert(profileUpdateError);
        }
    }, [profileUpdateError]);





    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [phone, onChangePhone] = useInput('');

    const [password, onChangePassword] = useInput('');



    const onSubmit = useCallback(() => {

        if (phone !== '' && !checkPhonenumber(phone))
            return alert('핸드폰 번호를 다시 입력해주세요')
        if (password !== '' && password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (phone === '' && password === '') {
            return alert('업데이트할게 없습니다.')
        }
        // else if (!checkPhonenumber(phone))
        //     return alert('비밀번호를 다시 입력해주세요.')
        dispatch({
            type: USER_UPDATE_REQUEST,
            data: { phone, password, check: true },
        });
    }, [phone, password]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);



    return me && (
        <User>
            <AppLayout>

                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor="user-email">이메일</label>
                        <br />
                        <Input name="user-email" type="email" value={me.email} disabled />
                    </div>

                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br />
                        <Input name="user-password" type="password" value={password} onChange={onChangePassword} />
                    </div>

                    <div>
                        <label htmlFor="user-password-check">비밀번호체크</label>
                        <br />
                        <Input
                            name="user-password-check"
                            type="password"
                            value={passwordCheck}

                            onChange={onChangePasswordCheck}
                        />
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="user-phone">휴대폰번호</label>
                        <br />
                        <Input name="user-phone" type="phone" value={me && phone === '' ? me.phone : phone} required onChange={onChangePhone} />
                    </div>


                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit" loading={profileUpdateLoading}>수정하기</Button>
                    </div>
                </Form>

            </AppLayout>
        </User>
    );
};

export default withRouter(Profile);