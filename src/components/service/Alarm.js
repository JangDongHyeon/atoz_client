
import React, { useState } from 'react';
import { render } from 'react-dom';
import { DatePicker, message, Switch  } from 'antd';
import AppLayout from '../AppLayout';
import { useMediaQuery } from "react-responsive"
import {
        StaticGoogleMap,
        Marker,
        Path,
} from 'react-static-google-map';
import { blue,yellow } from '@ant-design/colors';
const Alarm = () => {
        const isPc = useMediaQuery({
                query: "(min-width:1024px)"
        });
        const isTablet = useMediaQuery({
                query: "(min-width:768px) and (max-width:1023px)"
        });
        const isMobile = useMediaQuery({
                query: "(max-width:767px)"
        });

        const onChange=()=>{

        }

console.log(blue)
        return (
                        <div className={isPc?'alarmContainer':'alarmContainerM'}>
                                <div className='switchContainer'>
                                    <div className='switchWrap'>
                                    <Switch defaultChecked onChange={onChange} /><span> 지연해제시</span>

                                    </div>
                                    <div className='switchWrap'>
                                    <Switch defaultChecked onChange={onChange} /><span> 지연발생시</span>
                                    </div>
                                    <div className='switchWrap'>
                                    <Switch defaultChecked onChange={onChange} /><span> 배송완료시</span>
                                    </div>
                                </div>
                                <div className='searchInputContainer'>
                                        <input className='searchInput' placeholder='email을 입력하세요'></input>
                                        <button className='searchInputButton'>z</button>
                        </div>
                </div>
        );
};

Alarm.propTypes = {};

export default Alarm;