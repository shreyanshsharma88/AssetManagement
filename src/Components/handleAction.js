import React from 'react'
import { useGlobally } from './globalToken'
import Button from '@mui/material/Button';

import CancelIcon from '@mui/icons-material/Cancel';

export function HandleDelete(){
    const { selectKey, setSelectKey, token, setShowDelete , selectVal, editData} = useGlobally();
    function deleteItem() {
        try {
            fetch('https://devassetapi.remotestate.com/asset-management/user/asset/', {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "id": selectKey , "assetType":selectVal}),
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='deleteItems'>
            <div style={{display:'flex',justifyContent:'end', marginRight:'10px'}}>
                <CancelIcon onClick={
                    ()=> setShowDelete(false)
                }/>
            </div>
            <div>
                <div style={{ color: 'red', display: 'flex', textAlign: 'left', marginLeft: '50px', fontFamily: 'poppins', fontSize: '20px', padding: '10px' }}>Deletion Reason</div>
                <input type='text' />
            </div>
            <Button
                onClick={() => {
                    deleteItem()
                    setShowDelete(false);

                }}
                style={{ width: '60%', height: '50px', marginTop: "45px", marginLeft: '20%' }}
                variant="contained">confirm</Button>
        </div>
    )
}

export function HandleEdit() {
    function editItem() {

    }
    return (
        <div className='editItems'>

        </div>
    )

}
