import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Modal, Input, Comment } from 'antd';
import {
    EllipsisOutlined,
    HeartOutlined,
    HeartTwoTone
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Link, withRouter } from 'react-router-dom';
import { JJIM_LIKE_REQUEST, JJIM_UNLIKE_REQUEST } from '../../actions/types';

moment.locale('ko')
const InvoiceLikeCard = ({ invoice, history }) => {
    const dispatch = useDispatch();
    // const id = useSelector((state) => state.user.me?.id);
    // const role = useSelector((state) => state.user.me?.role);
    // const removeInvoiceLoading = useSelector((state) => state.invoice.deleteInvoicesLoading);
    const userId = useSelector((state) => state.user.me?.id);
    console.log(invoice)
    const findFavo = invoice && invoice.Like && invoice.Like.UserId === userId;



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

    const favofite = useCallback(() => {
        console.log(userId)
        if (!userId) {
            return alert('로그인 후 시작해주세요')
        }

        if (!findFavo)
            dispatch({
                type: JJIM_LIKE_REQUEST,
                data: { invoiceId: invoice.id, check: 'jjimList' }
            });
        else
            dispatch({
                type: JJIM_UNLIKE_REQUEST,
                data: { invoiceId: invoice.id, check: 'jjimList' }
            });



    }, [findFavo, userId]);


    return (
        <div style={{ marginBottom: 20 }}>

            <Card
                // cover={invoice.PImages[0] && <InvoiceImage images={invoice.Images} />}



                actions={[
                    findFavo ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={favofite} />
                        : <HeartOutlined key="heart" onClick={favofite} />,
                    <Popover
                        key="more"
                        content={(
                            <Button.Group>




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
                        {!invoice ? (<><b>{invoice.number}</b>
                            <br></br>
                            <p>
                                {invoice.event}
                            </p>
                            <p>
                                {invoice.state}
                            </p></>) : (<><b>{invoice.number}</b>
                                <br></br>
                                <p>
                                    {invoice.event}
                                </p>
                                <p>
                                    {invoice.state}
                                </p></>)}


                    </>
                }
            >



            </Card>

        </div>
    );
};

InvoiceLikeCard.propTypes = {

};

export default withRouter(InvoiceLikeCard);