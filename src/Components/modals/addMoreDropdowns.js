import React, { useEffect, useState } from "react";
import { useGlobally } from "../globalToken";
import { useForm } from "react-hook-form";
import Switch from "@mui/material/Switch";
import "./modal.css";
import Button from "@mui/material/Button";
function ClientDropdown({ handleInputChange }) {
    return (
        <div>
            <div>Client Name</div>
            <input name="clientName" onChange={handleInputChange} placeholder="enter client name" type="text" />
        </div>
    );
}


export function DisplayForm() {
    const { selectVal, setSelectVal, moreDropdowns, setMoreDropdowns, token, editData, selectKey } =
        useGlobally();
    const [showClient, setShowClient] = useState(false);
    const [data, setData] = useState({ AssetType: selectVal });
    //console.log(data);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (e.target.type === 'date') {
            const dateValue = value + 'T00:00:00.000Z';
            setData({ ...data, [name]: dateValue });
        } else {
            setData({ ...data, [name]: value });
        }
    };
    // const val = {       "AssetType": "laptop", "brand": "44", "model": "4", "serialNo": "4", "series": "4", "processor": "4", "warrantyStartDate": "2023-07-05T18:30:00.000Z", "warrantyExpiryDate": "2023-07-17T18:30:00.000Z", "purchasedDate": "2023-07-27T18:30:00.000Z", "ram": "4", "operatingSystem": "4", "screenResolution": "4", "charger": true, "ownedBy": "remote_state" }
    // const hardCoded = { "AssetType": "laptop", "brand": "HPPCPP", "model": "zSer", "serialNo": "123", "series": "321", "processor": "2", "storage": "", "warrantyStartDate": "2023-07-05T18:30:00.000Z", "warrantyExpiryDate": "2023-07-17T18:30:00.000Z", "purchasedDate": "2023-07-27T18:30:00.000Z", "ram": "2", "operatingSystem": "2", "screenResolution": "2", "charger": true, "ownedBy": "client", "clientName": "john Doe" }

    const handleSubmitAddAsset = () => {
        fetch('https://devassetapi.remotestate.com/asset-management/user/asset/', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('API response:', data);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };







    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleUpdate = (data) => {
        const reqData = {
            ...data,
            id: selectKey
        };

        fetch('https://devassetapi.remotestate.com/asset-management/user/asset/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(reqData),
        })
        // setData({})
        // setSelectVal("None")

        console.log("this is edit mode")
    }


    const addAsset = (data) => {
        const requestData = {
            ...data,
            AssetType: selectVal,
            purchasedDate: data.purchasedDate + "T00:00:00.000Z",
            warrantyStartDate: data.warrantyStartDate ? data.warrantyStartDate + "T00:00:00.000Z" : null,
            warrantyExpiryDate: data.warrantyExpiryDate ? data.warrantyExpiryDate + "T00:00:00.000Z" : null
        };
        if (editData) {



            fetch('https://devassetapi.remotestate.com/asset-management/user/asset/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({ ...requestData, "id": selectKey }),
            })
            // setData({})
            // setSelectVal("None")

            console.log("this is edit mode")

        }
        else {

            fetch('https://devassetapi.remotestate.com/asset-management/user/asset/', {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })

            console.log("this is add mode")

        }
        // event.preventDefault()
    }




    const [client, setClient] = useState(false)

    const { setShowAddAsset } = useGlobally()


    useEffect(() => {
        fetch('https://devassetapi.remotestate.com/asset-management/user/asset/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        }

        )
    }, [data])





















    if (selectVal === "laptop") {
        return (
            <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
                <form onSubmit={handleSubmit(addAsset)}>

                    <div className="commonDiv">
                        <div style={{ float: "left" }}>
                            <div>Owned By</div>
                            <select defaultValue={editData ? editData[0].ownedBy : ''} {...register('ownedBy', { required: true })}>
                                <option value='' hidden></option>
                                <option onClick={() => setClient(false)} value='remote_state'>RemoteState</option>
                                <option onClick={() => setClient(true)} value='client'>Client</option>
                            </select>
                            {errors.ownedBy && <p style={{ color: 'red' }}>owned by is important</p>}
                        </div>
                        {client && <input defaultValue={editData ? editData[0].clientName : ''} style={{ height: '20px', marginTop: '15px', width: '50%', marginLeft: '20px' }} {...register('clientName', { required: true })} />}

                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Make</div>
                            <input defaultValue={editData ? editData[0].brand : ''} {...register('brand', { required: true })} placeholder="enter brand" />
                            {errors.brand && <p style={{ color: 'red' }}>brand is important</p>}
                        </div>

                        <div>
                            <div>Model</div>
                            <input defaultValue={editData ? editData[0].model : ''} {...register('model', { required: true })} placeholder="enter model" />
                            {errors.model && <p style={{ color: 'red' }}>model is important</p>}
                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Serial Number</div>
                            <input
                                defaultValue={editData ? editData[0].serialNo : ''}
                                {...register('serialNo', { required: true })}
                                placeholder="enter serial number" type="text" />
                            {errors.serialNo && <p style={{ color: 'red' }}>serial Number is important</p>}
                        </div>

                        <div>
                            <div>Series</div>
                            <input
                                defaultValue={editData ? editData[0].series : ''}
                                {...register('series', { required: true })} placeholder="enter series" type="text" />
                            {errors.series && <p style={{ color: 'red' }}>series is important</p>}
                        </div>
                    </div>


                    <div className="commonDiv">
                        <div>
                            <div>Warranty Start</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyStartDate : ''}
                                {...register('warrantyStartDate', { required: true })} type="date" />
                            {errors.warrantyStartDate && <p style={{ color: 'red' }}>warranty start is important</p>}
                        </div>

                        <div>
                            <div>Warranty Expiry</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyExpiryDate : ''}
                                {...register('warrantyExpiryDate', { required: true })} type="date" />
                            {errors.warrantyExpiryDate && <p style={{ color: 'red' }}>warranty expiry is important</p>}
                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>RAM</div>
                            <input
                                defaultValue={editData ? editData[0].ram : ''}
                                {...register('ram', { required: true })} placeholder="enter RAM" type="text" />
                            {errors.ram && <p style={{ color: 'red' }}>ram is important</p>}
                        </div>

                        <div>
                            <div>Processor</div>
                            <input
                                defaultValue={editData ? editData[0].processor : ''}
                                {...register('processor', { required: true })} placeholder="enter processor" type="text" />
                            {errors.processor && <p style={{ color: 'red' }}>processor is important</p>}
                        </div>
                    </div>
                    <div className="commonDiv">
                        <div>
                            <div>Screen Resolution</div>
                            <input
                                defaultValue={editData ? editData[0].screenResolution : ''}
                                {...register('screenResolution', { required: true })} placeholder="enter resolution" type="text" />
                            {errors.screenResolution && <p style={{ color: 'red' }}>screen res is important</p>}
                        </div>

                        <div>
                            <div>Operating System</div>
                            <input
                                defaultValue={editData ? editData[0].operatingSystem : ''}
                                {...register('operatingSystem', { required: true })} placeholder="enter OS" type="text" />
                            {errors.operatingSystem && <p style={{ color: 'red' }}>OS is important</p>}
                        </div>
                    </div>

                    <div className="commonDiv" style={{ display: "flex" }}>
                        <div>
                            <div>Date Of Purchase</div>
                            <input
                                defaultValue={editData ? editData[0].purchasedDate : ''}
                                {...register('purchasedDate', { required: true })} type="date" />
                            {errors.purchasedDate && <p style={{ color: 'red' }}>purchase date is important</p>}
                        </div>


                        <div style={{ marginTop: "20px", marginRight: "50px" }}>
                            <div>Charger </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div>No</div>
                                <Switch
                                    {...register('charger')}
                                //  onChange={(e) => setData({ ...data, [e.target.name]: e.target.checked })} 
                                />
                                <div>Yes</div>
                                {/* {errors.charger && <p style={{ color: 'red' }}>charger is important</p>} */}
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "20px",
                        }}
                    >
                        <Button
                            onClick={() => {
                                setMoreDropdowns(moreDropdowns ? false : true);
                            }}
                            variant="contained"
                        >
                            Cancel{" "}
                        </Button>

                        <Button
                            type='submit'
                            // onClick={() => setMoreDropdowns(false)}
                            // onClick={editData? handleUpdate() : handleSubmit(addAsset)}
                            variant="contained"> {editData ? "Edit" : "Save"} </Button>
                    </div>
                </form>
            </div>
        );
    }

    if (selectVal === "mouse") {
        return (
            <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
                <form onSubmit={handleSubmit(addAsset)}>

                    <div className="commonDiv">
                        <div style={{ float: "left" }}>
                            <div>Owned By</div>
                            <select defaultValue={editData ? editData[0].ownedBy : ''} {...register('ownedBy', { required: true })}>
                                <option value='' hidden></option>
                                <option onClick={() => setClient(false)} value='remote_state'>RemoteState</option>
                                <option onClick={() => setClient(true)} value='client'>Client</option>
                            </select>
                            {errors.ownedBy && <p style={{ color: 'red' }}>owned by is important</p>}

                        </div>
                        <div>                        {client && <input defaultValue={editData ? editData[0].clientName : ''} style={{ height: '20px', marginTop: '15px', width: '50%', marginLeft: '20px' }} {...register('clientName', { required: true })} />}
                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Make</div>

                            <input defaultValue={editData ? editData[0].brand : ''} {...register('brand', { required: true })} />
                            {errors.brand && <p style={{ color: 'red' }}>brand is important</p>}                        </div>

                        <div>
                            <div>Model</div>

                            <input defaultValue={editData ? editData[0].model : ''} {...register('model', { required: true })} />
                            {errors.model && <p style={{ color: 'red' }}>model is important</p>}                        </div>
                    </div>
                    <div className="commonDiv">
                        <div>
                            <div>Warranty Start</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyStartDate : ''}
                                {...register('warrantyStartDate', { required: true })} type="date" />
                            {errors.warrantyStartDate && <p style={{ color: 'red' }}>warranty start is important</p>}
                        </div>

                        <div>
                            <div>Warranty Expiry</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyExpiryDate : ''}
                                {...register('warrantyExpiryDate', { required: true })} type="date" />
                            {errors.warrantyExpiryDate && <p style={{ color: 'red' }}>warranty expiry is important</p>}
                        </div>
                    </div>
                    <div className="commonDiv" style={{ display: "flex" }}>
                        <div>
                            <div>Date Of Purchase</div>
                            <input
                                defaultValue={editData ? editData[0].purchasedDate : ''}
                                {...register('purchasedDate', { required: true })} type="date" />
                            {errors.purchasedDate && <p style={{ color: 'red' }}>purchase date is important</p>}                        </div>
                        <div>
                            <div>Serial Number</div>
                            <input defaultValue={editData ? editData[0].serialNo : ''}{...register('serialNo', { required: true })} />
                            {errors.serialNo && <p style={{ color: 'red' }}>serial number is important</p>}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "20px",
                        }}
                    >
                        <Button
                            onClick={() => {
                                setMoreDropdowns(moreDropdowns ? false : true);
                            }}
                            variant="contained"
                        >
                            Cancel{" "}
                        </Button>

                        <Button
                            type='submit'
                            // onClick={() => setMoreDropdowns(false)}
                            // onClick={editData? handleUpdate() : handleSubmit(addAsset)}
                            variant="contained"> {editData ? "Edit" : "Save"} </Button>
                    </div>
                </form>
            </div>
        );
    }

    if (selectVal === "pen drive") {
        return (
            <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
                <form onSubmit={handleSubmit(addAsset)}>

                    <div className="commonDiv">
                        <div style={{ float: "left" }}>
                            <div>Owned By</div>
                            <select defaultValue={editData ? editData[0].ownedBy : ''} {...register('ownedBy', { required: true })}>
                                <option value='' hidden></option>
                                <option onClick={() => setClient(false)} value='remote_state'>RemoteState</option>
                                <option onClick={() => setClient(true)} value='client'>Client</option>
                            </select>
                            {errors.ownedBy && <p style={{ color: 'red' }}>owned by is important</p>}
                        </div>
                        <div>

                        </div>
                        {client && <input defaultValue={editData ? editData[0].clientName : ''} style={{ height: '20px', marginTop: '15px', width: '50%', marginLeft: '20px' }} {...register('clientName', { required: true })} />}

                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Make</div>
                            <input defaultValue={editData ? editData[0].brand : ''} {...register('brand', { required: true })} placeholder="enter brand" />
                            {errors.brand && <p style={{ color: 'red' }}>brand is important</p>}
                        </div>

                        <div>
                            <div>Model</div>
                            <input defaultValue={editData ? editData[0].model : ''} {...register('model', { required: true })} placeholder="enter model" />
                            {errors.model && <p style={{ color: 'red' }}>model is important</p>}
                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Serial Number</div>
                            <input defaultValue={editData ? editData[0].serialNo : ''} {...register('serialNo', { required: true })} placeholder="enter serial num" />
                            {errors.serialNo && <p style={{ color: 'red' }}>serialnumber is important</p>}                        </div>

                        <div>
                            <div>Storage</div>
                            <input defaultValue={editData ? editData[0].storage : ''} {...register('storage', { required: true })} placeholder="enter storage" />
                            {errors.storage && <p style={{ color: 'red' }}>storage is important</p>}                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Warranty Start</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyStartDate : ''}
                                {...register('warrantyStartDate', { required: true })} type="date" />
                            {errors.warrantyStartDate && <p style={{ color: 'red' }}>warranty start is important</p>}
                        </div>

                        <div>
                            <div>Warranty Expiry</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyExpiryDate : ''}
                                {...register('warrantyExpiryDate', { required: true })} type="date" />
                            {errors.warrantyExpiryDate && <p style={{ color: 'red' }}>warranty expiry is important</p>}
                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Date Of Purchase</div>
                            <input
                                defaultValue={editData ? editData[0].purchasedDate : ''}
                                {...register('purchasedDate', { required: true })} type="date" />
                            {errors.purchasedDate && <p style={{ color: 'red' }}>purchase date is important</p>}                        </div>


                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "20px",
                        }}
                    >
                        <Button
                            onClick={() => {
                                setMoreDropdowns(moreDropdowns ? false : true);
                            }}
                            variant="contained"
                        >
                            Cancel{" "}
                        </Button>

                        <Button
                            type='submit'
                            // onClick={() => setMoreDropdowns(false)}
                            // onClick={editData? handleUpdate() : handleSubmit(addAsset)}
                            variant="contained"> {editData ? "Edit" : "Save"} </Button>
                    </div>
                </form>
            </div>
        );
    }

    if (selectVal === "hard disk") {
        return (
            <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
                <form onSubmit={handleSubmit(addAsset)}>

                    <div className="commonDiv">
                        <div style={{ float: "left" }}>
                            <div>Owned By</div>
                            <select defaultValue={editData ? editData[0].ownedBy : ''} {...register('ownedBy', { required: true })}>
                                <option value='' hidden></option>
                                <option onClick={() => setClient(false)} value='remote_state'>RemoteState</option>
                                <option onClick={() => setClient(true)} value='client'>Client</option>
                            </select>
                            {errors.ownedBy && <p style={{ color: 'red' }}>owned by is important</p>}
                        </div>
                        <div>

                        </div>
                        {client && <input defaultValue={editData ? editData[0].clientName : ''} style={{ height: '20px', marginTop: '15px', width: '50%', marginLeft: '20px' }} {...register('clientName', { required: true })} />}

                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Make</div>
                            <input defaultValue={editData ? editData[0].brand : ''} {...register('brand', { required: true })} placeholder="enter brand" />
                            {errors.brand && <p style={{ color: 'red' }}>brand is important</p>}
                        </div>

                        <div>
                            <div>Model</div>
                            <input defaultValue={editData ? editData[0].model : ''} {...register('model', { required: true })} placeholder="enter model" />
                            {errors.model && <p style={{ color: 'red' }}>model is important</p>}
                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Serial Number</div>
                            <input defaultValue={editData ? editData[0].serialNo : ''} {...register('serialNo', { required: true })} placeholder="enter serial num" />
                            {errors.serialNo && <p style={{ color: 'red' }}>serialnumber is important</p>}                        </div>

                        <div>
                            <div>Storage</div>
                            <input defaultValue={editData ? editData[0].storage : ''} {...register('storage', { required: true })} placeholder="enter storage" />
                            {errors.storage && <p style={{ color: 'red' }}>storage is important</p>}                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Warranty Start</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyStartDate : ''}
                                {...register('warrantyStartDate', { required: true })} type="date" />
                            {errors.warrantyStartDate && <p style={{ color: 'red' }}>warranty start is important</p>}
                        </div>

                        <div>
                            <div>Warranty Expiry</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyExpiryDate : ''}
                                {...register('warrantyExpiryDate', { required: true })} type="date" />
                            {errors.warrantyExpiryDate && <p style={{ color: 'red' }}>warranty expiry is important</p>}
                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Date Of Purchase</div>
                            <input
                                defaultValue={editData ? editData[0].purchasedDate : ''}
                                {...register('purchasedDate', { required: true })} type="date" />
                            {errors.purchasedDate && <p style={{ color: 'red' }}>purchase date is important</p>}                        </div>


                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "20px",
                        }}
                    >
                        <Button
                            onClick={() => {
                                setMoreDropdowns(moreDropdowns ? false : true);
                            }}
                            variant="contained"
                        >
                            Cancel{" "}
                        </Button>

                        <Button
                            type='submit'
                            // onClick={() => setMoreDropdowns(false)}
                            // onClick={editData? handleUpdate() : handleSubmit(addAsset)}
                            variant="contained"> {editData ? "Edit" : "Save"} </Button>
                    </div>
                </form>
            </div>
        );
    }
    if (selectVal === "mobile") {
        return (
            <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
                <form onSubmit={handleSubmit(addAsset)}>
                    <div className="commonDiv">
                        <div style={{ float: "left" }}>
                            <div>Owned By</div>
                            <select defaultValue={editData ? editData[0].ownedBy : ''} {...register('ownedBy', { required: true })}>
                                <option value='' hidden></option>
                                <option onClick={() => setClient(false)} value='remote_state'>RemoteState</option>
                                <option onClick={() => setClient(true)} value='client'>Client</option>
                            </select>
                            {errors.ownedBy && <p style={{ color: 'red' }}>owned by is important</p>}
                        </div>
                        <div>

                        </div>
                        {client && <input defaultValue={editData ? editData[0].clientName : ''} style={{ height: '20px', marginTop: '15px', width: '50%', marginLeft: '20px' }} {...register('clientName', { required: true })} />}

                    </div>
                    <div className="commonDiv">
                        <div>
                            <div>Make</div>
                            <input defaultValue={editData ? editData[0].brand : ''} {...register('brand', { required: true })} placeholder="enter brand" />
                            {errors.brand && <p style={{ color: 'red' }}>brand is important</p>}
                        </div>

                        <div>
                            <div>Model</div>
                            <input defaultValue={editData ? editData[0].model : ''} {...register('model', { required: true })} placeholder="enter model" />
                            {errors.model && <p style={{ color: 'red' }}>model is important</p>}
                        </div>
                    </div>


                    <div className="commonDiv">
                        <div>
                            <div>RAM</div>
                            <input defaultValue={editData ? editData[0].ram : ''} {...register('ram', { required: true })} placeholder="enter ram" />
                            {errors.ram && <p style={{ color: 'red' }}>ram is important</p>}                        </div>

                        <div>
                            <div>OS type</div>
                            <select defaultValue={editData ? editData[0].osType : ''} {...register('osType', { required: true })} style={{ width: "200px" }}>
                                <option value="" hidden></option>

                                <option value="android">Android</option>
                                <option value="ios">iOS</option>
                            </select>
                            {errors.osType && <p style={{ color: 'red' }}>os type by is important</p>}

                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>IMEI Number 1</div>
                            <input defaultValue={editData ? editData[0].imeiNumber1 : ''} {...register('imeiNumber1', { required: true })} placeholder="enter imei number1" />
                            {errors.imeiNumber1 && <p style={{ color: 'red' }}>imei num 1 is important</p>}
                        </div>

                        <div>
                            <div>IMEI Number 2</div>
                            <input defaultValue={editData ? editData[0].imeiNumber2 : ''} {...register('imeiNumber2', { required: true })} placeholder="enter imei number2" />
                            {errors.imeiNumber2 && <p style={{ color: 'red' }}>imei num 2 is important</p>}                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Date of Purchase</div>
                            <input
                                defaultValue={editData ? editData[0].purchasedDate : ''}
                                {...register('purchasedDate', { required: true })} type="date" />
                            {errors.purchasedDate && <p style={{ color: 'red' }}>purchase date is important</p>}                                                </div>

                        <div>
                            <div>Serial Number</div>
                            <input defaultValue={editData ? editData[0].serialNo : ''} {...register('serialNo', { required: true })} placeholder="enter serial num" />
                            {errors.serialNo && <p style={{ color: 'red' }}>serialnumber is important</p>}                                                </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Warranty Start</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyStartDate : ''}
                                {...register('warrantyStartDate', { required: true })} type="date" />
                            {errors.warrantyStartDate && <p style={{ color: 'red' }}>warranty start is important</p>}
                        </div>

                        <div>
                            <div>Warranty Expiry</div>
                            <input
                                defaultValue={editData ? editData[0].warrantyExpiryDate : ''}
                                {...register('warrantyExpiryDate', { required: true })} type="date" />
                            {errors.warrantyExpiryDate && <p style={{ color: 'red' }}>warranty expiry is important</p>}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "20px",
                        }}
                    >
                        <Button
                            onClick={() => {
                                setMoreDropdowns(moreDropdowns ? false : true);
                            }}
                            variant="contained"
                        >
                            Cancel{" "}
                        </Button>

                        <Button
                            type='submit'
                            // onClick={() => setMoreDropdowns(false)}
                            // onClick={editData? handleUpdate() : handleSubmit(addAsset)}
                            variant="contained"> {editData ? "Edit" : "Save"} </Button>
                    </div>
                </form>
            </div>
        );
    }
    if (selectVal === "sim") {

        return (

            <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>

                <form onSubmit={handleSubmit(addAsset)}>

                    <div className="commonDiv">
                        <div style={{ float: "left" }}>
                            <div>Owned By</div>
                            <select defaultValue={editData ? editData[0].ownedBy : ''} {...register('ownedBy', { required: true })}>
                                <option value='' hidden></option>
                                <option onClick={() => setClient(false)} value='remote_state'>RemoteState</option>
                                <option onClick={() => setClient(true)} value='client'>Client</option>
                            </select>
                            {errors.ownedBy && <p style={{ color: 'red' }}>owned by is important</p>}
                        </div>
                        <div>

                        </div>
                        {client && <input defaultValue={editData ? editData[0].clientName : ''} style={{ height: '20px', marginTop: '15px', width: '50%', marginLeft: '20px' }} {...register('clientName', { required: true })} />}

                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Make</div>
                            <input defaultValue={editData ? editData[0].brand : ''} {...register('brand', { required: true })} />
                            {errors.brand && <p style={{ color: 'red' }}>brand is important</p>}
                        </div>

                        <div>
                            <div>SIM Card Number</div>
                            <input defaultValue={editData ? editData[0].simNo : ''}{...register('simNo', { required: true })} />
                            {errors.simNo && <p style={{ color: 'red' }}>sim number is important</p>}

                        </div>
                    </div>

                    <div className="commonDiv">
                        <div>
                            <div>Mobile Number</div>
                            <input defaultValue={editData ? editData[0].phoneNo : ''}{...register('phoneNo', { required: true })} />
                            {errors.phoneNo && <p style={{ color: 'red' }}>phone number is important</p>}

                        </div>

                        <div>
                            <div>Date Of Purchase</div>
                            <input defaultValue={editData ? editData[0].purchasedDate : ''} type='date' {...register('purchasedDate', { required: true })} />
                            {errors.purchasedDate && <p style={{ color: 'red' }}>purchased date is important</p>}

                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "20px",
                        }}
                    >

                        <Button
                            onClick={() => {
                                setMoreDropdowns(moreDropdowns ? false : true);
                            }}
                            variant="contained"
                        >
                            Cancel{" "}
                        </Button>

                        <Button
                            type='submit'
                            // onClick={() => setMoreDropdowns(false)}
                            // onClick={editData? handleUpdate() : handleSubmit(addAsset)}
                            variant="contained"> {editData ? "Edit" : "Save"} </Button>
                    </div>
                </form>
            </div>
        );
    }
}


