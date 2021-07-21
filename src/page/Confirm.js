import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CONFIRM_REQUEST } from '../actions/types';
import { withRouter } from "react-router-dom";
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
const Confirm = ({ match, history }) => {
    const { userId } = match.params
    const dispatch = useDispatch();
    const { confirmLoading, confirmDone, confirmError, confirmMsg } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch({
            type: CONFIRM_REQUEST,
            data: { userId },
        });
    }, [])

    useEffect(() => {
        if (confirmDone) {

            history.replace('/signin');
        }
    }, [confirmDone]);

    useEffect(() => {
        if (confirmError) {
            alert(confirmError);
        }
    }, [confirmError]);

    useEffect(() => {
        if (confirmMsg) {
            alert(confirmMsg);
        }
    }, [confirmMsg]);
    return (
        <AppLayout>

        </AppLayout>
    );
};

Confirm.propTypes = {

};

export default withRouter(Confirm);