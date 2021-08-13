import React, { useEffect, useState } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { FAQ_GET_REQUEST } from '../../actions/types';
import FaqBoard from '../../components/faq/FaqBoard';
import FaqCreate from '../../components/faq/FaqCreate';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input, Collapse, Alert, Form, Divider, Menu } from 'antd';
import { ExclamationCircleFilled, SearchOutlined, QuestionCircleFilled, ExclamationCircleOutlined, QuestionCircleOutlined, EditOutlined, ExclamationOutlined, QuestionOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { useMediaQuery } from "react-responsive"
import { postReducersInit } from '../../reducers/post';
import logo2 from '../../assets/logo2.png'
import { Reveal, Fade } from 'react-reveal';

const defaultPage = 1;
const defaultPageSize = 10;

const Faq = props => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { loadFaqsLoading, faqs, hasMoreFaqs } = useSelector((state) => state.faq);
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
            type: FAQ_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [])

    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);


    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreFaqs && !loadFaqsLoading) {

                    const lastId = faqs[faqs.length - 1]?.id;
                    dispatch({
                        type: FAQ_GET_REQUEST,
                        data: { lastId, check: true, search },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreFaqs, loadFaqsLoading, faqs]);
    //추가 yook
    useEffect(() => {
        if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

            if (hasMoreFaqs && !loadFaqsLoading) {

                const lastId = faqs[faqs.length - 1]?.id;
                dispatch({
                    type: FAQ_GET_REQUEST,
                    data: { lastId, check: true, search },
                });
            }
        }
    })


    const searchClick = () => {

        dispatch({
            type: FAQ_GET_REQUEST,
            data: { check: false, lastId: 0, search },
        });
    }


    return (
        <AppLayout>
            <div className='boardContainer'>
                <div className='dummy'></div>
                <div className='boardTop'>
                    <span className='size30 bold'><QuestionCircleOutlined style={{ color: '#1C4FA1', marginRight: 10 }} />자주하는질문</span>
                </div>

                <div className='boardMiddle'>
                    {isPc &&
                        <div className='supportContainer'>
                            <Menu
                                // onClick={this.handleClick}
                                // style={{ width: 256 }}
                                defaultSelectedKeys={['2']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                            >
                                <Menu.Item key="1" icon={<SnippetsOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/post'>
                                        공지사항
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<QuestionCircleOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/faq'>
                                        자주하는질문
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    }
                    <div className={isPc ? 'collapseContainer' : 'collapseContainerM'}>
                        {me && me.role === 'admin' ?
                            <button className='nudeButton' onClick={(e) => setIsModalVisibleCreate(true)} style={{ marginBottom: 10, marginRight: 10 }}><EditOutlined />자주하는질문 쓰기</button>
                            :
                            <div style={{ height: 30 }}></div>
                        }

                        {isPc &&
                            <Form className='searchInputContainer searchBoard' onFinish={searchClick}>
                                <input className='searchInput' placeholder='검색' onChange={(e) => setSearch(e.target.value)} value={search} />
                                <button className='searchInputButton' htmlType="submit"><SearchOutlined /></button>
                            </Form>
                        }
                        {(isTablet || isMobile) &&
                            <Form className='searchInputContainer' onFinish={searchClick}>
                                <input className='searchInput' placeholder='검색' onChange={(e) => setSearch(e.target.value)} value={search} />
                                <button className='searchInputButton' htmlType="submit"><SearchOutlined /></button>
                            </Form>
                        }
                        <Fade bottom>
                            <div style={{ width: '100%', maxWidth: 700 }}>
                                <FaqBoard faqs={faqs} />
                            </div>
                        </Fade>
                    </div>
                </div>
                <Modal visible={isModalVisibleCreate} onCancel={(e) => setIsModalVisibleCreate(false)} width={600}>
                    <div className='modalTop'>
                        <img src={logo2} style={{ width: 30, height: 30, marginRight: 10 }} />
                        <span className='bold size18'>자주하는질문 쓰기</span>
                    </div>
                    <Divider />
                    <FaqCreate setIsModalVisibleCreate={setIsModalVisibleCreate} />
                </Modal>


            </div>
        </AppLayout>
    );
};

Faq.propTypes = {

};

export default Faq;