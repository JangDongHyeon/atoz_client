
import React, { useCallback, useEffect, useState } from 'react';

import { Modal, Select, Form, Checkbox, Divider, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { useMediaQuery } from "react-responsive"
import { GET_CONU_TRAN_REQUEST, INVOICE_SEARCH_REQUEST, USER_UPDATE_REQUEST, INVOICE_RESET } from '../actions/types';
import logo2 from '../assets/logo2.png'
import useInput from '../hooks/useInput';
import { withRouter } from 'react-router-dom';

const { Option } = Select;
const Home = ({ history }) => {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });
    const [showModal, setShowModal] = useState(false);
    const [country, setCountry] = useState([]);
    const [weight, setWeight] = useState('1');
    const [transit, setTransit] = useState([]);
    const [checkbx, setChecBx] = useState(false)
    const dispatch = useDispatch();
    const { me, countrys, transits } = useSelector((state) => state.user);
    const { searchInvoicesDone, searchInvoice } = useSelector((state) => state.invoice);
    const [invoiceNumber, onChangeInvoiceNumber] = useInput('');

    const HAS_VISITED_BEFORE = localStorage.getItem('hasVisitedBefore');

    useEffect(() => {
        const handleShowModal = () => {
            if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
                return;
            }

            if (!HAS_VISITED_BEFORE) {
                setShowModal(true);
                // let expires = new Date();
                // expires = expires.setHours(expires.getHours() + 24);
                // localStorage.setItem('hasVisitedBefore', expires);
            }
        };
        if (me && me.Countryed && me.Countryed.length === 0)
            window.setTimeout(handleShowModal, 2000);
    }, [HAS_VISITED_BEFORE, me]);

    useEffect(() => {
        dispatch({
            type: GET_CONU_TRAN_REQUEST
        })
    }, [])

    useEffect(() => {
        if (searchInvoicesDone) {

            dispatch({
                type: INVOICE_RESET
            })
            history.replace(`/invoice/${searchInvoice.number}`);
        }

    }, [searchInvoicesDone, searchInvoice])

    const handleClose = () => {
        setShowModal(false)
        if (checkbx) {
            let expires = new Date();
            expires = expires.setHours(expires.getHours() + 24);
            localStorage.setItem('hasVisitedBefore', expires);
        }
    };

    const handleChangeSelect = (e, i, name) => {

        if (name === 'country') {


            setCountry(e)
        }
        else if (name === 'weight') {
            setWeight(e)
        }
        else if (name === 'transit') {


            setTransit(e)
        }

    }


    const onSubmit = useCallback(() => {

        dispatch({
            type: INVOICE_SEARCH_REQUEST,
            data: { search: invoiceNumber },
        });
    }, [invoiceNumber]);



    const checkOnChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setChecBx(e.target.checked)

    }

    const handleOk = useCallback(() => {
        setShowModal(false);

        dispatch({
            type: USER_UPDATE_REQUEST,
            data: { country, weight, transit },
        });
    }, [country, weight, transit]);

    const modalCheckView = () => (
        <Modal visible={showModal} onOk={handleOk} onCancel={handleClose} width={450}>
            {/* <Form onFinish={onSubmit}> */}
            <div className='modalCheckViewContainer'>
                <div className='modalCheckViewTop'>
                    <img src={logo2} style={{ width: 30, height: 30, marginRight: 10 }} />
                    <span className='bold size18'>추가입력사항</span>
                </div>
                <Divider />

                <div className='modalCheckViewMiddle'>
                    <div style={{ marginBottom: 20 }}>
                        <span className='size16'>다음 항목을 입력하시면, <span className='bold'>더욱 정확한 정보</span>를 서비스 받으실 수 있습니다.</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='blueCircle'></div><span>주로 발송하는 국가는 어디인가요?</span>
                    </div>
                    <Checkbox.Group options={countrys} optionType="button" buttonStyle="solid" onChange={(e, i) => handleChangeSelect(e, i, 'country')} style={{ marginTop: 8 }} />

                    <Divider style={{ visibility: 'hidden' }} />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='blueCircle'></div><span>주로 사용하시는 운송사는 어디인가요?</span>
                    </div>
                    <Checkbox.Group options={transits} optionType="button" buttonStyle="solid" onChange={(e, i) => handleChangeSelect(e, i, 'transit')} style={{ marginTop: 8 }} />

                    <Divider style={{ visibility: 'hidden' }} />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='blueCircle'></div><span>평소 어느정도 무게를 배송 하시나요?</span>
                    </div>
                    <Select defaultValue={weight} style={{ width: 250, marginTop: 8 }} onChange={(e, i) => handleChangeSelect(e, i, 'weight')}>
                        <Option value='0'>1~10kg</Option>
                        <Option value='1'>11~20kg</Option>
                        <Option value='2'>31~40kg</Option>
                        <Option value='3'>41~50kg</Option>
                    </Select>
                    <Divider style={{ visibility: 'hidden' }} />
                    <Checkbox onChange={checkOnChange} style={{ float: 'right' }}>24시간동안 안보기</Checkbox>
                </div>

            </div>


            {/* <div style={{ marginTop: 10 }}>
                            <Button type="primary" htmlType="submit" loading={profileUpdateLoading}>입력</Button>
                        </div> */}
            {/* </Form> */}

        </Modal>
    )
    return (
        <AppLayout>
            <div className='homeContainer'>
                <div className='homeTop'>
                    {(isPc) && <div>
                        <span className='blue1 size100'>A</span><span className='yellow1 size100'>to</span><span className='blue1 size100'>Z</span>
                    </div>}
                    {(isMobile || isTablet) && <div>
                        <span className='blue1 size50'>A</span><span className='yellow1 size50'>to</span><span className='blue1 size50'>Z</span>
                    </div>}

                    <Form onFinish={onSubmit} className='searchInputContainer'>

                        <input className='searchInput' value={invoiceNumber} required onChange={onChangeInvoiceNumber} placeholder='운송장번호를 입력하세요'></input>
                        <button className='searchInputButton' htmlType="submit">z</button>



                    </Form>

                </div>
                <div className='homeBottom'>
                    <div className='homeBottomText'>
                        <span>아직 배송 전이시라면, <span className='blue1 bold'>AI로 배송기간</span>을 예측하세요.</span>
                    </div>
                </div>
            </div>
            {showModal && countrys && transits &&
                modalCheckView()
            }
        </AppLayout>
    );
};

Home.propTypes = {};

export default withRouter(Home);