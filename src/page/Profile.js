import React, { useState, useCallback, useEffect } from 'react';

import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input, Collapse, Alert, Form, Divider, Menu, Table, TimePicker } from 'antd';
import { ExclamationCircleFilled, SearchOutlined, QuestionCircleFilled, ExclamationCircleOutlined, QuestionCircleOutlined, EditOutlined, OrderedListOutlined, QuestionOutlined, SnippetsOutlined, ProfileOutlined, HistoryOutlined } from '@ant-design/icons';
import { useMediaQuery } from "react-responsive"
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST, USER_UPDATE_REQUEST } from '../actions/types';
import { Link, withRouter } from "react-router-dom";
import KakaoSocialLogin from '../components/auth/KakaoSocialLogin'
import User from '../components/auth/User';
import { checkPhonenumber, checkPassword } from '../util/authCheck'
import { Reveal, Fade } from 'react-reveal';

const TextInput = ({ value }) => {
    return (
        <div>{value}</div>
    )
};

TextInput.propTypes = {
    value: PropTypes.string,
};

const Profile = ({ history }) => {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });
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
            return alert('????????? ????????? ?????? ??????????????????')
        if (password !== '' && password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (phone === '' && password === '') {
            return alert('?????????????????? ????????????.')
        }
        // else if (!checkPhonenumber(phone))
        //     return alert('??????????????? ?????? ??????????????????.')
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
                <div className='boardContainer'>
                    <div className='dummy'></div>
                    <div className='boardTop'>
                        <span className='size30 bold'><ProfileOutlined style={{ color: '#1C4FA1', marginRight: 10 }} />????????????</span>
                    </div>

                    <div className='boardMiddle'>
                        {isPc &&
                            <div className='adminContainer'>
                                <Menu
                                    // onClick={history.replace(`/post/`)}
                                    // style={{ width: 256 }}
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    mode="inline"
                                >
                                    <Menu.Item key="1" icon={<HistoryOutlined style={{ marginRight: 5 }} />}>
                                        <Link to='/invoice'>
                                            ????????????
                                    </Link>
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<QuestionCircleOutlined style={{ marginRight: 5 }} />}>
                                        <Link to='/qna'>
                                            ????????????
                                </Link>
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<ProfileOutlined style={{ marginRight: 5 }} />}>
                                        <Link to='/profile'>
                                            ????????????
                                </Link>
                                    </Menu.Item>
                                </Menu>
                            </div>
                        }
                        <div className={isPc ? 'collapseContainer' : 'collapseContainerM'}>
                        <div className='dummy'></div>
                        <div className='dummy'></div>


                            <Fade bottom>

                                <div className='modProfile'>
                            <Divider orientation='left'>???????????? ??????</Divider>
                                    <Form onFinish={onSubmit}>
                                        <div>
                                            <label htmlFor="user-email">?????????</label>
                                            <br />
                                            <Input name="user-email" type="email" value={me.email} disabled />
                                        </div>

                                        <div>
                                            <label htmlFor="user-password">????????????</label>
                                            <br />
                                            <Input name="user-password" type="password" value={password} onChange={onChangePassword} />
                                        </div>

                                        <div>
                                            <label htmlFor="user-password-check">??????????????????</label>
                                            <br />
                                            <Input
                                                name="user-password-check"
                                                type="password"
                                                value={passwordCheck}

                                                onChange={onChangePasswordCheck}
                                            />
                                            {passwordError && <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage>}
                                        </div>

                                        <div>
                                            <label htmlFor="user-phone">???????????????</label>
                                            <br />
                                            <Input name="user-phone" type="phone" value={me && phone === '' ? me.phone : phone} required onChange={onChangePhone} />
                                        </div>


                                        <div style={{ marginTop: 10 }}>
                                            <Button type="primary" htmlType="submit" loading={profileUpdateLoading}>????????????</Button>
                                        </div>
                                    </Form>
                                </div>
                            </Fade>
                        </div>
                    </div>



                </div>


            </AppLayout>
        </User>
    );
};

export default withRouter(Profile);