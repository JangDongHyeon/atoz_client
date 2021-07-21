
import React, { useState } from 'react';
import { render } from 'react-dom';
import { DatePicker, message, Slider } from 'antd';
import AppLayout from '../AppLayout';
import { useMediaQuery } from "react-responsive"
import GoogleMapReact from 'google-map-react';
import {
        StaticGoogleMap,
        Marker,
        Path,
} from 'react-static-google-map';
const Tracking = () => {
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
        const defaultProps = {
                center: {
                        lat: 10.99835602,
                        lng: 77.01502627
                },
                zoom: 0
        };

        const marks = {
                0: '픽업',
                20: '출항',
                40: '환적',
                60: '통관',
                80: '배송',
                100: '완료'
        };
        const trackData=[
                {
                        state:'픽업',
                        location:'대구',
                        date: '21/04/30/(금) am 10:30',
                        pass:true,
                        currentLocation:false,
                        delay:false,
                },
                {
                        state:'출항',
                        location:'대구',
                        date: '21/04/30/(금) am 10:30',
                        pass:true,
                        currentLocation:false,
                        delay:false,
                },
                {
                        state:'지연',
                        location:'대구',
                        date: '21/04/30/(금) am 10:30',
                        pass:true,
                        currentLocation:false,
                        delay:false,
                },
                {
                        state:'환적1',
                        location:'대구',
                        date: '21/04/30/(금) am 10:30',
                        pass:true,
                        currentLocation:false,
                        delay:false,
                },
                {
                        state:'환적2',
                        location:'대구',
                        date: '21/04/30/(금) am 10:30',
                        pass:true,
                        currentLocation:true,
                        delay:false,
                },
                {
                        state:'환적3',
                        location:'대구',
                        date: '21/04/30/(금) am 10:30',
                        pass:true,
                        currentLocation:false,
                        delay:false,
                },
                {
                        state:'통관',
                        location:'대구',
                        date: '21/04/30/(금) am 10:30',
                        pass:false,
                        currentLocation:false,
                        delay:false,
                },
                {
                        state:'배송',
                        location:'대구',
                        date: '21/04/30/(금) am 10:30',
                        pass:false,
                        currentLocation:false,
                        delay:false,
                },

        ]

        const renderItem = (item) => {
                return (
                        <div className='listItemContainer'>
                                <div className='listItemLeft'>
                                        {item.state}

                                </div>
                                <div className='listItemMiddle'>
                                        {item.currentLocation?<div className='listCircle2'></div>:<div className='listCircle1'></div>}
                                </div>
                                <div className='listItemRight'>
                                        {item.location}

                                </div>
                        </div>
                )
        }
                

                
                

        

        return (
                <div className='trackingContainer'>
                        <div className='tracklistContainer'>
                                <div className='topContainer'>
                                        운송장번호:ASDFASFQWE234
                                </div>

                                <div className='listContainer'>
                                        {trackData.map((item)=>(
                                                renderItem(item)
                                        )

                                        )}
                                        
                                </div>


                        </div>
                        <div className='mapContainer'>

                                {/* <GoogleMapReact
                                        bootstrapURLKeys={{ key: "AIzaSyAaWMGexWmY_sJ8_yniNgtfjrsMkDdbh5U" }}
                                        defaultCenter={defaultProps.center}
                                        defaultZoom={defaultProps.zoom}
                                        scale={0}
                                >

                                </GoogleMapReact> */}
                                <StaticGoogleMap size="640x400" apiKey="AIzaSyAaWMGexWmY_sJ8_yniNgtfjrsMkDdbh5U"
                                        center="39.882914836997195, 177.5429478211556"
                                        scale={1}
                                        zoom="1">
                                        <Path
                                                color="0xff0000ff"
                                                weight="5"
                                                points={[
                                                        { lat: 40.737102, lng: -73.990318 },
                                                        '40.749825,-73.987963',
                                                        { lat: 40.752946, lng: -73.987384 },
                                                        { lat: 40.755823, lng: -73.986397 },
                                                ]}
                                        />
                                </StaticGoogleMap>
                        </div>
                </div>
        );
};

Tracking.propTypes = {};

export default Tracking;