import React, { useCallback,useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input,Collapse,Popconfirm, Divider} from 'antd';
import {
    RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,ExclamationCircleOutlined,FormOutlined,DeleteOutlined, EditOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ANSWER_DELETE_REQUEST, QNA_DELETE_REQUEST } from '../../actions/types';
import { Route, Link, withRouter } from 'react-router-dom';
import AnswerCreate from './AnswerCreate';
import { useMediaQuery } from "react-responsive"
import logo2 from '../../assets/logo2.png'
moment.locale('ko')
const AnswerBoard = ({ answers, history, mode }) => {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const role = useSelector((state) => state.user.me?.role);
    const removeAnsweraLoading = useSelector((state) => state.answer.deleteAnswerasLoading);
    const removeQnaLoading = useSelector((state) => state.qna.deleteQnasLoading);
    const [isVisibleUpdate, setIsVisibleUpdate] = useState({})
    const [updateValue, setUpdateValue]= useState('')
    console.log('answers.lengthanswers.length',answers.length)

    function cancel(e) {
        console.log(e);
        message.error('취소 되었습니다.');
      }

    const onRemoveQna = (answer) => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        message.success('삭제 되었습니다.');
        return dispatch({
            type: QNA_DELETE_REQUEST,
            data: { qnaId: answer.id }
        });
    }

    const onUpdateQna = (answer) => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        history.replace(`/qna/${answer.id}`);
    }


    const onRemoveAnswera = (answer) => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ANSWER_DELETE_REQUEST,
            data: { answerId: answer.Answer.id, questionId: answer.id }
        });
    }

    const onUpdateAnswer = (answer) => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        history.replace(`/answer/${answer.Answer.id}`);
    }

    const { Panel } = Collapse;
    const renderPanel=(answer,index)=>{

        const renderHeader=(answer,index)=>(
            <>
            {isPc&&
            <div className ='renderHeader'>
                <div className='headerTop'>
                    <div>
                        {/* <img src={logo2} style={{ width: 25, height: 25, marginRight: 10 }} /> */}
                        <Avatar size={25}  style={{ color: '#1C4FA1', backgroundColor: '#AEE2FF', marginRight: 10, marginLeft: 0 }}>{answer.User.name}</Avatar>
                        <span className='bold'>{answer.User.name}</span>
                    </div>
                    <span className='size14 gray1' style={{marginLeft:10}}>{moment(answer.createdAt).format('YYYY-MM-DD')}</span>

                </div>
                <div className='headerMiddle'>
               {/* <span className='indexNumber'>{index+1}</span> */}
                <span className='ellipsis'>{answer.title}</span>
                </div>
                {/* <div className='ellipsis'  dangerouslySetInnerHTML={{ __html: answer.content}}/> */}

            </div>
            }
            {(isMobile||isTablet)&&
            <div className ='renderHeaderM'>
                <div>
                    <Avatar size={25}  style={{ color: '#1C4FA1', backgroundColor: '#AEE2FF', marginRight: 10, marginLeft: 0 }}>{answer.User.name}</Avatar>
                    <span className='size14 gray1'>{moment(answer.createdAt).format('YYYY-MM-DD')}</span>
             </div>
             <div className='renderHeaderSubM'>
                {/* <span className='indexNumber'>{index}</span> */}
                <span className='ellipsis'>{answer.title}</span>
             </div>

         </div>
            
            }

            </>
        )

    const handleUpdate=(answer)=>{
        setUpdateValue(answer)
        let temp = {}
        temp[answer.id]=true
        setIsVisibleUpdate(temp)
    console.log(isVisibleUpdate)
}
        return(
            <Panel header={renderHeader(answer, index)} key={index}>
                {/* <div>
                {answer.PImages[0]&&
                    answer.PImages.map((item)=>(
                        <img src={`http://155.230.95.97:50001/${item.src}`} alt={item.src} />
                    ))
                }
                </div> */}
                <div dangerouslySetInnerHTML={{ __html: answer.content}}/>
                <Divider orientation="left" plain>
                    답변
                </Divider>               
                    <div class='answerContainer'  dangerouslySetInnerHTML={{__html: answer.Answer && answer.Answer.content}}></div>
                    
                    {mode !== 'complete' && !answer.Answer && <AnswerCreate question={answer}/>}
                    {/*업데이트 교체하기*/}
                    {isVisibleUpdate[answer.id] &&<AnswerCreate question={answer}/>}

                    {id &&role&& (answer.User.id === id ||role === 'admin')
                    
                                ? (mode=='complete'&&
                                    <div style={{ textAlign:'right'}}>
                                        <Divider/>

                                        <button className='nudeButton' onClick={(e)=>handleUpdate(answer)}><span className='size14'><FormOutlined />답변수정</span></button>
                                        <Divider type='vertical'/>
                                        <Popconfirm
                                            title="정말 삭제 하시겠습니까?"
                                            onConfirm={(e)=>onRemoveQna(answer)}
                                            onCancel={cancel}
                                            okText="네"
                                            cancelText="아니오"
                                        >
                                        <a href="#"><DeleteOutlined /><span className='size14'>삭제</span></a>
                                        </Popconfirm>
                                    </div>
                                )
                                : <></>}
            </Panel>
        )
    }
    return (
        <>
        {answers.length>0 &&
            <Collapse accordion style={{ width: '100%' }}
            // expandIcon={({ isActive }) => <ExclamationCircleFilled rotate={isActive ? 90 : 0} style={{fontSize:30, color:'#cfcfcf',backgroundColor:'#fff'}}/>}
            >
                {answers.map((item, index) =>
                    renderPanel(item, index))
                }


            </Collapse>
}

        </>
    );
};

AnswerBoard.propTypes = {

};

export default withRouter(AnswerBoard);