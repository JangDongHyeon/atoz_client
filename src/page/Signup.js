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
            return alert('이메일 형식이 틀립니다.')
        // else if(checkPassword(password)){
        //     return alert('비밀번호 형식이 틀립니다.')
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
                    <span className='size30 bold'><UserAddOutlined style={{ color: '#1C4FA1', marginRight: 10 }} />회원가입</span>
                    <div className='subTitle'>
                        <p>회원가입을 하시면, 평균 운송료, 지연사례 등</p><p> 인공지능을 이용한 BIG data 서비스를 무료로 이용하실 수 있습니다. </p>

                    </div>
                </div>

                <div>

                {/* <Divider orientation='left'></Divider> */}
                <Form className='signupForm' onFinish={onSubmit}>
                    <div>                
                <Divider orientation='left'>SNS 가입</Divider>
                <div className='snsSignup'>
                    <KakaoSocialLogin circle={true}/>


                </div>
                <Divider orientation='left'>e-mail 가입</Divider>
                        <label htmlFor="user-email">이메일<span style={{color:'red'}}>*</span></label>
                        <br />
                        <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} placeholder='e-mail'/>
                    </div>
                    <div>
                        <label htmlFor="user-nick">닉네임<span style={{color:'red'}}>*</span></label>
                        <br />
                        <Input name="user-nick" value={name} required onChange={onChangeName} />
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호<span style={{color:'red'}}>*</span></label>
                        <br />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword} placeholder='비밀번호'/>
                        <Input
                            name="user-password-check"
                            type="password"
                            value={passwordCheck}
                            required
                            onChange={onChangePasswordCheck}
                            placeholder='비밀번호 확인'
                            style={{margin: '5px 0'}}
                        />
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </div>

                    <div className='terms'>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관 동의</Checkbox>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관1 보기</Checkbox>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관2 보기</Checkbox>
                        {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                    </div>
                    <div className='horizontalCenter' style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                    </div>
                </Form>
                </div>
            </div>
        </AppLayout>
    );
};

export default withRouter(Signup);