
import React, { useState } from 'react';
import { render } from 'react-dom';
import { DatePicker, message } from 'antd';
import AppLayout from '../components/AppLayout';
import { useMediaQuery } from "react-responsive"
const Home = () => {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });
    const [date, setDate] = useState(null);
    const handleChange = value => {
        message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        setDate(value);
    };
    return (
        <AppLayout>
            <div className='homeContainer'>
                <div className='homeTop'>
                    {(isPc||isTablet)&&<div>
                        <span className='blue1 size100'>A</span><span className='yellow1 size100'>to</span><span className='blue1 size100'>Z</span>
                    </div>}
                    {(isMobile)&&<div>
                        <span className='blue1 size50'>A</span><span className='yellow1 size50'>to</span><span className='blue1 size50'>Z</span>
                    </div>}
                    <div className='searchInputContainer'>
                        <input className='searchInput' placeholder='운송장번호를 입력하세요'></input>
                        <button className='searchInputButton'>z</button>
                    </div>
                </div>
                <div className='homeBottom'>
                    <div className='homeBottomText'>
                    <span>아직 배송 전이시라면, <span className='blue1 bold'>AI로 배송기간</span>을 예측하세요.</span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

Home.propTypes = {};

export default Home;