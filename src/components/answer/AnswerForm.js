import { Button, Form, Input } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { ANSWER_ADD_REQUEST } from '../../actions/types';


const AnswerForm = ({ question }) => {
    const dispatch = useDispatch();
    const { addAnswerDone, addAnswerLoading } = useSelector((state) => state.answer);
    const id = useSelector((state) => state.user.me?.id);
    const [answerText, onChangeAnswerText, setAnswerText] = useInput('');
    const [answerTitle, onChangeAnswerTitle, setAnswerTitle] = useInput('');

    useEffect(() => {
        if (addAnswerDone) {
            setAnswerText('');
            setAnswerTitle('')
        }
    }, [addAnswerDone]);

    const onSubmitAnswer = useCallback(() => {
        dispatch({
            type: ANSWER_ADD_REQUEST,
            data: { title: answerTitle, content: answerText, questionId: question.id },
        });
        setAnswerText('');
        setAnswerTitle('')
    }, [answerTitle, answerText, id]);


    return (
        <Form onFinish={onSubmitAnswer}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea rows={4} value={answerTitle} onChange={onChangeAnswerTitle} />
                <Input.TextArea rows={4} value={answerText} onChange={onChangeAnswerText} />
                <Button

                    type="primary"
                    htmlType="submit"
                    loading={addAnswerLoading}
                >
                    등록
                </Button>
            </Form.Item>
        </Form>
    );
};

AnswerForm.propTypes = {
    question: PropTypes.object.isRequired,
};

export default AnswerForm;