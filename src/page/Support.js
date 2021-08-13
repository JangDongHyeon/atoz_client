
import React, { useCallback, useEffect, useState } from 'react';

import { Modal, Select, Form, Checkbox, Divider, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import SupportLayout from '../components/SupportLayout';
import { useMediaQuery } from "react-responsive"
import { GET_CONU_TRAN_REQUEST, INVOICE_SEARCH_REQUEST, USER_UPDATE_REQUEST, INVOICE_RESET } from '../actions/types';
import logo2 from '../assets/logo2.png'
import useInput from '../hooks/useInput';
import { withRouter } from 'react-router-dom';
import { SearchOutlined,} from '@ant-design/icons';

const { Option } = Select;
const Support = ({ history }) => {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query: "(max-width:767px)"
    });
    
    return (
        <AppLayout>
            <SupportLayout>
<div>000000000</div>

            </SupportLayout>
        </AppLayout>
    );
};

Support.propTypes = {};

export default withRouter(Support);