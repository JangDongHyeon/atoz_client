import React, { useEffect, useState } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { POST_GET_REQUEST } from '../../actions/types';
import PostBoard from '../../components/post/PostBoard';
import PostCreate from '../../components/post/PostCreate';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input, Collapse, Alert, Form, Divider, Menu } from 'antd';
import { ExclamationCircleFilled, SearchOutlined, QuestionCircleFilled, ExclamationCircleOutlined, QuestionCircleOutlined, EditOutlined, ExclamationOutlined, QuestionOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { useMediaQuery } from "react-responsive"
import { postReducersInit } from '../../reducers/post';
import logo2 from '../../assets/logo2.png'
import { Reveal, Fade } from 'react-reveal';
import backgound from '../../assets/background.png'
import {t} from 'react-switch-lang';

const Post = props => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { loadPostsLoading, posts, hasMorePosts } = useSelector((state) => state.post);
    const [search, setSearch] = useState('')
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });

    useEffect(() => {

        dispatch({
            type: POST_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [])

    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);


    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMorePosts && !loadPostsLoading) {

                    const lastId = posts[posts.length - 1]?.id;
                    dispatch({
                        type: POST_GET_REQUEST,
                        data: { lastId, check: true, search },
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
    useEffect(() => {
        if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

            if (hasMorePosts && !loadPostsLoading) {

                const lastId = posts[posts.length - 1]?.id;
                dispatch({
                    type: POST_GET_REQUEST,
                    data: { lastId, check: true, search },
                });
            }
        }
    })

    const searchClick = () => {

        dispatch({
            type: POST_GET_REQUEST,
            data: { check: false, lastId: 0, search },
        });
    }


    return (
        <AppLayout>
            <div className='boardContainer'>
                <div className='dummy'></div>
                <div className='boardTop'>
                {/* {isPc&&<Fade Reveal><img src = {backgound} style={{position:'absolute', top:40, right:0, width:1000, zIndex:0}}/></Fade>} */}
                    <span className='size30 bold'><SnippetsOutlined style={{ color: '#1C4FA1', marginRight: 10 }} />{t("post")}</span>
                </div>

                <div className='boardMiddle'>
                    {isPc &&
                        <div className='supportContainer'>
                            <Menu
                                // onClick={history.replace(`/post/`)}
                                // style={{ width: 256 }}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                            >
                                <Menu.Item key="1" icon={<SnippetsOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/post'>
                                    {t("post")}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<QuestionCircleOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/faq'>
                                    {t("faq")}
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    }
                    <div className={isPc ? 'collapseContainer' : 'collapseContainerM'}>
                        {me && me.role === 'admin' ?
                            <button className='nudeButton' onClick={(e) => setIsModalVisibleCreate(true)} style={{ marginBottom: 10, marginRight: 10 }}><EditOutlined />{t("write")}</button>
                            :
                            <div style={{ height: 30 }}></div>
                        }

                        {isPc &&
                            <Form className='searchInputContainer searchBoard' onFinish={searchClick}>
                                <input className='searchInput' placeholder={t("search")} onChange={(e) => setSearch(e.target.value)} value={search} />
                                <button className='searchInputButton' htmlType="submit" ><SearchOutlined /></button>
                            </Form>
                        }
                        {(isTablet || isMobile) &&
                            <Form className='searchInputContainer' onFinish={searchClick}>
                                <input className='searchInput' placeholder={t("search")} onChange={(e) => setSearch(e.target.value)} value={search} />
                                <button className='searchInputButton' htmlType="submit"><SearchOutlined /></button>
                            </Form>
                        }
                        <Fade bottom>
                            <div style={{ width: '100%', maxWidth: 700 }}>
                                <PostBoard posts={posts} />
                            </div>
                        </Fade>
                    </div>
                </div>
                <Modal visible={isModalVisibleCreate} onCancel={(e) => setIsModalVisibleCreate(false)} width={600}>
                    <div className='modalTop'>
                        <img src={logo2} style={{ width: 30, height: 30, marginRight: 10 }} />
                        <span className='bold size18'>{t("write")}</span>
                    </div>
                    <Divider />
                    <PostCreate setIsModalVisibleCreate={setIsModalVisibleCreate} />
                </Modal>


            </div>
        </AppLayout>
    );
};

Post.propTypes = {

};

export default Post;
