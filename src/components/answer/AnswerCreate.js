import { Button, Form, Input,message } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { ANSWER_ADD_REQUEST } from '../../actions/types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState,convertToRaw  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const AnswerCreate = ({ question }) => {
    const dispatch = useDispatch();
    const { addAnswerDone, addAnswerLoading } = useSelector((state) => state.answer);
    const id = useSelector((state) => state.user.me?.id);
    const [answerText, onChangeAnswerText, setAnswerText] = useInput('');
    const [answerTitle, onChangeAnswerTitle, setAnswerTitle] = useInput('');

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    useEffect(() => {
        if (addAnswerDone) {
            setAnswerText('');
            setAnswerTitle('')
        }
    }, [addAnswerDone]);

    const onSubmitAnswer = useCallback(() => {
        console.log(editorToHtml.trim()==='<p></p>');
        // let replaced = editorToHtml.replace(/<p[^>]*>/g, "");
        // console.log('answerText',replaced)
        // if ((replaced[0]==='<'&&replaced[1]==='/')||replaced[0]==='' ){
        if(editorToHtml.trim()==='<p></p>' || editorToHtml===''){
            return message.error('내용을 입력해주세요')
        }
        else{
            dispatch({
                type: ANSWER_ADD_REQUEST,
                data: { title: answerTitle, content: answerText, questionId: question.id },
            });
            setAnswerText('');
            setAnswerTitle('')
            setEditorState(EditorState.createEmpty())
        }

    }, [answerText, id]);

    useEffect(()=>{
        setAnswerText(editorToHtml)
    },[editorToHtml])

    const onEditorStateChange = (editorState) => {
        console.log(editorState)
        setEditorState(editorState);
    };
    return (
        <Form>
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
                            // uploadCallback: _uploadImageCallBack,
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

                {/* <Form style={{ display:'flex', justifyContent:'flex-end'}} encType="multipart/form-data" onFinish={onSubmitAnswer}> */}
                    <Button type="primary" style={{float:'right', marginBottom:20 }} htmlType="submit" onClick={onSubmitAnswer}>등록</Button>
            {/* </Form> */}
            </div>
</Form>

    );
};

AnswerCreate.propTypes = {
    question: PropTypes.object.isRequired,
};

export default AnswerCreate;