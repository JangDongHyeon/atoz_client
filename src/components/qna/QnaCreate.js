import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState,convertToRaw  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import AppLayout from '../../components/AppLayout';

import { QNA_ADD_REQUEST, QNA_REMOVE_IMAGE, QNA_UPLOAD_IMAGES_REQUEST } from '../../actions/types';
import { withRouter } from 'react-router-dom';
import User from '../../components/auth/User';
import axios from 'axios';

const QnaCreate = ({ history ,setIsModalVisibleCreate }) => {
    const { imagePaths, addQnasDone } = useSelector(state => state.qna);
    const { me } = useSelector((state) => state.user);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const imageInput = useRef();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    useEffect(() => {
        if (addQnasDone) {
            setText('');
            setTitle('');
            history.replace('/qna');
        }
    }, [addQnasDone]);

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
        // imagePaths.forEach((p) => {
        //     formData.append('image', p);
        // });
        formData.append('content', text);
        formData.append('title', title);
        setIsModalVisibleCreate(false)

        dispatch({
            type: QNA_ADD_REQUEST,
            data: formData,
        });
        window.location.reload();
    }, [text, imagePaths, title]);



    const _uploadImageCallBack=(file)=>{
        return new Promise(
            (resolve, reject) => {
        console.log(file)

        console.log('images', file);
        const imageFormData = new FormData();
        // [].forEach.call(file, (f) => {
        //     imageFormData.append('image', f);
        // });
        imageFormData.append('image', file);
        axios.post('/post/images', imageFormData).then(v=>{
            resolve({ data: { link:`http://155.230.95.97:50001/${v.data[0]}`} });
        }
        );
        });

    }
    useEffect(()=>{
        setText(editorToHtml)
    },[editorToHtml])

    const onEditorStateChange = (editorState) => {
        console.log(editorState)
        setEditorState(editorState);
    };
    return  (
        <User>
            <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
                <Input value={title} onChange={onChangeTitle} maxLength={140} placeholder="제목을 입력하세요" />
                
            </Form>
            <div>
                <Editor
                    // 에디터와 툴바 모두에 적용되는 클래스
                    wrapperClassName="wrapper-class"
                    // 에디터 주변에 적용된 클래스
                    editorClassName="editor"
                    // 툴바 주위에 적용된 클래스
                    toolbarClassName="toolbar-class"
                    // 툴바 설정
                    toolbar={{
                        // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: false },
                        image: {
                            component: undefined,
                            popupClassName: undefined,
                            urlEnabled: true,
                            uploadEnabled: true,
                            alignmentEnabled: true,
                            uploadCallback: _uploadImageCallBack,
                            previewImage: false,
                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                            alt: { present: false, mandatory: false },
                            defaultSize: {
                              height: 'auto',
                              width: 'auto',
                            },
                            
                        },
                                        }}
                    placeholder="내용을 작성해주세요."
                    // 한국어 설정
                    localization={{
                        locale: 'ko',
                    }}
                    // 초기값 설정
                    editorState={editorState}
                    // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                    onEditorStateChange={onEditorStateChange}
                />
            </div>
            <Form style={{ display:'flex', justifyContent:'flex-end'}} encType="multipart/form-data" onFinish={onSubmit}>
                    <Button type="primary" style={{ }} htmlType="submit">등록</Button>
            </Form>
        </User>
    );
};

QnaCreate.propTypes = {

};

export default withRouter(QnaCreate);