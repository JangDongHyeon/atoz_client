import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Menu, Modal, Button, Col, Dropdown, Avatar } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { MenuOutlined, UserOutlined, DownOutlined, OrderedListOutlined, CustomerServiceOutlined, SnippetsOutlined, DeploymentUnitOutlined,QuestionCircleOutlined,LogoutOutlined,MessageOutlined,LineChartOutlined,HistoryOutlined,ProfileOutlined } from '@ant-design/icons';
import UserProfile from './UserProfile';
import atoz_logo from '../assets/atoz_logo.png'
import aiicon from '../assets/aiicon.png'
// import LoginForm from './LoginForm';
import { useMediaQuery } from "react-responsive"
import Signin from './sign/Signin'
import { LOG_OUT_REQUEST } from '../actions/types';
import ko from './ko.json'
import en from './en.json'
import {
    setTranslations,
    setDefaultLanguage,
    setLanguageCookie,
    setLanguage,
    translate,
    getLanguage,
    t
  } from 'react-switch-lang';
  import { useCookies } from "react-cookie";

setTranslations({ en, ko });
setDefaultLanguage('ko');
setLanguageCookie();

const AppLayout = ({ children, history}) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    console.log('cookiescookies',cookies.language)
    // const { me } = useSelector((state) => state.user);
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
    const { me, logOutLoading } = useSelector((state) => state.user);

    const onLogOut = useCallback((e) => {
        dispatch({
            type: LOG_OUT_REQUEST
        });
    }, []);
    const profileClick = useCallback((e) => {
        // history.replace('/profile')
    }, []);

    const { SubMenu } = Menu;
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
    const modalLoginView = () => {
        return (

            <Modal title={t('login')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={450}>
                <Signin handleOk={handleOk} />
            </Modal>
        )

    }
    const [currentLang, setCurrentLang] = useState(getLanguage())
    const dropDownMenu = () => (

        <Menu style={{ width: '150px', backgroundColor: '#f1f1f1' }}>
            <Menu.Item key="1"><Link to="/service">{t('ai')}</Link></Menu.Item>
            <Menu.Item key="2">{t('menu')}</Menu.Item>
            <Menu.Item key="3">
                <Link to="/post">{t('post')}</Link>
            </Menu.Item>
            <SubMenu key="SubMenu" icon={<CustomerServiceOutlined />} title={t('support')} >
                <Menu.Item key="4">
                    <Link to="/post">{t('post')}</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/faq">{t('faq')}</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
    const dropDownMenuAdminM =()=>(
        <Menu style={{ width: '150px', backgroundColor: '#f1f1f1' }}>
        <Menu.Item key="1"><Link to="/admin/invoice">{t('history')}</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/admin/answer">{t('answer')}</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/admin/chart">{t('statistics')}</Link></Menu.Item>
        <Menu.Item  key="4">
            <button className='nudeButton' style={{marginLeft:-5}} onClick={(e) => onLogOut(e)}>{t('logout')}</button>
        </Menu.Item>
    </Menu>
    )
    const dropDownMenuUserM =()=>(
        <Menu style={{ width: '150px', backgroundColor: '#f1f1f1' }}>
        <Menu.Item key="1"><Link to="/invoice">{t('myhistory')}</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/qna">{t('contactus')}</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/profile">{t('modprofile')}</Link></Menu.Item>
        <Menu.Item  key="4">
            <button className='nudeButton' style={{marginLeft:-5}} onClick={(e) => onLogOut(e)}>{t('logout')}</button>
        </Menu.Item>
    </Menu>
    )
    useEffect(()=>{
        setLanguage(cookies.language)
        setCurrentLang(cookies.language)
    },[cookies.language])
     const handleSetLanguage = (key) => () => {
        setLanguage(key)
        setLanguageCookie();
        setCurrentLang(key)
        window.location.reload();

      };

    // console.log('aaaaaaaaaaa',lang.kor.menu)
    return (
        <div className=''>
            {/*****************************************header*********************************/}
            {(isPc || isTablet) &&
            <>
            <Menu mode="horizontal" className='headerContainer'>
                    <Menu.Item  key="1">
                        <Link to="/"><img className='logoImage' src={atoz_logo} /></Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DeploymentUnitOutlined />} >
                        <Link to="/service">{t('ai')}</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<MenuOutlined />}>
                        <Link to="/profile" >{t('menu')}</Link>
                    </Menu.Item>
                    <SubMenu key="SubMenu" icon={<CustomerServiceOutlined />} title={t('support')} onTitleClick={(e) => history.replace('/post')}>
                        <Menu.Item key="4" icon={<SnippetsOutlined />}>
                            <Link to="/post">{t('post')}</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<QuestionCircleOutlined/>}>
                            <Link to="/faq">{t('faq')}</Link>
                        </Menu.Item>
                    </SubMenu>
                                     {/* {me &&
                        <Menu.Item  key="6"style={{ position: 'absolute', top: 0, right: 80 }}>
                            <button className='nudeButton' onClick={(e) => onLogOut(e)}>로그아웃</button>
                        </Menu.Item>
                    } */}
                    {me && me.role == 'admin' &&
                        <SubMenu style={{ position: 'absolute', right: 0, }} onTitleClick={(e) => history.replace('/admin/invoice')} key="SubMenu2" icon={<Avatar style={{ color: '#F0194F', backgroundColor: '#F9D1DB', marginRight: 0, marginLeft: 0 }}>{me.name}</Avatar>}>
                            <Menu.Item key="7" icon={<OrderedListOutlined />}>
                                <Link to="/admin/invoice">{t('history')}</Link>
                            </Menu.Item>
                            <Menu.Item key="8" icon={<MessageOutlined />}>
                                <Link to="/admin/answer">{t('answer')}</Link>
                            </Menu.Item>
                            <Menu.Item key="9" icon={<LineChartOutlined />}>
                                <Link to="/admin/chart">{t('statistics')}</Link>
                            </Menu.Item>
                            <Menu.Item  key="10" icon = {<LogoutOutlined/>}>
                                <button className='nudeButton' style={{marginLeft:-5}} onClick={(e) => onLogOut(e)}>{t('logout')}</button>
                            </Menu.Item>
                        </SubMenu>
                    }

                    {me && me.role != 'admin' &&
                        <SubMenu style={{ position: 'absolute', right: 0, }} onTitleClick={(e) => history.replace('/invoice')} key="SubMenu2" icon={<Avatar style={{ color: '#1C4FA1', backgroundColor: '#AEE2FF', marginRight: 0, marginLeft: 0 }}>{me.name}</Avatar>}>
                            <Menu.Item key="7" icon={<HistoryOutlined />}>
                                <Link to="/invoice">{t('myhistory')}</Link>
                            </Menu.Item>
                            <Menu.Item key="8" icon={<QuestionCircleOutlined />}>
                                <Link to="/qna">{t('contactus')}</Link>
                            </Menu.Item>
                            <Menu.Item key="9" icon={<ProfileOutlined />}>
                                <Link to="/profile">{t('modprofile')}</Link>
                            </Menu.Item>
                            <Menu.Item  key="10" icon = {<LogoutOutlined/>} >
                                <button className='nudeButton' style={{marginLeft:-5}} onClick={(e) => onLogOut(e)}>{t('logout')}</button>
                            </Menu.Item>
                        </SubMenu>
                    }
                    {!me &&
                        <Menu.Item  key="12"style={{ position: 'absolute', right: 0, }}>
                            <button className='nudeButton' onClick={showModal}>{t('login')}</button>

                            {/* <button className='nudeButton'  onClick={(e) => onLogOut(e)} loading={logOutLoading}>로그아웃</button> */}
                        </Menu.Item>
                    }

                </Menu>
                           
                    <div style={{ position: 'fixed', right: 80, top:12, zIndex:15,}}>
                    {currentLang=='ko'?
                    <button className='nudeButton' onClick={handleSetLanguage('en')}><span className="bold">KO</span>/EN</button>
                    :
                    <button className='nudeButton' onClick={handleSetLanguage('ko')}>KO/<span className="bold">EN</span></button>
                    }
                </div>
    </>
            }
            {isMobile &&
                <div className='headerContainerM'>

                    <Dropdown overlay={dropDownMenu} placement="bottomLeft" trigger={['click']}>
                        <button className='nudeButton'><MenuOutlined style={{ fontSize: 18, marginLeft: 10 }} /></button>
                    </Dropdown>
                    <Link to="/"><img className='logoImage' src={atoz_logo} /></Link>

                    {me && me.role == 'admin' &&
                        <Dropdown overlay={dropDownMenuAdminM} placement="bottomLeft" trigger={['click']}>
                            <Avatar style={{ color: '#1C4FA1', backgroundColor: '#AEE2FF', marginRight: 10, marginLeft: 0 }}>{me.name}</Avatar>
                        </Dropdown>
                    }
                    {me && me.role != 'admin' &&
                        <Dropdown overlay={dropDownMenuUserM} placement="bottomLeft" trigger={['click']}>
                            <Avatar style={{ color: '#1C4FA1', backgroundColor: '#AEE2FF', marginRight: 10, marginLeft: 0 }}>{me.name}</Avatar>
                        </Dropdown>
                    }
                    {!me &&
                            <button className='nudeButton' onClick={showModal}>{t('login')}</button>
                    }
                    
                </div>
            }

            {/*****************************************contents*********************************/}

            <div className='contentContainer'>
                
                {children}

            </div>
            {modalLoginView()}

            {/*****************************************foter***********************************/}
            <div className='footerContainer'>
                <p>bbbbbbb</p>
            </div>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withRouter(AppLayout);