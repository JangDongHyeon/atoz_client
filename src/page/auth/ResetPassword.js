import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Checkbox, Button } from 'antd';
import AppLayout from '../../components/AppLayout';
import useInput from '../../hooks/useInput';
import { withRouter } from 'react-router-dom';
import { RESET_PASSWORD_REQUEST } from '../../actions/types';


const ErrorMessage = styled.div`
  color: red;
`;
const ResetPassword = ({ match, history }) => {

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();
    const { resetPasswordError, resetPasswordDone, resetPasswordLoading } = useSelector((state) => state.user);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    useEffect(() => {
        if (resetPasswordDone) {
            alert('좋아! 이제 새 비밀번호로 로그인 할 수 있습니다.')
            history.replace('/signin');
        }
    }, [resetPasswordDone]);


    useEffect(() => {
        if (resetPasswordError) {
            alert(resetPasswordError);
        }
    }, [resetPasswordError]);

    const onSubmit = useCallback(() => {

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }



        // else if(checkPassword(password)){
        //     return alert('비밀번호 형식이 틀립니다.')
        // }


        dispatch({
            type: RESET_PASSWORD_REQUEST,
            data: { newPassword: password, resetPasswordLink: match.params.resetPasswordToken },
        });
    }, [password, passwordCheck]);




    return (
        <AppLayout>
            <h2 className="mt-5 mb-5">새로운 비밀번호를 입력해</h2>
            <Form onFinish={onSubmit}>

                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>

                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={resetPasswordLoading}>비밀번호 바꾸기</Button>
                </div>
            </Form>
        </AppLayout>
    );
};



export default withRouter(ResetPassword);