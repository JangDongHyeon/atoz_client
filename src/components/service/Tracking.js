
import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { DatePicker, message, Divider } from 'antd';
import AppLayout from '../AppLayout';
import { useMediaQuery } from "react-responsive"
import GoogleMapReact from 'google-map-react';
// import { GoogleMap, LoadScript ,Polyline} from '@react-google-maps/api';
import { Reveal, Fade } from 'react-reveal';
import {
        StaticGoogleMap,
        Marker,
        Path,
} from 'react-static-google-map';
import {t} from 'react-switch-lang';
import warn from '../../assets/warn.png'
import { CheckOutlined,StarFilled, CheckCircleFilled, WarningFilled, AimOutlined  } from '@ant-design/icons';
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
        const trackData = [
                {
                        stateTitle: '픽업',
                        location: '대구',
                        date: '21/04/30/(금) am 10:30',
                        state: 'passed',
                },
                {
                        stateTitle: '출항',
                        location: '대구',
                        date: '21/04/30/(금) am 10:30',
                        state: 'passed',
                },
                {
                        stateTitle: '지연',
                        location: '대구',
                        date: '21/04/30/(금) am 10:30',
                        state: 'passed',

                },
                {
                        stateTitle: '환적1',
                        location: '대구',
                        date: '21/04/30/(금) am 10:30',
                        state: 'passed',

                },
                {
                        stateTitle: '환적2',
                        location: '대구',
                        date: '21/04/30/(금) am 10:30',
                        state: 'current',

                },
                {
                        stateTitle: '지연',
                        location: '대구',
                        date: '21/04/30/(금) am 10:30',
                        state: 'delay',


                },
                {
                        stateTitle: '환적3',
                        location: '대구',
                        date: '21/04/30/(금) am 10:30',
                        state: 'notyet',

                },
                {
                        stateTitle: '통관',
                        location: '대구',
                        date: '21/04/30/(금) am 10:30',
                        state: 'notyet',

                },
                {
                        stateTitle: '배송',
                        location: '대구',
                        date: '21/04/30/(금) am 10:30',
                        state: 'notyet',

                },

        ]

        const renderItem = (item, index) => {
                return (
                        <div className='listItemContainer'>
                                <div className='listItemLeft'>
                                        {item.stateTitle}
                                </div>

                                {item.state == 'passed' &&

                                        <div className={index == 0 ? 'listItemMiddle3' : 'listItemMiddle2'}>
                                                <CheckCircleFilled className='listCircle1'/>
                                                {/* <div className='listCircle1'><CheckOutlined style={{color:'#fff', fontSize:12, fontWeight:'bold', position:'relative', top:-2, left:3, }}/></div> */}
                                        </div>
                                }

                                {item.state == 'current' &&
                                        <div className='listItemMiddle2'>
                                                
                                                {/* <AimOutlined className='listCircle2'/> */}
                                                <div className='listCircle2'><StarFilled  style={{color:'#7CC321', fontSize:16, fontWeight:'bold', position:'relative', top:3, left:5, }}/></div>
                                        </div>
                                }

                                {item.state == 'delay' &&
                                        <div className='listItemMiddle4'>
                                                <img src={warn} style={{ width: 35, height: 35, left: -16, top: 10, position: 'relative', zIndex: 10, }} />
                                        </div>
                                }
                                {item.state == 'notyet' &&
                                        <div className='listItemMiddle1'>
                                                <div className='listCircle3'></div>
                                        </div>
                                }

                                <div className='listItemRight'>
                                        <div className='bold'>{item.location}</div>
                                        <div>{item.date}</div>

                                </div>
                        </div>
                )
        }
        const trackingView = () => {
                return (
                        <div className={isPc?'tracklistContainer':'tracklistContainerM'}>
                                <div className='topContainer'>
                                        <span className='bold'>운송장번호:ASDFASFQWE234</span>
                                </div>
                                <div className='listContainer'>
                                        {trackData.map((item, index) => (
                                                renderItem(item, index)
                                        )

                                        )}

                                </div>


                        </div>
                )

        }
        const Marker = ({ text }) => <div>{text}</div>;
        const lineSymbol = {
                path: "M 0,-1 0,1",
                strokeOpacity: 1,
                scale: 4,
              };
        const markers= [
                {title:'1',lat: 70.212008, lng: 23.839086},
                {title:'1', lat: 53.42728, lng: -6.24357},
                {title:'1',lat: 43.681583, lng: -79.61146},
                {title:'1',lat: 31.362232, lng:  -112.877804},
        ]
        const markers1= [
                {title:'1',lat: 70.212008, lng: 23.839086},
                {title:'1', lat: 53.42728, lng: -6.24357},
        ]
        const markers2= [
                {title:'1', lat: 53.42728, lng: -6.24357},
                {title:'1',lat: 43.681583, lng: -79.61146},
        ]
        
        const apiIsLoaded=(map, maps)=>{
                // console.log(maps)
                let geodesicPolyline = new maps.Polyline({
                        path: markers,
                        geodesic: true,
                        // strokeOpacity: 1.0,
                        strokeOpacity: 0,
                        strokeWeight: 4,
                        strokeColor: '#e75319',
                        icons: [
                                {
                                  icon: lineSymbol,
                                  offset: "0",
                                  repeat: "20px",
                                },
                              ],
                })
                let geodesicPolyline2 = new maps.Polyline({
                        path: markers2,
                        geodesic: true,
                        // strokeOpacity: 1.0,
                        strokeOpacity: 0,
                        strokeWeight: 4,
                        strokeColor: '#000',
                        icons: [
                                {
                                  icon: lineSymbol,
                                  offset: "0",
                                  repeat: "20px",
                                },
                              ],
                })
                geodesicPolyline.setMap(map)
                // geodesicPolyline2.setMap(map)

                var bounds = new maps.LatLngBounds()
                // let fitbounds = new map.fitbounds()
                for (let e of markers){
                        bounds.extend(
                                new maps.LatLng(e.lat, e.lng)
                        )
                }
                map.fitBounds(bounds)

        }



        const mapView = () => {

                return (

                        <div className={isPc ? 'mapContainer' : 'mapContainerM'}>
                                                {t('home.title')}

                                <GoogleMapReact
                                        bootstrapURLKeys={{ key: "AIzaSyAaWMGexWmY_sJ8_yniNgtfjrsMkDdbh5U" }}
                                        defaultCenter={defaultProps.center}
                                        defaultZoom={defaultProps.zoom}
                                        options={{minZoom:2, maxZoom:10}}
                                        scale={0}
                                        yesIWantToUseGoogleMapApiInternals
                                        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                                        
                                >
                                        {markers&&markers.map((item)=>(
                                                <Marker text={item.title} lat={item.lat} lng={item.lng} />
                                        ))                                   
                                        }
        <Marker text={'YYZ'} lat={43.681583} lng={-79.61146} />
                                </GoogleMapReact>
                                {/* <LoadScript
                                googleMapsApiKey='AIzaSyAaWMGexWmY_sJ8_yniNgtfjrsMkDdbh5U'
                                                                >
                                        <GoogleMap
                                        defaultZoom={8}
                                        mapContainerStyle={{width:400, height:400}}
                                        center={{ lat: -3.745,
                                                lng: -38.523}}
                                        defaultCenter={{ lat: -34.397, lng: 150.644 }}
                                        >
                                        </GoogleMap>
                                </LoadScript> */}
                                {/* <StaticGoogleMap size="640x380" apiKey="AIzaSyAaWMGexWmY_sJ8_yniNgtfjrsMkDdbh5U"
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
                                </StaticGoogleMap> */}
                        </div>
                )

        }


        return (
                <>
                        {
                                isPc &&
                                <div className='trackingContainer'>

                                        <Fade bottom>
                                                {trackingView()}
                                        </Fade>
                                        <Fade bottom>
                                                {mapView()}
                                        </Fade>
                                </div>
                        }
                        {
                                (isMobile || isTablet) &&
                                <div className='trackingContainerM'>
                                        <Fade bottom>
                                                {mapView()}
                                        </Fade>
                                        <Fade bottom>
                                                {trackingView()}
                                        </Fade>
                                </div>
                        }

                </>
        );
};

Tracking.propTypes = {};

export default Tracking;