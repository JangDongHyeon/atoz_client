import React, { useEffect, useState } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { FAQ_GET_REQUEST } from '../../actions/types';
import FaqBoard from '../../components/faq/FaqBoard';
import FaqCreate from '../../components/faq/FaqCreate';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input, Collapse, Alert, Form } from 'antd';
import { ExclamationCircleFilled, SearchOutlined,QuestionCircleFilled,ExclamationCircleOutlined,QuestionCircleOutlined,EditOutlined, ExclamationOutlined,QuestionOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { useMediaQuery } from "react-responsive"



const Faq = props => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    
    useEffect(() => {

        dispatch({
            type: FAQ_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [])

    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });
    const { loadFaqsLoading, faqs, hasMoreFaqs } = useSelector((state) => state.faq);
    const { Panel } = Collapse;
    const role = useSelector((state) => state.user.me?.role);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreFaqs && !loadFaqsLoading) {

                    const lastId = faqs[faqs.length - 1]?.id;
                    dispatch({
                        type: FAQ_GET_REQUEST,
                        data: { lastId, check: true },
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
                    data: { lastId, check: true },
                });
            }
        }
    })

    return (
        <AppLayout>
            <div className='boardContainer'>
                <div className='dummy'></div>
                <div className='boardTop'>
                    <span className='size30 bold'><QuestionCircleFilled style={{color:'#1C4FA1', marginRight:10}}/>자주하는질문</span>
                </div>

                <div className='boardMiddle'>
                    {isPc&&
                    <div className='supportContainer'>
                        <span style={{top:0, position:'absolute', color:'#666'}}>menu</span>
                        <Link className='nudeButton' to = '/post'>
                        <span className='size16'><ExclamationCircleOutlined style={{marginRight:5}}/>공지사항</span>
                        </Link>
                        <Link className='nudeButton' to = '/faq'>
                        <span className='size16'><QuestionCircleOutlined  style={{marginRight:5}}/>자주하는질문</span>
                        </Link>
                    </div>
                    }
                    <div className={isPc?'collapseContainer':'collapseContainerM'}>
                        {me&& me.role==='admin'?
                            <button className='nudeButton' onClick={showModal} style={{marginBottom:10, marginRight:10}}><EditOutlined />FAQ 쓰기</button>
                            :
                            <div style={{height:30}}></div>
                        }
                        
                        {isPc&&
                        <Form className='searchInputContainer searchBoard'>
                        <input className='searchInput' placeholder='검색'></input>
                        <button className='searchInputButton'><SearchOutlined /></button>
                        </Form>
                        }
                        {(isTablet||isMobile)&&
                        <Form className='searchInputContainer'>
                        <input className='searchInput' placeholder='검색'></input>
                        <button className='searchInputButton'><SearchOutlined /></button>
                        </Form>
                        }

                        <FaqBoard faqs={faqs} />

                    </div>
                </div>
                <Modal title="FAQ 작성하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={600}>
                    <FaqCreate/>
                </Modal>
            </div>
        </AppLayout>
    );
};

Faq.propTypes = {

};

export default Faq;