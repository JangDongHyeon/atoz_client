
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';


const Admin = ({ children, history }) => {
    const { me } = useSelector((state) => state.user);
    useEffect(() => {
        if (!me)
            history.push(`/signin`);
        else if (me.role !== 'admin') {
            alert('관리자 권한이없습니다.')
            history.push(`/`);
        }
    }, []);
    return <>{children}</>;
}

export default withRouter(Admin);