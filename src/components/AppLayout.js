import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Menu, Modal, Button, Col, Dropdown, Avatar } from 'antd';

import { useSelector } from 'react-redux';

import { MenuOutlined, UserOutlined, DownOutlined, } from '@ant-design/icons';
import UserProfile from './UserProfile';
import atoz_logo from '../assets/atoz_logo.png'
// import LoginForm from './LoginForm';
import { useMediaQuery } from "react-responsive"
import Signin from './sign/Signin'

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

            <Modal title="로그인" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={450}>
                <Signin />
            </Modal>
        )

    }
    const dropDownMenu = () => (

        <Menu style={{ width: '150px', backgroundColor: '#f1f1f1' }}>
            <Menu.Item key="setting:1"><Link to="/service">AI배송기간 예측</Link></Menu.Item>
            <Menu.Item key="setting:2">메뉴1</Menu.Item>
            <Menu.Item key="setting:2">고객지원</Menu.Item>

        </Menu>
    )

    return (
        <div className=''>
            {/*****************************************header*********************************/}
            {(isPc || isTablet) &&
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
                        <Link to="/post">고객지원</Link>
                    </Menu.Item>

                    <Menu.Item style={{ position: 'absolute', top: 0, right: 80 }}>
                        <Link to="/profile">나의배송</Link>
                    </Menu.Item>
                    <Menu.Item style={{ position: 'absolute', top: 0, right: 0, width: 500 }}>
                        {/* <Link to="/signin">로그인</Link> */}
                        {me ? <UserProfile showModal={showModal} /> : <button className='nudeButton' onClick={showModal}> 로그인</button>}

                    </Menu.Item>
                </Menu>
            }
            {isMobile &&
                <div className='headerContainerM'>

                    <Dropdown overlay={dropDownMenu} placement="bottomLeft" trigger={['click']}>
                        <Button style={{ border: 'none', }}><MenuOutlined style={{ fontSize: 18, marginLeft: 10 }} /></Button>
                    </Dropdown>
                    <Link to="/"><img className='logoImage' src={atoz_logo} /></Link>

                    <button className='nudeButton' onClick={showModal}><UserOutlined style={{ marginRight: 10, fontSize: 18 }} /></button>
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

export default AppLayout;