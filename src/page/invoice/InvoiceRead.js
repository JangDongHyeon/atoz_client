
import React, { useCallback, useEffect, useState } from 'react';
import {
    LikeOutlined,

    LikeFilled,
    HeartOutlined,
    HeartTwoTone
} from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import AppLayout from '../../components/AppLayout';
import { useMediaQuery } from "react-responsive"
import { Fade } from 'react-reveal';
import Tracking from '../../components/service/Tracking';
import Alarm from '../../components/service/Alarm';
import { useDispatch, useSelector } from 'react-redux';
import { INVOICE_READ_REQUEST, JJIM_LIKE_REQUEST, JJIM_UNLIKE_REQUEST } from '../../actions/types';
const InvoiceRead = ({ match }) => {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const { invoice } = useSelector((state) => state.invoice);

    const userId = useSelector((state) => state.user.me?.id);
    // const [findFavo, setFindFavo] = useState(false)
    const findFavo = invoice && invoice.Likers.find(item => item.id === userId);
    const dispatch = useDispatch();

    // const isTablet = useMediaQuery({
    //     query: "(min-width:768px) and (max-width:1023px)"
    // });
    // const isMobile = useMediaQuery({
    //     query: "(max-width:767px)"
    // });
    // const [date, setDate] = useState(null);
    // const defaultProps = {
    //     center: {
    //         lat: 10.99835602,
    //         lng: 77.01502627
    //     },
    //     zoom: 11
    // };
    // const handleChange = value => {
    //     message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    //     setDate(value);
    // };

    // useEffect(() => {
    //     setFindFavo(invoice && invoice.Likers.find(item => item.id === userId));
    // }, [invoice])

    const favofite = useCallback(() => {

        if (!userId) {
            return alert('로그인 후 시작해주세요')
        }

        if (!findFavo)
            dispatch({
                type: JJIM_LIKE_REQUEST,
                data: { invoiceId: invoice.id }
            });
        else
            dispatch({
                type: JJIM_UNLIKE_REQUEST,
                data: { invoiceId: invoice.id }
            });



    }, [findFavo, userId]);

    useEffect(() => {
        dispatch({
            type: INVOICE_READ_REQUEST,
            data: { number: match.params.number }
        })
    }, [])

    return invoice && (
        <AppLayout>
            <div className='serviceContainer'>
                <div className='dummy' style={{ height: 45 }}></div>
                <div className={isPc ? 'serviceListWrap1' : 'serviceListWrap1M'}>
                    <div className='serviceTextContainer'>
                        <span className='size50'>배송추적</span>
                        <p className='gray1'>실시간 API요청 및 AI예측을 통한 배송추적 서비스입니다.</p>
                    </div>
                    {/* <Fade bottom> */}
                    <Tracking />
                    {/* </Fade> */}
                </div>
                <span key="comment-basic-like">
                    <Tooltip title="Like">
                        {findFavo ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={favofite} />
                            : <HeartOutlined key="heart" onClick={favofite} />}
                    </Tooltip>
                </span>
                <div className='serviceListWrap2'>
                    <div className='serviceTextContainer'>
                        <span className='size50'>{invoice.number}</span>
                        <p className='gray1'>이벤트:{invoice.event}</p>
                        <p className='gray1'>상태:{invoice.state}</p>
                    </div>
                    <Fade bottom>
                        <Alarm />
                    </Fade>

                </div>


                <div className='serviceListWrap2'>
                    <div className='serviceTextContainer'>
                        <span className='size50'>알림받기</span>
                        <p className='gray1'>내택배가 어떤 상태일까요? 실시간 알림을 받아보세요.</p>
                    </div>
                    <Fade bottom>
                        <Alarm />
                    </Fade>

                </div>
                <div className='serviceListWrap1'>
                    <div className='serviceTextContainer'>
                        <span className='size50'>운송사 정보</span>
                        <p className='gray1'>실시간 API요청 및 AI예측을 통한 배송추적 서비스입니다.</p>
                    </div>
                    <p>aaaaaaaaaaaaa</p>

                </div>
                <div className='serviceListWrap2'>
                    <div className='serviceTextContainer'>
                        <span className='size50'>지연사례</span>
                        <span className='gray1'>배송이 늦어진다면 어떤 이유들이 있을까요?</span>
                        <span className='gray1'>AtoZ만의 특별한 서비스를 로그인하면 무료로 이용하실 수 있습니다.</span>
                    </div>
                    <p>aaaaaaaaaaaaa</p>

                </div>
                <div className='serviceListWrap1'>
                    <div className='serviceTextContainer'>
                        <span className='size50'>금지품목</span>
                        <p className='gray1'>금지품목을 알아보세요.</p>
                    </div>
                    <p>aaaaaaaaaaaaa</p>

                </div>
                <div className='serviceListWrap2'>
                    <div className='serviceTextContainer'>
                        <span className='size50'>평균운송료</span>
                        <p className='gray1'>로그인을 하면 각 배송사별 운송료를 예측 할 수 있습니다.</p>
                    </div>
                    <p>aaaaaaaaaaaaa</p>

                </div>
            </div>
        </AppLayout>
    );
};

InvoiceRead.propTypes = {};

export default InvoiceRead;