import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../../components/AppLayout';
import Admin from '../../components/auth/Admin';
import { FAQ_ADD_REQUEST, FAQ_ADD_RESET, FAQ_REMOVE_IMAGE, FAQ_UPLOAD_IMAGES_REQUEST } from '../../actions/types';
import { withRouter } from 'react-router-dom';
const FaqForm = ({ history }) => {
    const { imagePaths, addFaqsDone } = useSelector(state => state.faq);
    const { me } = useSelector((state) => state.user);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const imageInput = useRef();

    useEffect(() => {
        if (addFaqsDone) {

            setText('');
            setTitle('');
            history.replace('/faq');
            dispatch({
                type: FAQ_ADD_RESET
            })
        }
    }, [addFaqsDone]);

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
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });

        formData.append('content', text);
        formData.append('title', title);
        return dispatch({
            type: FAQ_ADD_REQUEST,
            data: formData,
        });
    }, [text, imagePaths, title]);
    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: FAQ_REMOVE_IMAGE,
            data: index,
        });
    }, []);
    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: FAQ_UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    return me && (
        <Admin>
            <AppLayout>
                <div className='dummy'></div>
                <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
                    <Input.TextArea value={title} onChange={onChangeTitle} maxLength={140} placeholder="제목을 입력하세요" />
                    <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="내용을 입력하세요" />
                    <div>
                        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                        <Button type="primary" style={{ float: 'right' }} htmlType="submit">등록</Button>
                    </div>
                    <div>
                        {imagePaths.map((v, i) => (
                            <div key={v} style={{ display: 'inline-block' }}>
                                <img src={`http://localhost:50001/${v}`} style={{ width: '200px' }} alt={v} />
                                {/* <img src={v.replace(/\/thumb\//, '/original/')} style={{ width: '200px' }} alt={v} /> */}
                                <div>
                                    <Button onClick={onRemoveImage(i)}>제거</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Form>
            </AppLayout>
        </Admin>
    );
};

FaqForm.propTypes = {

};

export default withRouter(FaqForm);