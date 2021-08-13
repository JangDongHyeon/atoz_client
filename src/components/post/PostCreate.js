import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState,convertToRaw  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Admin from '../auth/Admin';
import { POST_ADD_REQUEST, POST_ADD_RESET, POST_REMOVE_IMAGE, POST_UPLOAD_IMAGES_REQUEST } from '../../actions/types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {t} from 'react-switch-lang';

const PostCreate = ({ history, setIsModalVisibleCreate }) => {
    const { imagePaths, addPostsDone } = useSelector(state => state.post);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    useEffect(() => {
        if (addPostsDone) {

            setText('');
            setTitle('');
            history.replace('/post');
            dispatch({
                type: POST_ADD_RESET
            })
        }
    }, [addPostsDone]);

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
            type: POST_ADD_REQUEST,
            data: formData,
        });
        window.location.reload();
    }, [text, imagePaths, title,setIsModalVisibleCreate]);


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

    // useState로 상태관리하기 초기값은 EditorState.createEmpty()
    // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.

    useEffect(()=>{
        setText(editorToHtml)
    },[editorToHtml])

    const onEditorStateChange = (editorState) => {
        console.log(editorState)
        setEditorState(editorState);
    };
    return (
        <Admin>
            <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
                <Input value={title} onChange={onChangeTitle} maxLength={140} placeholder={t("titleinput")} />
                
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
                    placeholder={t("messageinput")}
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
                    <Button type="primary" style={{ }} htmlType="submit">{t('submit')}</Button>
            </Form>
        </Admin>
    );
};

PostCreate.propTypes = {

};

export default withRouter(PostCreate);