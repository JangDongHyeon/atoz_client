import React, { useEffect, } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { ANSWER_GET_REQUEST } from '../../actions/types';
import AnswerCard from '../../components/answer/AnswerCard';
import User from '../../components/auth/User';
import Admin from '../../components/auth/Admin';
import useInput from '../../hooks/useInput';
import { Switch } from 'antd';
const AdminAnswer = props => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { loadAnswersLoading, answers, hasMoreAnswers } = useSelector((state) => state.answer);
    const [answerMode, onChangeAnswerMode, setAnswerMode] = useInput('proceeding');

    useEffect(() => {
        dispatch({
            type: ANSWER_GET_REQUEST,
            data: { check: false, lastId: 0, state: answerMode }
        })
    }, [me])

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreAnswers && !loadAnswersLoading) {

                    const lastId = answers[answers.length - 1]?.id;
                    dispatch({
                        type: ANSWER_GET_REQUEST,
                        data: { lastId, check: true, state: answerMode },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreAnswers, loadAnswersLoading, answers]);

    const onChangeMode = (checked) => {
        if (checked) {
            setAnswerMode('proceeding')
            dispatch({
                type: ANSWER_GET_REQUEST,
                data: { check: false, lastId: 0, state: 'proceeding' }
            })
        }
        else {
            setAnswerMode('complete')
            dispatch({
                type: ANSWER_GET_REQUEST,
                data: { check: false, lastId: 0, state: 'complete' }
            })
        }
    }


    return me && (
        <Admin>
            <AppLayout>
                <Switch defaultChecked onChange={onChangeMode} />
                {answers.length > 0 && answers.map((answer, i) => <AnswerCard key={i} answer={answer} mode={answerMode} />)}
            </AppLayout>
        </Admin>
    );
};

AdminAnswer.propTypes = {

};

export default AdminAnswer;