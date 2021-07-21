import React, { useEffect, } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { FAQ_GET_REQUEST } from '../../actions/types';
import FaqCard from '../../components/faq/FaqCard';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input, Collapse, Alert, Form } from 'antd';
import { ExclamationCircleFilled, SearchOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';



const Faq = props => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { loadFaqsLoading, faqs, hasMoreFaqs } = useSelector((state) => state.faq);
    const { Panel } = Collapse;
    const role = useSelector((state) => state.user.me?.role);

    useEffect(() => {

        dispatch({
            type: FAQ_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [])

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
                <div className='boardTop'><span className='size30 bold'><ExclamationCircleFilled style={{ color: '#1C4FA1', marginRight: 10 }} />자주하는질문</span></div>

                <div className='boardMiddle'>
                    <div className='supportContainer'>
                        <span style={{ top: 0, position: 'absolute', color: '#666' }}>menu</span>
                        <span className='bold size16'>공지사항</span>
                        <span className='bold size16'>자주하는질문</span>
                    </div>
                    <div style={{ marginLeft: 170, width: '100%', maxWidth: 700 }}>
                        <Form className='searchBoardInputContainer'>
                            <input className='searchInput' placeholder='검색'></input>
                            <button className='searchInputButton'><SearchOutlined /></button>
                        </Form>
                        <FaqCard faqs={faqs} />
                    </div>
                </div>
                {role && role === 'admin' && <Link to='/faq/add'>자주하는질문 쓰기</Link>}
            </div>
        </AppLayout>
    );
};

Faq.propTypes = {

};

export default Faq;