import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../../components/AppLayout';

import { QNA_ADD_RESET, QNA_READ_REQUEST, QNA_REMOVE_IMAGE, QNA_REMOVE_UPDATE_IMAGE_REQUEST, QNA_UPDATE_REQUEST, QNA_UPLOAD_IMAGES_REQUEST } from '../../actions/types';
import { withRouter } from 'react-router-dom';
import User from '../../components/auth/User';
const QnaUpdate = ({ history, match }) => {
    const { imagePaths, updateQnasDone, qna } = useSelector(state => state.qna);
    const { me } = useSelector((state) => state.user);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    const dispatch = useDispatch();
    const imageInput = useRef();

    useEffect(() => {
        if (qna) {

            setText(qna.content)
            setTitle(qna.title)


        }
    }, [qna]);

    useEffect(() => {

        dispatch({
            type: QNA_READ_REQUEST,
            data: { qnaId: match.params.qnaId }
        })


    }, [me]);

    useEffect(() => {
        if (updateQnasDone) {
            dispatch({
                type: QNA_ADD_RESET
            })
            setText('');
            setTitle('');
            history.replace('/qna');
        }
    }, [updateQnasDone]);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);


    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }
        if (!title || !title.trim()) {
            return alert('제목을 작성하세요.');
        }
        const formData = new FormData();
        console.log(imagePaths)
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });

        formData.append('content', text);
        formData.append('title', title);
        formData.append('questionId', match.params.qnaId)
        return dispatch({
            type: QNA_UPDATE_REQUEST,
            data: formData,
        });
    }, [text, imagePaths, title]);
    const onRemoveImage = useCallback((index, p) => () => {
        dispatch({
            type: QNA_REMOVE_IMAGE,
            data: index,
        });
        if (p)
            if (p.id)
                dispatch({
                    type: QNA_REMOVE_UPDATE_IMAGE_REQUEST,
                    data: { qnaId: p.id },
                })

    }, []);
    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: QNA_UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    return me && (
        <User>
            <AppLayout>
                <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
                    <Input.TextArea value={title} onChange={onChangeTitle} maxLength={140} placeholder="제목을 입력하세요" />
                    <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="내용을 입력하세요" />
                    <div>
                        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                        <Button type="primary" style={{ float: 'right' }} htmlType="submit">등록</Button>
                    </div>
                    <div>
                        {imagePaths.length > 0 && imagePaths.map((v, i) => (
                            <div key={v} style={{ display: 'inline-block' }}>
                                <img src={v.src ? `http://localhost:50001/${v.src}` : `http://localhost:50001/${v}`} style={{ width: '200px' }} alt={v} />
                                {/* <img src={v.replace(/\/thumb\//, '/original/')} style={{ width: '200px' }} alt={v} /> */}
                                <div>
                                    <Button onClick={onRemoveImage(i, v)}>제거</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Form>
            </AppLayout>
        </User>
    );
};

QnaUpdate.propTypes = {

};

export default withRouter(QnaUpdate);