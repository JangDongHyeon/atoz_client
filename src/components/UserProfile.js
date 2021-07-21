import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button } from 'antd';

import { LOG_OUT_REQUEST } from '../actions/types';
import { Link, withRouter } from 'react-router-dom';

const UserProfile = ({ history }) => {
    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector((state) => state.user);

    const onLogOut = useCallback((e) => {
        dispatch({
            type: LOG_OUT_REQUEST
        });
    }, []);

    const profileClick = useCallback((e) => {
        history.replace('/profile')
    }, []);



    return (
        <>
            <button className='nudeButton' onClick={(e) => profileClick(e)}>내 프로필</button>
            <button className='nudeButton' onClick={(e) => onLogOut(e)} loading={logOutLoading}>로그아웃</button>

            <button className='nudeButton'><Avatar style={{ color: '#1C4FA1', backgroundColor: '#AEE2FF' }}>{me.name}</Avatar></button>
        </>
    );
};

export default withRouter(UserProfile);