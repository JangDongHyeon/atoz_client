
import React, { useCallback, useEffect, useState } from 'react';

import { Modal, Select, Form, Checkbox, Divider, Button, Alert,message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { useMediaQuery } from "react-responsive"
import { GET_CONU_TRAN_REQUEST, INVOICE_SEARCH_REQUEST, USER_UPDATE_REQUEST, INVOICE_RESET } from '../actions/types';
import logo2 from '../assets/logo2.png'
import atoz_logo3 from '../assets/atoz_logo3.png'
import useInput from '../hooks/useInput';
import { withRouter } from 'react-router-dom';
import { SearchOutlined,} from '@ant-design/icons';
import usa from '../assets/usa.png'
import can from '../assets/can.png'
import ups from '../assets/ups.png'
import ems from '../assets/ems.png'
import { Reveal, Fade } from 'react-reveal';

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
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
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
                setShowCheckModal(true);
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
        setShowCheckModal(false)
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
        console.log('checkbx',checkbx)
        if(!checkbx){
            console.log('aaaaaaa')
            if(country.length==0)
                return message.error('????????? ???????????????.')
            if(weight=='1')
                return message.error('???????????? ???????????????.')
            if(transit.length==0)
                return message.error('????????? ???????????????.')
            dispatch({
                type: USER_UPDATE_REQUEST,
                data: { country, weight, transit },
            });
        }
        else{
            setShowCheckModal(false);
            if (checkbx) {
                let expires = new Date();
                expires = expires.setHours(expires.getHours() + 24);
                localStorage.setItem('hasVisitedBefore', expires);
            }

        }


       

    }, [country, weight, transit,checkbx]);

    const modalServicePossibleView =()=>(
        <Modal visible={showServiceModal} onCancel={(e)=>setShowServiceModal(false)} width={450}>
            <div className='modalTop'>
                <img src={logo2} style={{ width: 30, height: 30, marginRight: 10 }} />
                <span className='bold size18'>??????????????? ??????</span>
            </div>
            <Divider />
                <div style={{float:'right', marginTop:-20, color:'#999'}}>21???.12??? ??????</div>
            <div className='countryContainer'>
                <div className='countryWrap'>
                    <img className='countryImg'src={usa} />
                    ??????
                </div>
                <div className='countryWrap'>
                    <img className='countryImg'src={can} />
                    ?????????
                </div>
            </div>

            <div className='modalTop'>
                <img src={logo2} style={{ width: 30, height: 30, marginRight: 10 }} />
                <span className='bold size18'>??????????????? ?????????</span>
            </div>
            <Divider />
                <div style={{float:'right', marginTop:-20, color:'#999'}}>21???.12??? ??????</div>
                <div className='countryContainer'>
                <div className='countryWrap'>
                    <img className='countryImg'src={ups} />
                    UPS
                </div>
                <div className='countryWrap'>
                    <img className='countryImg'src={ems} />
                    EMS
                </div>
            </div>
        </Modal>
    )
    const modalCheckView = () => (
        <Modal visible={showCheckModal} onOk={handleOk} onCancel={handleClose} width={450}>
            <div className='modalCheckViewContainer'>
                <div className='modalCheckViewTop'>
                    <img src={logo2} style={{ width: 30, height: 30, marginRight: 10 }} />
                    <span className='bold size18'>??????????????????</span>
                </div>
                <Divider />

                <div className='modalCheckViewMiddle'>
                    <div style={{ marginBottom: 20 }}>
                        <span className='size16'>?????? ????????? ???????????????, <span className='bold'>?????? ????????? ??????</span>??? ????????? ????????? ??? ????????????.</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='blueCircle'></div><span>?????? ???????????? ????????? ????????????????</span>
                    </div>
                    <Checkbox.Group options={countrys} optionType="button" buttonStyle="solid" onChange={(e, i) => handleChangeSelect(e, i, 'country')} style={{ marginTop: 8 }} />

                    <Divider style={{ visibility: 'hidden' }} />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='blueCircle'></div><span>?????? ??????????????? ???????????? ????????????????</span>
                    </div>
                    <Checkbox.Group options={transits} optionType="button" buttonStyle="solid" onChange={(e, i) => handleChangeSelect(e, i, 'transit')} style={{ marginTop: 8 }} />

                    <Divider style={{ visibility: 'hidden' }} />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='blueCircle'></div><span>?????? ???????????? ????????? ?????? ?????????????</span>
                    </div>
                    <Select defaultValue={weight} style={{ width: 250, marginTop: 8 }} onChange={(e, i) => handleChangeSelect(e, i, 'weight')}>
                        <Option value='0'>1~5kg</Option>
                        <Option value='1'>5~10kg</Option>
                        <Option value='2'>10~15kg</Option>
                        <Option value='3'>15~20kg</Option>
                    </Select>
                    <Divider style={{ visibility: 'hidden' }} />
                    <Checkbox onChange={checkOnChange} style={{ float: 'right' }}>24???????????? ?????????</Checkbox>
                </div>

                <div className="modalCheckViewBottom">
                            <Button type="primary" onClick={(e)=>handleOk()}>??????</Button>
                        </div>
            </div>



        </Modal>
    )
    return (
        <AppLayout>
            <div className='homeContainer'>

                <div className='homeTop'>

                    {(isPc) && <div style={{ zIndex:10}}>
                        <span className='blue1 size100'>A</span><span className='yellow1 size60'>to</span><span className='blue1 size100'>Z</span>
                    </div>}
                    {(isMobile || isTablet) && <div>
                        <span className='blue1 size50'>A</span><span className='yellow1 size50'>to</span><span className='blue1 size50'>Z</span>
                    </div>}
                    {/* <img src={atoz_logo3} style={{width:200}}/> */}
                    <Form onFinish={onSubmit} className='searchInputContainer'>

                        <input className='searchInput' value={invoiceNumber} required onChange={onChangeInvoiceNumber} placeholder='?????????????????? ???????????????'></input>
                        <button className='searchInputButton'><SearchOutlined /></button>



                    </Form>

                </div>
                <div className='homeBottom'>
                    <div className='homeBottomText'>
                        <p>?????? ?????? ???????????????, <span className='blue1 bold'>AI??? ????????????</span>??? ???????????????.</p>
                        <p>????????????????????????, ?????????<button className='nudeButton' onClick={(e)=>setShowServiceModal(true)}> <span className='blue1 bold'>??????</span></button></p>
                    </div>
                </div>
            </div>
            {console.log(countrys.length>0)
            // console.log(transits.length>0)
            }
            {showCheckModal && countrys.length>0 && transits.length>0 &&
                modalCheckView()
            }
            {
                modalServicePossibleView()
            }
        </AppLayout>
    );
};

Home.propTypes = {};

export default withRouter(Home);