import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Modal, Input, Comment } from 'antd';
import {
    EllipsisOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Link, withRouter } from 'react-router-dom';

moment.locale('ko')
const InvoiceCard = ({ invoice, history }) => {
    // const dispatch = useDispatch();
    // const id = useSelector((state) => state.user.me?.id);
    // const role = useSelector((state) => state.user.me?.role);
    // const removeInvoiceLoading = useSelector((state) => state.invoice.deleteInvoicesLoading);



    // const onRemoveInvoice = useCallback(() => {
    //     if (!id) {
    //         return alert('로그인이 필요합니다.');
    //     }
    //     return dispatch({
    //         type: INVOICE_DELETE_REQUEST,
    //         data: { invoiceId: invoice.id }
    //     });
    // }, [id, invoice]);

    // const onUpdateInvoice = useCallback(() => {
    //     if (!id) {
    //         return alert('로그인이 필요합니다.');
    //     }
    //     history.replace(`/invoice/${invoice.id}`);
    // }, [id, invoice]);




    return (
        <div style={{ marginBottom: 20 }}>

            <Comment
                // cover={invoice.PImages[0] && <InvoiceImage images={invoice.Images} />}
                actions={[

                    <Popover
                        key="more"
                        content={(
                            <Button.Group>

                                {/* {id && role && (invoice.User.id === id || role === 'admin')
                                    ? (
                                        <>

                                            <Button type="danger" loading={removeInvoiceLoading} onClick={onRemoveInvoice}>삭제</Button>
                                            <Button type="primary" onClick={onUpdateInvoice}>업데이트</Button>
                                        </>
                                    )
                                    : <></>} */}
                            </Button.Group>
                        )}
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                // author={invoice.User.name}
                datetime={<p>{moment(invoice.createdAt).format('YYYY.MM.DD')}</p>}
                content={
                    <>
                        {!invoice.InvoiceNumber ? (<><b>{invoice.number}</b>
                            <br></br>
                            <p>
                                {invoice.event}
                            </p>
                            <p>
                                {invoice.state}
                            </p></>) : (<><b>{invoice.InvoiceNumber.number}</b>
                                <br></br>
                                <p>
                                    {invoice.InvoiceNumber.event}
                                </p>
                                <p>
                                    {invoice.InvoiceNumber.state}
                                </p></>)}


                    </>
                }
            >



            </Comment>

        </div>
    );
};

InvoiceCard.propTypes = {

};

export default withRouter(InvoiceCard);