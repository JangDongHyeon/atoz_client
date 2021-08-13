import React, { useEffect, useState} from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { QNA_GET_REQUEST } from '../../actions/types';
import QnaBoard from '../../components/qna/QnaBoard';
import User from '../../components/auth/User';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input, Collapse, Alert, Form, Divider, Menu } from 'antd';
import { ExclamationCircleFilled, SearchOutlined, QuestionCircleFilled, ExclamationCircleOutlined, QuestionCircleOutlined, EditOutlined, ExclamationOutlined, QuestionOutlined, SnippetsOutlined,ProfileOutlined,HistoryOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { useMediaQuery } from "react-responsive"
import logo2 from '../../assets/logo2.png'
import { Reveal, Fade } from 'react-reveal';
import QnaCreate from '../../components/qna/QnaCreate';

const Qna = props => {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });
    const [search, setSearch] = useState('')

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { loadQnasLoading, qnas, hasMoreQnas } = useSelector((state) => state.qna);
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);


    useEffect(() => {

        dispatch({
            type: QNA_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [me])

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreQnas && !loadQnasLoading) {

                    const lastId = qnas[qnas.length - 1]?.id;
                    dispatch({
                        type: QNA_GET_REQUEST,
                        data: { lastId, check: true },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreQnas, loadQnasLoading, qnas]);
    //추가 yook
    useEffect(() => {
        if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

            if (hasMoreQnas && !loadQnasLoading) {

                const lastId = qnas[qnas.length - 1]?.id;
                dispatch({
                    type: QNA_GET_REQUEST,
                    data: { lastId, check: true, search },
                });
            }
        }
    })

    const searchClick = () => {

        dispatch({
            type: QNA_GET_REQUEST,
            data: { check: false, lastId: 0, search },
        });
    }
    return me && (
        <User>
            <AppLayout>
            <div className='boardContainer'>
                <div className='dummy'></div>
                <div className='boardTop'>
                    <span className='size30 bold'><QuestionCircleOutlined style={{ color: '#1C4FA1', marginRight: 10 }} />질문하기</span>
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
                                <Menu.Item key="1" icon={<HistoryOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/invoice'>
                                        나의배송
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<QuestionCircleOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/qna'>
                                        질문하기
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<ProfileOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/profile'>
                                        정보수정
                                </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    }
                    <div className={isPc ? 'collapseContainer' : 'collapseContainerM'}>
                        {me ?
                            <button className='nudeButton' onClick={(e) => setIsModalVisibleCreate(true)} style={{ marginBottom: 10, marginRight: 10 }}><EditOutlined />질문쓰기</button>
                            :
                            <div style={{ height: 30 }}></div>
                        }

                        {isPc &&
                            <Form className='searchInputContainer searchBoard' onFinish={searchClick}>
                                <input className='searchInput' placeholder='검색' onChange={(e) => setSearch(e.target.value)} value={search} />
                                <button className='searchInputButton' htmlType="submit" ><SearchOutlined /></button>
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
                                <QnaBoard qnas={qnas} />
                            </div>
                        </Fade>
                    </div>
                </div>
                <Modal visible={isModalVisibleCreate} onCancel={(e) => setIsModalVisibleCreate(false)} width={600}>
                    <div className='modalTop'>
                        <img src={logo2} style={{ width: 30, height: 30, marginRight: 10 }} />
                        <span className='bold size18'>질문쓰기</span>
                    </div>
                    <Divider />
                    <QnaCreate setIsModalVisibleCreate={setIsModalVisibleCreate} />
                </Modal>


            </div>
                {qnas.length > 0 && qnas.map((qna, i) => <QnaBoard key={i} qna={qna} />)}
            </AppLayout>
        </User>
    );
};

Qna.propTypes = {

};

export default Qna;