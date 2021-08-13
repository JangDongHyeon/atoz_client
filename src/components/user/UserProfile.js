import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import { LOG_OUT_REQUEST } from '../../actions/types';

const UserProfile = ({ history }) => {
    const dispatch = useDispatch();
    const { me, logOutLoading, logOutDone } = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST
        });
    }, []);

    useEffect(() => {
        if (logOutDone) {

            history.replace('/');
        }
    }, [logOutDone]);

    return (
        <Card>
            <Card.Meta
                avatar={(
                    <Link href={`/user/${me.id}`} prefetch={false}>
                        {/* <a><Avatar>{me.name[0]}</Avatar></a> */}
                    </Link>
                )}
                title={me.name}
            />
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    );
};

export default withRouter(UserProfile);