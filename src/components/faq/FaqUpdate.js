import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FAQ_ADD_RESET, FAQ_READ_REQUEST, FAQ_REMOVE_IMAGE, FAQ_REMOVE_UPDATE_IMAGE_REQUEST, FAQ_UPDATE_REQUEST, FAQ_UPLOAD_IMAGES_REQUEST } from '../../actions/types';
import { withRouter } from 'react-router-dom';
import AppLayout from '../AppLayout';
import Admin from '../auth/Admin';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState,convertToRaw,ContentState  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';

const FaqUpdate = ({ history, match, faq,setIsModalVisibleUpdate }) => {
    const { imagePaths, updateFaqsDone } = useSelector(state => state.faq);
    const { me } = useSelector((state) => state.user);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    const dispatch = useDispatch();
    const imageInput = useRef();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    useEffect(() => {
        if (faq) {
            setText(faq.content)
            setTitle(faq.title)
        }
    }, [faq]);

    useEffect(() => {

        dispatch({
            type: FAQ_READ_REQUEST,
            // data: { postId: match.params.postId }
            data: { faqId:faq.id }
        })


    }, [me, faq]);

    useEffect(() => {
        if (updateFaqsDone) {
            setText('');
            setTitle('');
            history.replace('/faq');
            dispatch({
                type: FAQ_ADD_RESET
            })

        }
    }, [updateFaqsDone]);

    // const onClickImageUpload = useCallback(() => {
    //     imageInput.current.click();
    // }, [imageInput.current]);

    // const onChangeText = useCallback((e) => {
    //     setText(e.target.value);
    // }, []);

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);


    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('???????????? ???????????????.');
        }
        if (!title || !title.trim()) {
            return alert('????????? ???????????????.');
        }
        const formData = new FormData();
        // console.log(imagePaths)
        // imagePaths.forEach((p) => {
        //     formData.append('image', p);
        // });

        formData.append('content', text);
        formData.append('title', title);
        // formData.append('postId', match.params.postId)
        formData.append('faqId', faq.id)
        dispatch({
            type: FAQ_UPDATE_REQUEST,
            data: formData,
        });
        setIsModalVisibleUpdate(false)
        window.location.reload();

    }, [text, imagePaths, title,faq]);

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
        axios.post('/faq/images', imageFormData).then(v=>{
            resolve({ data: { link:`http://155.230.95.97:50001/${v.data[0]}`} });
        }
        );
        });

    }
    useEffect(()=>{
        if(faq){
        const contentBlock = htmlToDraft(`<div>${faq.content}</div>`);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState)
        }
    },[faq])

    useEffect(()=>{
        setText(editorToHtml)
    },[editorToHtml])

    const onEditorStateChange = (editorState) => {
        console.log(editorState)
        setEditorState(editorState);
    };
    return me && (
        <Admin>
            <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
                <Input value={title} onChange={onChangeTitle} maxLength={140} placeholder="????????? ???????????????" />
                
            </Form>
            <div>
                <Editor
                    style={{minHeight:500}}
                    // ???????????? ?????? ????????? ???????????? ?????????
                    wrapperClassName="wrapper-class"
                    // ????????? ????????? ????????? ?????????
                    editorClassName="editor"
                    // ?????? ????????? ????????? ?????????
                    toolbarClassName="toolbar-class"
                    // ?????? ??????
                    toolbar={{
                        // inDropdown: ?????? ????????? ????????? ????????? ?????????????????? ??????????????????
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
                    placeholder="????????? ??????????????????."
                    // ????????? ??????
                    localization={{
                        locale: 'ko',
                    }}
                    // ????????? ??????
                    editorState={editorState}
                    // ???????????? ?????? ????????? ????????? onEditorStateChange ??????
                    onEditorStateChange={onEditorStateChange}
                />
            </div>
            <Form style={{ display:'flex', justifyContent:'flex-end'}} encType="multipart/form-data" onFinish={onSubmit}>
                    <Button type="primary" style={{ }} htmlType="submit">??????</Button>
            </Form>
        </Admin>
    );
};

FaqUpdate.propTypes = {

};

export default withRouter(FaqUpdate);
