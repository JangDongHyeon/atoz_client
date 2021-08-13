import React, { useEffect, } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { ANSWER_GET_REQUEST } from '../../actions/types';
import AnswerBoard from '../../components/answer/AnswerBoard';
import User from '../../components/auth/User';
import Admin from '../../components/auth/Admin';
import useInput from '../../hooks/useInput';
import { useMediaQuery } from "react-responsive"
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input,Collapse,Alert, Form,Divider,Menu,Table, TimePicker, Switch,   } from 'antd';
import { ExclamationCircleFilled, SearchOutlined,QuestionCircleFilled,ExclamationCircleOutlined,QuestionCircleOutlined,CheckCircleOutlined, OrderedListOutlined,AlertOutlined, SnippetsOutlined, MessageOutlined,LineChartOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { Reveal, Fade } from 'react-reveal';
const AdminAnswer = props => {
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
    const { me } = useSelector((state) => state.user);
    const { loadAnswersLoading, answers, hasMoreAnswers } = useSelector((state) => state.answer);
    const [answerMode, onChangeAnswerMode, setAnswerMode] = useInput('proceeding');

    useEffect(() => {
        dispatch({
            type: ANSWER_GET_REQUEST,
            data: { check: false, lastId: 0, state: answerMode }
        })
    }, [me])

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreAnswers && !loadAnswersLoading) {

                    const lastId = answers[answers.length - 1]?.id;
                    dispatch({
                        type: ANSWER_GET_REQUEST,
                        data: { lastId, check: true, state: answerMode },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreAnswers, loadAnswersLoading, answers]);

    const onChangeMode = (checked) => {
        if (!checked) {
            setAnswerMode('proceeding')
            dispatch({
                type: ANSWER_GET_REQUEST,
                data: { check: false, lastId: 0, state: 'proceeding' }
            })
        }
        else {
            setAnswerMode('complete')
            dispatch({
                type: ANSWER_GET_REQUEST,
                data: { check: false, lastId: 0, state: 'complete' }
            })
        }
    }


    return me && (
        <Admin>
            <AppLayout>
            <div className='boardContainer'>
                <div className='dummy'></div>
                <div className='boardTop'>
                        
                    <span className='size30 bold'>
                    <MessageOutlined  style={{color:'#1C4FA1', marginRight:10}}/>Q&A관리
                    </span>
                </div>

                <div className='boardMiddle'>
                    {isPc &&
                        <div className='adminContainer'>
                            <Menu
                                // onClick={history.replace(`/post/`)}
                                // style={{ width: 256 }}
                                defaultSelectedKeys={['2']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                            >
                                <Menu.Item key="1" icon={<OrderedListOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/admin/invoice'>
                                        조회내역
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<MessageOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/admin/answer'>
                                        Q&A관리
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<LineChartOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/admin/chart'>
                                        통계
                                </Link>
                                </Menu.Item>
                            </Menu>
                    </div>
                    }
                    <div className={isPc?'collapseContainer':'collapseContainerM'}>

                        
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
                    <Fade bottom>
                        <div style={{width:'100%', maxWidth:700}}>
                            <div className='qnaSwitch'>
                            {answerMode=='proceeding'?
                                <div><ExclamationCircleOutlined style={{color:'#ff9d00'}}/>&nbsp;새로운 질문</div>:<div><CheckCircleOutlined style={{color:'#4ed342'}}/>&nbsp;완료된 질문</div>
                            
                            }

                            <div className='verticalCenterRow'>완료된 질문 보기&nbsp;&nbsp;<Switch onChange={onChangeMode} /></div>

                            </div>
                        {/* {tableInvoices.length>0&&<Table columns={columns} dataSource={tableInvoices}></Table>} */}
                {/* {invoices.length > 0 && invoices.map((invoice, i) => <InvoiceCard key={i} invoice={invoice} />)} */}
                {answers.length > 0&&<AnswerBoard answers={answers} mode={answerMode} />}
                {answers.length==0&&
                <div className='verticalCenterRow' style={{justifyContent:'center', marginTop:100}}>새로운 질문이 없습니다.</div>
                }
                        </div>
                    </Fade>
                    </div>
                </div>



            </div>
            </AppLayout>
        </Admin>
    );
};

AdminAnswer.propTypes = {

};

export default AdminAnswer;