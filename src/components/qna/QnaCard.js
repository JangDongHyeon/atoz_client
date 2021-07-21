import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Modal, Input, Comment } from 'antd';
import {
    RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { QNA_DELETE_REQUEST } from '../../actions/types';
import { Route, Link, withRouter } from 'react-router-dom';
moment.locale('ko')
const QnaCard = ({ qna, history }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const role = useSelector((state) => state.user.me?.role);
    const removeQnaLoading = useSelector((state) => state.qna.deleteQnasLoading);

    const onRemoveQna = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: QNA_DELETE_REQUEST,
            data: { qnaId: qna.id }
        });
    }, [id, qna]);

    const onUpdate = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        history.replace(`/qna/${qna.id}`);
    }, [id, qna]);


    return (
        <div style={{ marginBottom: 20 }}>

            <Comment
                // cover={qna.PImages[0] && <QnaImage images={qna.Images} />}
                actions={[

                    <Popover
                        key="more"
                        content={(
                            <Button.Group>
                                {id && role && (qna.User.id === id || role === 'admin')
                                    ? (
                                        <>

                                            <Button type="danger" loading={removeQnaLoading} onClick={onRemoveQna}>삭제</Button>
                                            <Button type="primary" onClick={onUpdate}>업데이트</Button>
                                        </>
                                    )
                                    : <></>}
                            </Button.Group>
                        )}
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                author={qna.User.name}
                datetime={<p>{moment(qna.createdAt).format('YYYY.MM.DD')}</p>}
                content={
                    <>

                        <b>{qna.title}</b>
                        <br></br>

                        <p>
                            {qna.content}
                        </p>

                    </>
                }
            >
                <p>{qna.Answer && qna.Answer.title}</p>
                <p>{qna.Answer && qna.Answer.content}</p>
                <p>{qna.Answer && moment(qna.Answer.createdAt).format('YYYY.MM.DD')}</p>

            </Comment>

        </div>
    );
};

QnaCard.propTypes = {

};

export default withRouter(QnaCard);