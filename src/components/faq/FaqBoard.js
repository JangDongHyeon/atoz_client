import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input,Collapse,Popconfirm, Divider   } from 'antd';
import {
    RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,ExclamationCircleOutlined,FormOutlined,DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FAQ_DELETE_REQUEST } from '../../actions/types';
import { Route, Link, withRouter } from 'react-router-dom';
import { useMediaQuery } from "react-responsive"
import logo2 from '../../assets/logo2.png'
import FaqUpdate from './FaqUpdate';

moment.locale('ko')

const FaqBoard =  ({  index, history ,faqs,}) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const role = useSelector((state) => state.user.me?.role);
    const removeFaqLoading = useSelector((state) => state.faq.deleteFaqsLoading);
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
    const onRemovePost = (faq) => {
        console.log('asdfasd')
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        message.success('삭제 되었습니다.');
        dispatch({
            type: FAQ_DELETE_REQUEST,
            data: { faqId: faq.id }
        });
        // window.location.reload();


    };

        
    
    const onUpdate = (faq) => {
        // e.stoppropagation()
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        history.replace(`/faq/${faq.id}`);
    };

    function cancel(e) {
        console.log(e);
        message.error('취소 되었습니다.');
      }
    
    const { Panel } = Collapse;


    const renderPanel=(faq,index)=>{

        const renderHeader=(faq,index)=>(
            <>
            {isPc&&
            <div className ='renderHeader'>
            <div className='headerTop'>
                <div>
                    {/* <img src={logo2} style={{ width: 25, height: 25, marginRight: 10 }} />
                    <span className='bold'>에이투지</span> */}
                    <Avatar size={25}  style={{ color: '#F0194F', backgroundColor: '#F9D1DB', marginRight: 10, marginLeft: 0 }}>{faq.User.name}</Avatar>
                    <span className='bold'>{faq.User.name}</span>
                </div>
                <span className='size14 gray1' style={{marginLeft:10}}>{moment(faq.createdAt).format('YYYY-MM-DD')}</span>

            </div>
            <div className='headerMiddle'>
           {/* <span className='indexNumber'>{index+1}</span> */}
            <span className='ellipsis'>{faq.title}</span>
            </div>
            {/* <div className='ellipsis'  dangerouslySetInnerHTML={{ __html: post.content}}/> */}

        </div>
            }
            {(isMobile||isTablet)&&
            <div className ='renderHeaderM'>
                <div>
                <img src={logo2} style={{ width: 25, height: 25, marginRight: 10 }} />
                <span className='size14 gray1'>{moment(faq.createdAt).format('YYYY-MM-DD')}</span>
             </div>
             <div className='renderHeaderSubM'>
                {/* <span className='indexNumber'>{index}</span> */}
                <span className='ellipsis'>{faq.title}</span>
             </div>

         </div>
            
            }

            </>
        )
        
    const handleUpdate=(faq)=>{
        setUpdateValue(faq)
        setIsModalVisibleUpdate(true)
    }
        return(
            <Panel header={renderHeader(faq, index)} key={index}>
                {/* <div>
                {post.PImages[0]&&
                    post.PImages.map((item)=>(
                        <img src={`http://155.230.95.97:50001/${item.src}`} alt={item.src} />
                    ))
                }
                </div> */}
                <div dangerouslySetInnerHTML={{ __html: faq.content}}/>
               
                    {id &&role&& (faq.User.id === id ||role === 'admin')
                                ? (
                                    <div style={{ textAlign:'right'}}>
                                        <Divider/>

                                        <button className='nudeButton' onClick={(e)=>handleUpdate(faq)}><span className='size14'><FormOutlined />수정</span></button>
                                        <Divider type='vertical'/>
                                        <Popconfirm
                                            title="정말 삭제 하시겠습니까?"
                                            onConfirm={(e)=>onRemovePost(faq)}
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
                    <span className='bold size18'>자주하는질문 수정</span>
                </div>
                <Divider />
                <FaqUpdate faq={updateValue} setIsModalVisibleUpdate={setIsModalVisibleUpdate}/>
            </Modal>
            <Collapse accordion style={{ width: '100%' }}
            // expandIcon={({ isActive }) => <ExclamationCircleFilled rotate={isActive ? 90 : 0} style={{fontSize:30, color:'#cfcfcf',backgroundColor:'#fff'}}/>}
            >
                {faqs.map((item, index) =>
                    renderPanel(item, index))}
                {/* <p>{moment(post.createdAt).format('YYYY.MM.DD')}</p> */}

            </Collapse>
        </>
    );
};

FaqBoard.propTypes = {

};

export default withRouter(FaqBoard);