import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOG_OUT_REQUEST, SOCIAL_LOGIN_REQUEST } from '../../actions/types';
import KakaoLogin from "react-kakao-login";
import kakaobubble from '../../assets/kakaobubble.png'
const KakaoSocialLogin = () => {
    const dispatch = useDispatch();
    const responseKaKao = (e) => {
        console.log(e)
        const { nickname } = e.profile.kakao_account.profile

        dispatch({
            type: SOCIAL_LOGIN_REQUEST,
            data: { email: 'kakao' + e.profile.id + '@kakao.com', name: nickname },
        });
    }

    const responseFail = (e) => {
        console.log(e)
    }



    return (
        <>

            <KakaoLogin
                token={'0c9ac6f0dc23c8757aba947bb5adf739'}
                onSuccess={e => responseKaKao(e)}
                onFail={e => responseFail(e)}
                getProfile={true}
                style={{background:'#FED332',
                        height:50,
                        border:'1px solid #999',
                        cursor:'pointer'
                        }}
            >
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src={kakaobubble} style={{height:25}}/>
                    <span className='size18 bold'>&nbsp;카카오 로그인</span>
                </div>
            </KakaoLogin>

        </>
    );
};


export default KakaoSocialLogin;