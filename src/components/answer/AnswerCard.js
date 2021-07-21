import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Modal, Input, Comment } from 'antd';
import {
    RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ANSWER_DELETE_REQUEST, QNA_DELETE_REQUEST } from '../../actions/types';
import { Route, Link, withRouter } from 'react-router-dom';
import AnswerForm from './AnswerForm';
moment.locale('ko')
const AnswerCard = ({ answer, history, mode }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const role = useSelector((state) => state.user.me?.role);
    const removeAnsweraLoading = useSelector((state) => state.answer.deleteAnswerasLoading);
    const removeQnaLoading = useSelector((state) => state.qna.deleteQnasLoading);

    const onRemoveQna = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: QNA_DELETE_REQUEST,
            data: { qnaId: answer.id }
        });
    }, [id, answer]);

    const onUpdateQna = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        history.replace(`/qna/${answer.id}`);
    }, [id, answer]);


    const onRemoveAnswera = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ANSWER_DELETE_REQUEST,
            data: { answerId: answer.Answer.id, questionId: answer.id }
        });
    }, [id, answer]);

    const onUpdateAnswer = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        history.replace(`/answer/${answer.Answer.id}`);
    }, [id, answer]);


    return (
        <div style={{ marginBottom: 20 }}>

            <Comment
                // cover={answer.PImages[0] && <AnsweraImage images={answer.Images} />}
                actions={[

                    <Popover
                        key="more"
                        content={(
                            <Button.Group>

                                {id && role && (answer.User.id === id || role === 'admin')
                                    ? (
                                        <>

                                            <Button type="danger" loading={removeQnaLoading} onClick={onRemoveQna}>삭제</Button>
                                            <Button type="primary" onClick={onUpdateQna}>업데이트</Button>
                                        </>
                                    )
                                    : <></>}
                            </Button.Group>
                        )}
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                author={answer.User.name}
                datetime={<p>{moment(answer.createdAt).format('YYYY.MM.DD')}</p>}
                content={
                    <>

                        <b>{answer.title}</b>
                        <br></br>

                        <p>
                            {answer.content}
                        </p>

                    </>
                }
            >

                {mode !== 'complete' && !answer.Answer && <AnswerForm question={answer} />}
                <p>{answer.Answer && answer.Answer.title}</p>
                <p>{answer.Answer && answer.Answer.content}</p>
                <p>{answer.Answer && moment(answer.Answer.createdAt).format('YYYY.MM.DD')}</p>
                {mode === 'complete' && id && role && (answer.User.id === id || role === 'admin')
                    ? (
                        <>

                            <Button type="danger" loading={removeAnsweraLoading} onClick={onRemoveAnswera}>삭제</Button>
                            <Button type="primary" onClick={onUpdateAnswer}>업데이트</Button>
                        </>
                    )
                    : <></>}
            </Comment>

        </div>
    );
};

AnswerCard.propTypes = {

};

export default withRouter(AnswerCard);