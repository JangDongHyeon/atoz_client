import React, { useEffect, } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { QNA_GET_REQUEST } from '../../actions/types';
import QnaCard from '../../components/qna/QnaCard';
import User from '../../components/auth/User';

const Qna = props => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { loadQnasLoading, qnas, hasMoreQnas } = useSelector((state) => state.qna);


    useEffect(() => {

        dispatch({
            type: QNA_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [me])

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreQnas && !loadQnasLoading) {

                    const lastId = qnas[qnas.length - 1]?.id;
                    dispatch({
                        type: QNA_GET_REQUEST,
                        data: { lastId, check: true },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreQnas, loadQnasLoading, qnas]);



    return me && (
        <User>
            <AppLayout>

                {qnas.length > 0 && qnas.map((qna, i) => <QnaCard key={i} qna={qna} />)}
            </AppLayout>
        </User>
    );
};

Qna.propTypes = {

};

export default Qna;