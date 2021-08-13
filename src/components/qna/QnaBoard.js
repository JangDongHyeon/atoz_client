import React, { useCallbackm, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input,Collapse,Popconfirm, Divider} from 'antd';
import {
    RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,ExclamationCircleOutlined,FormOutlined,DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { QNA_DELETE_REQUEST } from '../../actions/types';
import { Route, Link, withRouter } from 'react-router-dom';
import { useMediaQuery } from "react-responsive"
import logo2 from '../../assets/logo2.png'
import QnaUpdate from './QnaUpdate';

moment.locale('ko')
const QnaCard = ({ qnas, history }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const role = useSelector((state) => state.user.me?.role);
    const removeQnaLoading = useSelector((state) => state.qna.deleteQnasLoading);
    const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false)
    const [updateValue, setUpdateValue]= useState('')
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });



    const onRemoveQna = (qna) => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        message.success('삭제 되었습니다.');
        dispatch({
            type: QNA_DELETE_REQUEST,
            data: { qnaId: qna.id }
        });
    };
    function cancel(e) {
        console.log(e);
        message.error('취소 되었습니다.');
      }
    // const onUpdate = useCallback(() => {
    //     if (!id) {
    //         return alert('로그인이 필요합니다.');
    //     }
    //     history.replace(`/qna/${qna.id}`);
    // }, [id, qna]);

    const { Panel } = Collapse;


    const renderPanel=(qna,index)=>{

        const renderHeader=(qna,index)=>(
            <>
            {isPc&&
            <div className ='renderHeader'>
                <div className='headerTop'>
                    <div>
                        {/* <img src={logo2} style={{ width: 25, height: 25, marginRight: 10 }} />
                        <span className='bold'>에이투지</span> */}
                        <Avatar size={25}  style={{ color: '#1C4FA1', backgroundColor: '#AEE2FF', marginRight: 10, marginLeft: 0 }}>{qna.User.name}</Avatar>
                        <span className='bold'>{qna.User.name}</span>
                    </div>
                    <span className='size14 gray1' style={{marginLeft:10}}>{moment(qna.createdAt).format('YYYY-MM-DD')}</span>

                </div>
                <div className='headerMiddle'>
               {/* <span className='indexNumber'>{index+1}</span> */}
                <span className='ellipsis'>{qna.title}</span>
                </div>
                {/* <div className='ellipsis'  dangerouslySetInnerHTML={{ __html: qna.content}}/> */}

            </div>
            }
            {(isMobile||isTablet)&&
            <div className ='renderHeaderM'>
                <div>
                        <img src={logo2} style={{ width: 25, height: 25, marginRight: 10 }} />
             <span className='size14 gray1'>{moment(qna.createdAt).format('YYYY-MM-DD')}</span>
             </div>
             <div className='renderHeaderSubM'>
                {/* <span className='indexNumber'>{index}</span> */}
                <span className='ellipsis'>{qna.title}</span>
             </div>

         </div>
            
            }

            </>
        )
        
    const handleUpdate=(qna)=>{
        setUpdateValue(qna)
        setIsModalVisibleUpdate(true)
    }
        return(
            <Panel header={renderHeader(qna, index)} key={index}>
                {/* <div>
                {qna.PImages[0]&&
                    qna.PImages.map((item)=>(
                        <img src={`http://155.230.95.97:50001/${item.src}`} alt={item.src} />
                    ))
                }
                </div> */}
                <div dangerouslySetInnerHTML={{ __html: qna.content}}/>
               
                    {id &&role&& (qna.User.id === id ||role === 'admin')
                                ? (
                                    <div style={{ textAlign:'right'}}>
                                        <Divider/>

                                        <button className='nudeButton' onClick={(e)=>handleUpdate(qna)}><span className='size14'><FormOutlined />수정</span></button>
                                        <Divider type='vertical'/>
                                        <Popconfirm
                                            title="정말 삭제 하시겠습니까?"
                                            onConfirm={(e)=>onRemoveQna(qna)}
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
            <Modal visible={isModalVisibleUpdate} onCancel={(e) => setIsModalVisibleUpdate(false)} width={600}>
                <div className='modalTop'>
                    <img src={logo2} style={{ width: 30, height: 30, marginRight: 10 }} />
                    <span className='bold size18'>질문 수정</span>
                </div>
                <Divider />
                <QnaUpdate qnaa={updateValue} setIsModalVisibleUpdate={setIsModalVisibleUpdate}/>
            </Modal>
            <Collapse accordion style={{ width: '100%' }}
            // expandIcon={({ isActive }) => <ExclamationCircleFilled rotate={isActive ? 90 : 0} style={{fontSize:30, color:'#cfcfcf',backgroundColor:'#fff'}}/>}
            >
                {qnas&&qnas.map((item, index) =>
                    renderPanel(item, index))}
                {/* <p>{moment(post.createdAt).format('YYYY.MM.DD')}</p> */}

            </Collapse>
        </>
    );
};

QnaCard.propTypes = {

};

export default withRouter(QnaCard);