import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input,Collapse,Popconfirm, Divider   } from 'antd';
import {
    RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,ExclamationCircleFilled
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { POST_DELETE_REQUEST } from '../../actions/types';
import { Route, Link, withRouter } from 'react-router-dom';
moment.locale('ko')
const PostCard =  ({  index, history ,posts}) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const role = useSelector((state) => state.user.me?.role);
    const removePostLoading = useSelector((state) => state.post.deletePostsLoading);

    const onRemovePost = (post) => {
        console.log('asdfasd')
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        message.success('삭제 되었습니다.');
        return dispatch({
            type: POST_DELETE_REQUEST,
            data: { postId: post.id }
        });


    };

        
    
    const onUpdate = (post) => {
        // e.stoppropagation()
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        history.replace(`/post/${post.id}`);
    };

    function cancel(e) {
        console.log(e);
        message.error('취소 되었습니다.');
      }
    
    const { Panel } = Collapse;

    const renderPanel=(post,index)=>{

        const renderHeader=(post,index)=>(
            <div style={{width:'95%',display:'flex', justifyContent:'space-between'}}>
                <span>{index}</span>
                <span className='ellipsis'>{post.title}</span>
                <span className='size14 gray1'>{moment(post.createdAt).format('YYYY-MM-DD')}</span>
            </div>
        )

     
        return(
            <Panel header={renderHeader(post, index)} key={index}>
                <div>
                {post.PImages[0]&&
                    post.PImages.map((item)=>(
                        <img src={`http://155.230.95.97:50001/${item.src}`} alt={item.src} />
                    ))
                }
                </div>
                {post.content}
                    {id &&role&& (post.User.id === id ||role === 'admin')
                                ? (
                                    <div style={{ textAlign:'right'}}>
                                        <Divider/>

                                        <button className='nudeButton' onClick={(e)=>onUpdate(post)}>수정</button>
                                        <Divider type='vertical'/>
                                        <Popconfirm
                                            title="정말 삭제 하시겠습니까?"
                                            onConfirm={(e)=>onRemovePost(post)}
                                            onCancel={cancel}
                                            okText="네"
                                            cancelText="아니오"
                                        >
                                        <a href="#">삭제</a>
                                        </Popconfirm>
                                    </div>
                                )
                                : <></>}
            </Panel>
        )
    }
    
    console.log(index)
    return (

<>
            <Collapse accordion style={{width:'100%'}}
                // expandIcon={({ isActive }) => <ExclamationCircleFilled rotate={isActive ? 90 : 0} style={{fontSize:30, color:'#cfcfcf',backgroundColor:'#fff'}}/>}
            >
                {posts.map((item, index)=>
                renderPanel(item,index))}
                {/* <p>{moment(post.createdAt).format('YYYY.MM.DD')}</p> */}

            </Collapse>
</>
    );
};

PostCard.propTypes = {

};

export default withRouter(PostCard);