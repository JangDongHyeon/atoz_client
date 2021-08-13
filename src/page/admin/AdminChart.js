import React, { useEffect, useState, } from 'react';
import { Radio } from 'antd';
import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { INVOICE_CHART_ADMIN_GET_REQUEST } from '../../actions/types';

import { ResponsivePie } from '@nivo/pie'
import Admin from '../../components/auth/Admin';
import { useMediaQuery } from "react-responsive"
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input, Collapse, Alert, Form, Divider, Menu, Table, TimePicker } from 'antd';
import { ExclamationCircleFilled, SearchOutlined, QuestionCircleFilled, ExclamationCircleOutlined, QuestionCircleOutlined, CheckCircleOutlined, OrderedListOutlined, AlertOutlined, SnippetsOutlined, MessageOutlined, LineChartOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { Reveal, Fade, HeadShake, Pulse,Zoom } from 'react-reveal';

const AdminChart = props => {
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
    const [date, setDate] = useState('oneMonthAgo')
    const { loadAdminInvoicesChatsLoading, chartC, chartT } = useSelector((state) => state.invoice);
    console.log(chartC)

    useEffect(() => {
            dispatch({
                type: INVOICE_CHART_ADMIN_GET_REQUEST,
                data: { date: 'oneMonthAgo' }
            })
    }, [me])

    const onChange = e => {

        setDate(e.target.value);
        dispatch({
            type: INVOICE_CHART_ADMIN_GET_REQUEST,
            data: { date: e.target.value }
        })
    };

    return (
        <Admin>
            <AppLayout>
                <div className='boardContainer'>
                    <div className='dummy'></div>
                    <div className='boardTop'>
                        <span className='size30 bold'><LineChartOutlined style={{ color: '#1C4FA1', marginRight: 10 }} />통계</span>
                    </div>
                    <div className='boardMiddle'>
                        {isPc &&
                            <div className='adminContainer'>
                                <Menu
                                    // onClick={history.replace(`/post/`)}
                                    // style={{ width: 256 }}
                                    defaultSelectedKeys={['3']}
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
                        <div className='chartRadio'>

                        <Radio.Group onChange={onChange} value={date}>
                            <Radio value={'yesterday'}>어제</Radio>
                            <Radio value={'week'}>최근 1주</Radio>
                            <Radio value={'oneMonthAgo'}>최근 1달</Radio>
                            <Radio value={'oneYearAgo'}>최근 1년</Radio>
                        </Radio.Group>

                        </div>
                            <div className='chartContainer'>
                        {me && (chartC.length > 0 && chartT.length > 0) ? (
                            <>
                            <Divider orientation='left'>국가별</Divider>
                        <Zoom>
                                <div style={isPc?{ height: 500, width: '100%' }:{ height: 350, width: '100%' }}>

                                    <ResponsivePie
                                        data={chartC}
                                        margin={isPc?{ top: 40, right: 80, bottom: 80, left: 80 }:{ top: 10, right: 40, bottom: 40, left: 40}}
                                        startAngle={-75}
                                        innerRadius={0.5}
                                        padAngle={0.7}
                                        cornerRadius={3}
                                        activeOuterRadiusOffset={8}
                                        colors={{ scheme: 'set2' }}
                                        borderWidth={1}
                                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                                        arcLinkLabelsSkipAngle={10}
                                        arcLinkLabelsTextColor="#333333"
                                        arcLinkLabelsThickness={2}
                                        arcLinkLabelsColor={{ from: 'color' }}
                                        arcLabelsSkipAngle={10}
                                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                                        defs={[
                                            {
                                                id: 'dots',
                                                type: 'patternDots',
                                                background: 'inherit',
                                                color: 'rgba(255, 255, 255, 0.3)',
                                                size: 2,
                                                padding: 1,
                                                stagger: true
                                            },
                                            {
                                                id: 'lines',
                                                type: 'patternLines',
                                                background: 'inherit',
                                                color: 'rgba(255, 255, 255, 0.3)',
                                                rotation: -45,
                                                lineWidth: 6,
                                                spacing: 10
                                            }
                                        ]}
                                        fill={[
                                            {
                                                match: {
                                                    id: 'CAN'
                                                },
                                                // id: 'lines'
                                            },
                                            {
                                                match: {
                                                    id: 'USA'
                                                },
                                                id: 'lines'
                                            },
                                        ]}
                                        legends={[
                                            {
                                                anchor: 'bottom',
                                                direction: 'row',
                                                justify: false,
                                                translateX: 0,
                                                translateY: isPc?50:10,
                                                itemsSpacing: 0,
                                                itemWidth: 100,
                                                itemHeight: 18,
                                                itemTextColor: '#999',
                                                itemDirection: 'left-to-right',
                                                itemOpacity: 1,
                                                symbolSize: 18,
                                                symbolShape: 'circle',
                                                effects: [
                                                    {
                                                        on: 'hover',
                                                        style: {
                                                            itemTextColor: '#000'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]}
                                    />

                                </div>
                                </Zoom>

                            <Divider orientation='left'>배송사별</Divider>
                        <Zoom>
                                <div style={isPc?{ height: 500, width: '100%' }:{ height: 350, width: '100%' }}>
                                    <ResponsivePie
                                        data={chartT}
                                        margin={isPc?{ top: 40, right: 80, bottom: 80, left: 80 }:{ top: 10, right: 40, bottom: 40, left: 40}}
                                        startAngle={-75}
                                        innerRadius={0.5}
                                        padAngle={0.7}
                                        cornerRadius={3}
                                        activeOuterRadiusOffset={8}
                                        colors={{ scheme: 'nivo' }}
                                        borderWidth={1}
                                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                                        arcLinkLabelsSkipAngle={10}
                                        arcLinkLabelsTextColor="#333333"
                                        arcLinkLabelsThickness={2}
                                        arcLinkLabelsColor={{ from: 'color' }}
                                        arcLabelsSkipAngle={10}
                                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                                        defs={[
                                            {
                                                id: 'dots',
                                                type: 'patternDots',
                                                background: 'inherit',
                                                color: 'rgba(255, 255, 255, 0.3)',
                                                size: 2,
                                                padding: 1,
                                                stagger: true
                                            },
                                            {
                                                id: 'lines',
                                                type: 'patternLines',
                                                background: 'inherit',
                                                color: 'rgba(255, 255, 255, 0.3)',
                                                rotation: -45,
                                                lineWidth: 6,
                                                spacing: 10
                                            }
                                        ]}
                                        fill={[
                                            {
                                                match: {
                                                    id: 'UPS'
                                                },
                                                id: 'dots'
                                            },
                                            {
                                                match: {
                                                    id: 'EMS'
                                                },
                                                // id: 'lines'
                                            },
                                        ]}
                                        legends={[
                                            {
                                                anchor: 'bottom',
                                                direction: 'row',
                                                justify: false,
                                                translateX: 0,
                                                translateY: isPc?50:10,
                                                itemsSpacing: 0,
                                                itemWidth: 100,
                                                itemHeight: 18,
                                                itemTextColor: '#999',
                                                itemDirection: 'left-to-right',
                                                itemOpacity: 1,
                                                symbolSize: 18,
                                                symbolShape: 'circle',
                                                effects: [
                                                    {
                                                        on: 'hover',
                                                        style: {
                                                            itemTextColor: '#000'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]}
                                    />
                                </div>
                                </Zoom>
                            </>
                        ) : <>

                        </>
                        }

                        </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </Admin>
    )
}

AdminChart.propTypes = {

};

export default AdminChart;