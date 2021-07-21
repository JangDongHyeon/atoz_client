import React, { useEffect, } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { POST_GET_REQUEST } from '../../actions/types';
import PostCard from '../../components/post/PostCard';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input,Collapse,Alert, Form  } from 'antd';
import { ExclamationCircleFilled, SearchOutlined,QuestionCircleFilled } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';

const defaultPage = 1;
const defaultPageSize = 10;

const Post = props => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { loadPostsLoading, posts, hasMorePosts } = useSelector((state) => state.post);
    const { Panel } = Collapse;


    useEffect(() => {

        dispatch({
            type: POST_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [])
console.log(document.documentElement.scrollHeight)
console.log(document.documentElement.clientHeight)
console.log(window.pageYOffset)
    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMorePosts && !loadPostsLoading) {

                    const lastId = posts[posts.length - 1]?.id;
                    dispatch({
                        type: POST_GET_REQUEST,
                        data: { lastId, check: true },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading, posts]);
//추가 yook
    useEffect(()=>{
        if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

            if (hasMorePosts && !loadPostsLoading) {

                const lastId = posts[posts.length - 1]?.id;
                dispatch({
                    type: POST_GET_REQUEST,
                    data: { lastId, check: true },
                });
            }
        }
    })

    return (
        <AppLayout>
            <div className='boardContainer'>
                <div className='dummy'></div>
                <div className='boardTop'><span className='size30 bold'><ExclamationCircleFilled style={{color:'#1C4FA1', marginRight:10}}/>공지사항</span></div>

                <div className='boardMiddle'>
                    <div className='supportContainer'>
                        <span style={{top:0, position:'absolute', color:'#666'}}>menu</span>
                        <span className='bold size16'>공지사항</span>
                        <span className='bold size16'>자주하는질문</span>
                    </div>
                    <div style={{marginLeft:170, width:'100%', maxWidth:700}}>
                    <Form className='searchBoardInputContainer'>
                        <input className='searchInput' placeholder='검색'></input>
                        <button className='searchInputButton'><SearchOutlined /></button>
                    </Form>
                    <PostCard posts={posts}/>
                    </div>
                </div>
                <Link to='/post/add'>공지사항쓰기</Link>
            </div>
        </AppLayout>
    );
};

Post.propTypes = {

};

export default Post;