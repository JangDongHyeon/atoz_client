import React, { useEffect, } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { INVOICE_GET_REQUEST } from '../../actions/types';
import InvoiceCard from '../../components/invoice/InvoiceCard';

import User from '../../components/auth/User';

const InvoiceList = props => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { loadInvoicesLoading, invoices, hasMoreInvoices } = useSelector((state) => state.invoice);


    useEffect(() => {
        dispatch({
            type: INVOICE_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [me])

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreInvoices && !loadInvoicesLoading) {

                    const lastId = invoices[invoices.length - 1]?.id;
                    dispatch({
                        type: INVOICE_GET_REQUEST,
                        data: { lastId, check: true },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreInvoices, loadInvoicesLoading, invoices]);




    return me && (
        <User>
            <AppLayout>

                {invoices.length > 0 && invoices.map((invoice, i) => <InvoiceCard key={i} invoice={invoice} />)}
            </AppLayout>
        </User>
    );
};

InvoiceList.propTypes = {

};

export default InvoiceList;