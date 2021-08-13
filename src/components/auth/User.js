
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';


const User = ({ children, history }) => {
    const { me } = useSelector((state) => state.user);
  
    useEffect(() => {
        if (!me)
            history.push(`/signin`);


    }, []);
    return <>{children}</>;
}

export default withRouter(User);