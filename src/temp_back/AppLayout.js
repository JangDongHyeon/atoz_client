import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Menu, Input, Row, Col, } from 'antd';

import { useSelector } from 'react-redux';

import { MenuOutlined,UserOutlined } from '@ant-design/icons';
import UserProfile from './user/UserProfile';
import atoz_logo from '../assets/atoz_logo.png'
// import LoginForm from './LoginForm';
import { useMediaQuery } from "react-responsive"


const AppLayout = ({ children }) => {
    const { me } = useSelector((state) => state.user);
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });
    const { SubMenu } = Menu;
    return (
        <div className=''>
            {(isPc||isTablet) &&
                <Menu mode="horizontal" className='headerContainer'>
                    <Menu.Item>
                        <Link to="/"><img className='logoImage' src={atoz_logo} /></Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/service">AI배송기간 예측</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/profile">메뉴1</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/profile">고객지원</Link>
                    </Menu.Item>

                    <Menu.Item style={{ position: 'absolute', top: 0, right: 80 }}>
                        <Link to="/profile">나의배송</Link>
                    </Menu.Item>
                    <Menu.Item style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Link to="/profile">로그인</Link>
                    </Menu.Item>
                </Menu>
            }
            {isMobile &&
            <div className='headerContainerM'>
                <Menu mode="vertical" style={{ width: '50px' }}>
                    <SubMenu key="SubMenu">
                        <Menu.ItemGroup title="Item 1" style={{ float: 'left' }}>
                            <Menu.Item key="setting:1">AI배송기간 예측</Menu.Item>
                            <Menu.Item key="setting:2">메뉴1</Menu.Item>
                            <Menu.Item key="setting:2">고객지원</Menu.Item>
                        </Menu.ItemGroup>

                    </SubMenu>
                </Menu>
                <Link to="/profile"><UserOutlined style={{marginRight:10, fontSize:18}}/></Link>
            </div>
            }
            <div className='contentContainer'>
                {children}
            </div>
            <div className='footerContainer'>
                <p>bbbbbbb</p>
            </div>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;