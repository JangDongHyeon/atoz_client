import React, { useEffect, useState} from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { INVOICE_GET_REQUEST } from '../../actions/types';
import { useMediaQuery } from "react-responsive"
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input,Collapse,Alert, Form,Divider,Menu,Table, TimePicker  } from 'antd';
import { ExclamationCircleFilled, SearchOutlined,QuestionCircleFilled,ExclamationCircleOutlined,QuestionCircleOutlined,EditOutlined, OrderedListOutlined,QuestionOutlined, SnippetsOutlined,ProfileOutlined, HistoryOutlined } from '@ant-design/icons';
import User from '../../components/auth/User';
import { Link, Redirect } from 'react-router-dom';
import { Reveal, Fade } from 'react-reveal';
import moment from 'moment';

const InvoiceList = props => {
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
    const { loadInvoicesLoading, invoices, hasMoreInvoices } = useSelector((state) => state.invoice);


    useEffect(() => {
        dispatch({
            type: INVOICE_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [me])

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreInvoices && !loadInvoicesLoading) {

                    const lastId = invoices[invoices.length - 1]?.id;
                    dispatch({
                        type: INVOICE_GET_REQUEST,
                        data: { lastId, check: true },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreInvoices, loadInvoicesLoading, invoices]);

    const [tableInvoices, setTableInvoices]=useState([])
    const columns = [
        {
            title:'??????',
            dataIndex:'??????',
            key:'??????'
        },
        {
            title:'??????',
            dataIndex:'??????',
            key:'??????'
        },
        {
            title:'???????????????',
            dataIndex:'???????????????',
            key:'???????????????',
            render: text => <a>{text}</a>
        },
        {
            title:'?????????',
            dataIndex:'?????????',
            key:'?????????'
        },
        {
            title:'??????',
            dataIndex:'??????',
            key:'??????'
        },
    ]
    useEffect(()=>{
        let tableTemp=[]
        let itemTemp={}
        invoices.map((item,index)=>{
            // console.log(item.InvoiceNumber.number)
            itemTemp.?????? = index
            itemTemp.?????? = moment(item.createdAt).format('YYYY.MM.DD')
            itemTemp.??????????????? = item.InvoiceNumber.number
            itemTemp.????????? = item.InvoiceNumber.event
            itemTemp.?????? = item.InvoiceNumber.state
            tableTemp.push(itemTemp)
        })
        setTableInvoices(tableTemp)
    console.log('?????????',tableInvoices)
},[invoices])


    return me && (
        <User>
            <AppLayout>
            <div className='boardContainer'>
                <div className='dummy'></div>
                <div className='boardTop'>
                    <span className='size30 bold'><HistoryOutlined style={{color:'#1C4FA1', marginRight:10}}/>????????????</span>
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
                                <Menu.Item key="1" icon={<HistoryOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/invoice'>
                                        ????????????
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<QuestionCircleOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/qna'>
                                        ????????????
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<ProfileOutlined style={{ marginRight: 5 }} />}>
                                    <Link to='/profile'>
                                        ????????????
                                </Link>
                                </Menu.Item>
                            </Menu>
                    </div>
                    }
                    <div className={isPc?'collapseContainer':'collapseContainerM'}>

                        
                        {isPc&&
                        <Form className='searchInputContainer searchBoard'>
                        <input className='searchInput' placeholder='??????'></input>
                        <button className='searchInputButton'><SearchOutlined /></button>
                        </Form>
                        }
                        {(isTablet||isMobile)&&
                        <Form className='searchInputContainer'>
                        <input className='searchInput' placeholder='??????'></input>
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
            </AppLayout>
        </User>
    );
};

InvoiceList.propTypes = {

};

export default InvoiceList;