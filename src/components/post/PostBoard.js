import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input,Collapse,Popconfirm, Divider} from 'antd';
import {
    RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,ExclamationCircleOutlined,FormOutlined,DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { POST_DELETE_REQUEST } from '../../actions/types';
import { Route, Link, withRouter } from 'react-router-dom';
import { useMediaQuery } from "react-responsive"
import logo2 from '../../assets/logo2.png'
import PostUpdate from './PostUpdate';
import {t} from 'react-switch-lang';

moment.locale('ko')

const PostBoard =  ({  index, history ,posts,}) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const role = useSelector((state) => state.user.me?.role);
    const removePostLoading = useSelector((state) => state.post.deletePostsLoading);
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
    const onRemovePost = (post) => {
        if (!id) {
            return alert(t('loginmessage'));
        }
        message.success(t('deletemessage'));
        dispatch({
            type: POST_DELETE_REQUEST,
            data: { postId: post.id }
        });
        // window.location.reload();

    };

        
    
    const onUpdate = (post) => {
        // e.stoppropagation()
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (!id) {
            return alert(t('loginmessage'));
        }
        history.replace(`/post/${post.id}`);
    };

    function cancel(e) {
        console.log(e);
        message.error(t('cancelmessage'));
      }
    
    const { Panel } = Collapse;


    const renderPanel=(post,index)=>{

        const renderHeader=(post,index)=>(
            <>
            {isPc&&
            <div className ='renderHeader'>
                <div className='headerTop'>
                    <div>
                        {/* <img src={logo2} style={{ width: 25, height: 25, marginRight: 10 }} />
                        <span className='bold'>에이투지</span> */}
                        <Avatar size={25}  style={{ color: '#F0194F', backgroundColor: '#F9D1DB', marginRight: 10, marginLeft: 0 }}>{post.User.name}</Avatar>
                        <span className='bold'>{post.User.name}</span>
                    </div>
                    <span className='size14 gray1' style={{marginLeft:10}}>{moment(post.createdAt).format('YYYY-MM-DD')}</span>

                </div>
                <div className='headerMiddle'>
               {/* <span className='indexNumber'>{index+1}</span> */}
                <span className='ellipsis'>{post.title}</span>
                </div>
                {/* <div className='ellipsis'  dangerouslySetInnerHTML={{ __html: post.content}}/> */}

            </div>
            }
            {(isMobile||isTablet)&&
            <div className ='renderHeaderM'>
                <div>
                        <img src={logo2} style={{ width: 25, height: 25, marginRight: 10 }} />
             <span className='size14 gray1'>{moment(post.createdAt).format('YYYY-MM-DD')}</span>
             </div>
             <div className='renderHeaderSubM'>
                {/* <span className='indexNumber'>{index}</span> */}
                <span className='ellipsis'>{post.title}</span>
             </div>

         </div>
            
            }

            </>
        )
        
    const handleUpdate=(post)=>{
        setUpdateValue(post)
        setIsModalVisibleUpdate(true)
    }
        return(
            <Panel header={renderHeader(post, index)} key={index}>
                {/* <div>
                {post.PImages[0]&&
                    post.PImages.map((item)=>(
                        <img src={`http://155.230.95.97:50001/${item.src}`} alt={item.src} />
                    ))
                }
                </div> */}
                <div dangerouslySetInnerHTML={{ __html: post.content}}/>
               
                    {id &&role&& (post.User.id === id ||role === 'admin')
                                ? (
                                    <div style={{ textAlign:'right'}}>
                                        <Divider/>

                                        <button className='nudeButton' onClick={(e)=>handleUpdate(post)}><span className='size14'><FormOutlined />{t('edit')}</span></button>
                                        <Divider type='vertical'/>
                                        <Popconfirm
                                            title={t('deletesuremessage')}
                                            onConfirm={(e)=>onRemovePost(post)}
                                            onCancel={cancel}
                                            okText={t('yes')}
                                            cancelText={t('no')}
                                        >
                                        <a href="#"><DeleteOutlined /><span className='size14'>{t('delete')}</span></a>
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
                    <span className='bold size18'>{t('post')} {t('edit')}</span>
                </div>
                <Divider />
                <PostUpdate posta={updateValue} setIsModalVisibleUpdate={setIsModalVisibleUpdate}/>
            </Modal>
            <Collapse accordion style={{ width: '100%' }}
            // expandIcon={({ isActive }) => <ExclamationCircleFilled rotate={isActive ? 90 : 0} style={{fontSize:30, color:'#cfcfcf',backgroundColor:'#fff'}}/>}
            >
                {posts&&posts.map((item, index) =>
                    renderPanel(item, index))}
                {/* <p>{moment(post.createdAt).format('YYYY.MM.DD')}</p> */}

            </Collapse>
        </>
    );
};

PostBoard.propTypes = {

};

export default withRouter(PostBoard);