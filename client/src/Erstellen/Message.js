import { useState, forwardRef } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Message(props) {

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpen(false)
    }

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={2000}
            onClose={handleClose}
            sx={{ marginBottom: 7}}
        >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Toll gemacht!
            </Alert>
        </Snackbar>
    )
}