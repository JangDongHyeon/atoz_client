import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input, Collapse, Popconfirm, Divider } from 'antd';
import {
    RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone, ExclamationCircleFilled
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FAQ_DELETE_REQUEST } from '../../actions/types';
import { Route, Link, withRouter } from 'react-router-dom';
moment.locale('ko')
const FaqCard = ({ index, history, faqs }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const role = useSelector((state) => state.user.me?.role);
    const removeFaqLoading = useSelector((state) => state.faq.deleteFaqsLoading);

    const onRemoveFaq = (faq) => {

        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        message.success('삭제 되었습니다.');
        return dispatch({
            type: FAQ_DELETE_REQUEST,
            data: { faqId: faq.id }
        });


    };



    const onUpdate = (faq) => {
        // e.stoppropagation()
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        history.replace(`/faq/${faq.id}`);
    };

    function cancel(e) {
        console.log(e);
        message.error('취소 되었습니다.');
    }

    const { Panel } = Collapse;

    const renderPanel = (faq, index) => {

        const renderHeader = (faq, index) => (
            <div style={{ width: '95%', display: 'flex', justifyContent: 'space-between' }}>
                <span>{index}</span>
                <span className='ellipsis'>{faq.title}</span>
                <span className='size14 gray1'>{moment(faq.createdAt).format('YYYY-MM-DD')}</span>
            </div>
        )


        return (
            <Panel header={renderHeader(faq, index)} key={index}>
                <div>
                    {faq.FImages[0] &&
                        faq.FImages.map((item) => (
                            <img src={`http://155.230.95.97:50001/${item.src}`} alt={item.src} />
                        ))
                    }
                </div>
                {faq.content}
                {id && role && (faq.User.id === id || role === 'admin')
                    ? (
                        <div style={{ textAlign: 'right' }}>
                            <Divider />

                            <button className='nudeButton' onClick={(e) => onUpdate(faq)}>수정</button>
                            <Divider type='vertical' />
                            <Popconfirm
                                title="정말 삭제 하시겠습니까?"
                                onConfirm={(e) => onRemoveFaq(faq)}
                                onCancel={cancel}
                                okText="네"
                                cancelText="아니오"
                            >
                                <a href="#">삭제</a>
                            </Popconfirm>
                        </div>
                    )
                    : <></>}
            </Panel>
        )
    }


    return (

        <>
            <Collapse accordion style={{ width: '100%' }}
            // expandIcon={({ isActive }) => <ExclamationCircleFilled rotate={isActive ? 90 : 0} style={{fontSize:30, color:'#cfcfcf',backgroundColor:'#fff'}}/>}
            >
                {faqs.map((item, index) =>
                    renderPanel(item, index))}
                {/* <p>{moment(faq.createdAt).format('YYYY.MM.DD')}</p> */}

            </Collapse>
        </>
    );
};

FaqCard.propTypes = {

};

export default withRouter(FaqCard);