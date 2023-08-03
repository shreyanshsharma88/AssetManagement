import { PostAdd, Token } from "@mui/icons-material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
export function TestForms() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const addAsset = (data) => {
        const requestData = {
            ...data,
            AssetType: "sim",
            purchasedDate: data.purchasedDate+"T00:00:00.000Z",
            warrantyStartDate : data.warrantyStartDate? data.warrantyStartDate  +"T00:00:00.000Z": null,
            warrantyExpiryDate : data.warrantyExpiryDate? data.warrantyExpiryDate  +"T00:00:00.000Z": null
        };
        fetch('https://devassetapi.remotestate.com/asset-management/user/asset/', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        console.log(
           )
    }
    const [client, setClient] = useState(false)
    return (

        <form onSubmit={handleSubmit(addAsset)}>
            ownedBy:
            <select {...register('ownedBy', { required: true })}>
                <option value='remote_state'>RemoteState</option>
                <option onClick={()=>setClient(true)} value='client'>Client</option>
            </select>
            {client && <input {...register('clientName', { required: true })}/>}
            brnad:
            <input {...register('brand', { required: true })} />
            simNo:
            <input {...register('simNo', { required: true })} />
            phoneNo:
            <input {...register('phoneNo', { required: true })} />
            purchaseDate:
            <input type='date' {...register('purchasedDate', { required: true })} /> 

            {errors.fieldName && <p>brand is important</p>}

            <input type='submit' />
        </form>


    )
}