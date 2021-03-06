import React, { useState, useCallback, useEffect } from 'react';

import { Form, Input, Checkbox, Button,Modal } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../AppLayout';
import useInput from '../../hooks/useInput';
import { LOG_IN_REQUEST } from '../../actions/types';
import { Link, withRouter } from "react-router-dom";
import KakaoSocialLogin from '../auth/KakaoSocialLogin'
import ForgotPassword from '../auth/ForgotPassword'
import { Divider } from 'antd';

const TextInput = ({ value }) => {
    return (
        <div>{value}</div>
    )
};

TextInput.propTypes = {
    value: PropTypes.string,
};

const Signin = ({ history, handleOk }) => {


    const dispatch = useDispatch();
    const { logInLoading, logInDone, logInError, me } = useSelector((state) => state.user);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

        dispatch({
            type: LOG_IN_REQUEST,
            data: { email, password },
        });
        handleOk()
    }, [email, password]);

    // const onSubmit = () => {

    //     dispatch({
    //         type: LOG_IN_REQUEST,
    //         data: { email, password },
    //     });
    //     handleOk()
    // }

    const passwordFind = () => {

    }
    const moveSignUp=()=>{
        history.replace(`/signup`)
    }


    return (
        <div className='loginModalContainer'>
            <h4>로그인 후 더 많은 혜택을 누리세요!</h4>
            <br></br>
            <KakaoSocialLogin handleOk={handleOk}/>
            {/* <div style={{border:'1px solid #999'}}>구글로그인</div> */}
            <Divider />
            <Form onFinish={onSubmit}>
                <div className='loginContainer'>
                    <div className='inputContainer'>
                        <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} placeholder='이메일' />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword} placeholder='비밀번호' />
                    </div>

                    <button className='loginButton gray2' type="submit" loading={logInLoading}>로그인</button>
                </div>
            </Form>
            <div style={{ marginTop: 10 }}>
                <button className='nudeButton gray2 size14' onClick={(e)=>moveSignUp()}>회원가입</button><Divider type='vertical' />
                <button className='nudeButton gray2 size14' onClick={(e)=>{setIsModalVisible(true);handleOk()}}>비밀번호찾기</button>
                {/* <Link to="/forgot-password" className="text-danger">
                    {' '}
                    비밀번호찾기
                </Link> */}
                {/* <button className='nudeButton gray1 size14' onClick={(e)=>passwordFind(e)}>비밀번호찾기</button> */}
            </div>
            <Modal title="비밀번호 재설정" visible={isModalVisible} onOk={(e)=>setIsModalVisible(false)} onCancel={(e)=>setIsModalVisible(false)}  width={450}>
            <ForgotPassword/>
        </Modal>
        </div>
    );
};

export default withRouter(Signin);