import React, { useEffect, useState} from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { INVOICE_ADMIN_GET_REQUEST } from '../../actions/types';
import InvoiceCard from '../../components/invoice/InvoiceCard';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input,Collapse,Alert, Form,Divider,Menu,Table, TimePicker  } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { ExclamationCircleFilled, SearchOutlined,QuestionCircleFilled,ExclamationCircleOutlined,QuestionCircleOutlined,EditOutlined, OrderedListOutlined,QuestionOutlined, SnippetsOutlined,MessageOutlined,LineChartOutlined } from '@ant-design/icons';

import Admin from '../../components/auth/Admin';
import { Reveal, Fade } from 'react-reveal';
import { useMediaQuery } from "react-responsive"
import moment from 'moment';

const AdminInvoice = props => {
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
    const { loadAdminInvoicesLoading, invoices, hasMoreInvoices } = useSelector((state) => state.invoice);


    useEffect(() => {
        dispatch({
            type: INVOICE_ADMIN_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [me])

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreInvoices && !loadAdminInvoicesLoading) {

                    const lastId = invoices[invoices.length - 1]?.id;
                    dispatch({
                        type: INVOICE_ADMIN_GET_REQUEST,
                        data: { lastId, check: true },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreInvoices, loadAdminInvoicesLoading, invoices]);
    const [tableInvoices, setTableInvoices]=useState([])
    const columns = [
        {
            title:'번호',
            dataIndex:'번호',
            key:'번호'
        },
        {
            title:'날짜',
            dataIndex:'날짜',
            key:'날짜'
        },
        {
            title:'운송장번호',
            dataIndex:'운송장번호',
            key:'운송장번호',
            render: text => <a>{text}</a>
        },
        {
            title:'이벤트',
            dataIndex:'이벤트',
            key:'이벤트'
        },
        {
            title:'상태',
            dataIndex:'상태',
            key:'상태'
        },
    ]
//     useEffect(()=>{
//         let tableTemp=[]
//         let itemTemp={}
//         invoices.map((item,index)=>{
//             // console.log(item.number)
//             itemTemp.번호 = index
//             itemTemp.날짜 = moment(item.createdAt).format('YYYY.MM.DD')
//             itemTemp.운송장번호 = item.number
//             itemTemp.이벤트 = item.event
//             itemTemp.상태 = item.state
//             tableTemp.push(itemTemp)
//         })
//         setTableInvoices(tableTemp)
//     console.log('ㅁㅁㅁ',tableInvoices)
//     console.log(invoices)
// },[invoices])


    return me && (
        <Admin>
            <AppLayout>
            <div className='boardContainer'>
                <div className='dummy'></div>
                <div className='boardTop'>
                    <span className='size30 bold'><OrderedListOutlined style={{color:'#1C4FA1', marginRight:10}}/>조회내역</span>
                </div>

                <div className='boardMiddle'>
                    {isPc &&
                        <div className='adminContainer'>
                            <Menu
                                // onClick={history.replace(`/post/`)}
                                // style={{ width: 256 }}
                                defaultSelectedKeys={['1']}
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
                        {tableInvoices.length>0&&<Table columns={columns} dataSource={tableInvoices}></Table>}
                {/* {invoices.length > 0 && invoices.map((invoice, i) => <InvoiceCard key={i} invoice={invoice} />)} */}
                        </div>
                    </Fade>
                    </div>
                </div>



            </div>
                {/* {invoices.length > 0 && invoices.map((invoice, i) => <InvoiceCard key={i} invoice={invoice} />)} */}
            </AppLayout>
        </Admin>
    );
};

AdminInvoice.propTypes = {

};

export default AdminInvoice;