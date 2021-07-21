import React, { useEffect, } from 'react';

import AppLayout from '../../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { INVOICE_ADMIN_GET_REQUEST } from '../../actions/types';
import InvoiceCard from '../../components/invoice/InvoiceCard';

import Admin from '../../components/auth/Admin';

const AdminInvoice = props => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { loadAdminInvoicesLoading, invoices, hasMoreInvoices } = useSelector((state) => state.invoice);


    useEffect(() => {
        dispatch({
            type: INVOICE_ADMIN_GET_REQUEST,
            data: { check: false, lastId: 0 }
        })
    }, [me])

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {

                if (hasMoreInvoices && !loadAdminInvoicesLoading) {

                    const lastId = invoices[invoices.length - 1]?.id;
                    dispatch({
                        type: INVOICE_ADMIN_GET_REQUEST,
                        data: { lastId, check: true },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreInvoices, loadAdminInvoicesLoading, invoices]);




    return me && (
        <Admin>
            <AppLayout>

                {invoices.length > 0 && invoices.map((invoice, i) => <InvoiceCard key={i} invoice={invoice} />)}
            </AppLayout>
        </Admin>
    );
};

AdminInvoice.propTypes = {

};

export default AdminInvoice;