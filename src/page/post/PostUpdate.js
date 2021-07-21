import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { POST_ADD_RESET, POST_READ_REQUEST, POST_REMOVE_IMAGE, POST_REMOVE_UPDATE_IMAGE_REQUEST, POST_UPDATE_REQUEST, POST_UPLOAD_IMAGES_REQUEST } from '../../actions/types';
import { withRouter } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import Admin from '../../components/auth/Admin';
const PostUpdate = ({ history, match }) => {
    const { imagePaths, updatePostsDone, post } = useSelector(state => state.post);
    const { me } = useSelector((state) => state.user);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    const dispatch = useDispatch();
    const imageInput = useRef();

    useEffect(() => {
        if (post) {

            setText(post.content)
            setTitle(post.title)


        }
    }, [post]);

    useEffect(() => {

        dispatch({
            type: POST_READ_REQUEST,
            data: { postId: match.params.postId }
        })


    }, [me]);

    useEffect(() => {
        if (updatePostsDone) {
            setText('');
            setTitle('');
            history.replace('/post');
            dispatch({
                type: POST_ADD_RESET
            })
          
        }
    }, [updatePostsDone]);

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
        formData.append('postId', match.params.postId)
        return dispatch({
            type: POST_UPDATE_REQUEST,
            data: formData,
        });
    }, [text, imagePaths, title]);
    const onRemoveImage = useCallback((index, p) => () => {
        dispatch({
            type: POST_REMOVE_IMAGE,
            data: index,
        });
        if (p)
            if (p.id)
                dispatch({
                    type: POST_REMOVE_UPDATE_IMAGE_REQUEST,
                    data: { postId: p.id },
                })

    }, []);
    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: POST_UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    return me && (
        <Admin>
            <AppLayout>
                <div className='formContainer'>
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
                    </div>
            </AppLayout>
        </Admin>
    );
};

PostUpdate.propTypes = {

};

export default withRouter(PostUpdate);