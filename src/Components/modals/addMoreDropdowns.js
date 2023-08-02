import React, { useState } from "react";
import { useGlobally } from "../globalToken";
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



function DisplayLaptopForm({
    moreDropdowns,
    setMoreDropdowns,
    data,
    setData,
    showClient,
    setShowClient,
    handleInputChange,
    handleSubmit,
    editData
}) {
    return (
        <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
            <form>
                <div className="commonDiv">
                    <div style={{ float: "left" }}>
                        <div>Owned By</div>
                        <select  name="ownedBy" onChange={handleInputChange}>
                            <option value="" hidden>None</option>
                            <option value='remote_state' onClick={() => setShowClient(false)}>RemoteState</option>
                            <option value="client" onClick={() => setShowClient(true)}>Client</option>
                        </select>
                    </div>
                    <div>{showClient && <ClientDropdown handleInputChange={handleInputChange} />}</div>
                </div>

                <div className="commonDiv">
                    <div>
                        <div>Make</div>
                        <input
                            value={editData?editData[0].brand : ""}
                            name="brand"
                            placeholder="enter brand name"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <div>Model</div>
                        <input name="model" placeholder="enter model number" type="text" onChange={handleInputChange} />
                    </div>
                </div>

                <div className="commonDiv">
                    <div>
                        <div>Serial Number</div>
                        <input name="serialNo" onChange={handleInputChange} placeholder="enter serial number" type="text" />
                    </div>

                    <div>
                        <div>Series</div>
                        <input name="series" onChange={handleInputChange} placeholder="enter series" type="text" />
                    </div>
                </div>

                <div className="commonDiv">
                    <div>
                        <div>Warranty Start</div>
                        <input onChange={handleInputChange} name="warrantyStartDate" type="date" />
                    </div>

                    <div>
                        <div>Warranty Expiry</div>
                        <input onChange={handleInputChange} name="warrantyExpiryDate" type="date" />
                    </div>
                </div>

                <div className="commonDiv">
                    <div>
                        <div>RAM</div>
                        <input onChange={handleInputChange} name="ram" placeholder="enter RAM" type="text" />
                    </div>

                    <div>
                        <div>Processor</div>
                        <input onChange={handleInputChange} name="processor" placeholder="enter processor" type="text" />
                    </div>
                </div>
                <div className="commonDiv">
                    <div>
                        <div>Screen Resolution</div>
                        <input onChange={handleInputChange} name="screenResolution" placeholder="enter resolution" type="text" />
                    </div>

                    <div>
                        <div>Operating System</div>
                        <input onChange={handleInputChange} name="operatingSystem" placeholder="enter OS" type="text" />
                    </div>
                </div>

                <div className="commonDiv" style={{ display: "flex" }}>
                    <div>
                        <div>Date Of Purchase</div>
                        <input onChange={handleInputChange} name="purchasedDate" type="date" />
                    </div>


                    <div style={{ marginTop: "20px", marginRight: "50px" }}>
                        <div>Charger </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div>No</div>
                            <Switch name="charger" onChange={(e) => setData({ ...data, [e.target.name]: e.target.checked })} />
                            <div>Yes</div>
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
                    <Button onClick={() => {
                        handleSubmit();
                        setMoreDropdowns(false)
                    }} variant="contained">Save </Button>
                </div>
            </form>
        </div>
    );
}

function DisplayMouseForm({
    moreDropdowns,
    setMoreDropdowns,
    data,
    setData,
    showClient,
    setShowClient,
    handleInputChange,
    handleSubmit,
    editData
}) {
    return (
        <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
            <div className="commonDiv">
                <div style={{ float: "left" }}>
                    <div>Owned By</div>
                    <select name="ownedBy" onChange={handleInputChange}>
                        <option value="" hidden></option>
                        <option value="remote_state" onClick={() => setShowClient(false)}>RemoteState</option>
                        <option value="client" onClick={() => setShowClient(true)}>Client</option>
                    </select>
                </div>
                <div>{showClient && <ClientDropdown />}</div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Make</div>
                    <input onChange={handleInputChange} name="brand" placeholder="enter brand name" type="text" />
                </div>

                <div>
                    <div>Model</div>
                    <input onChange={handleInputChange} name="model" placeholder="enter model name" type="text" />
                </div>
            </div>
            <div className="commonDiv">
                <div>
                    <div>Warranty Start</div>
                    <input onChange={handleInputChange} name="warrantyStartDate" type="date" />
                </div>

                <div>
                    <div>Warranty Expiry</div>
                    <input onChange={handleInputChange} name="warrantyExpiryDate" type="date" />
                </div>
            </div>
            <div className="commonDiv" style={{ display: "flex" }}>
                <div>
                    <div>Date Of Purchase</div>
                    <input onChange={handleInputChange} name="purchasedDate" type="date" />
                </div>
                <div>
                    <div>Serial Number</div>
                    <input onChange={handleInputChange} name="serialNo" placeholder="enter serial number" type="text" />
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
                <Button onClick={() => {
                    handleSubmit()
                    setMoreDropdowns(false)
                }} variant="contained">Save </Button>
            </div>
        </div>
    );
}

function DisplayPendriveForm({
    moreDropdowns,
    setMoreDropdowns,
    data,
    setData,
    showClient,
    setShowClient,
    handleInputChange,
    handleSubmit,
    editData
}) {
    return (
        <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
            <div className="commonDiv">
                <div style={{ float: "left" }}>
                    <div>Owned By</div>
                    <select name="ownedBy" onChange={handleInputChange}>
                        <option value="" hidden></option>
                        <option value="remote_state" onClick={() => setShowClient(false)}>RemoteState</option>
                        <option value="client" onClick={() => setShowClient(true)}>Client</option>
                    </select>
                </div>
                <div>{showClient && <ClientDropdown />}</div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Make</div>
                    <input onChange={handleInputChange} name="brand" placeholder="enter brand name" type="text" />
                </div>

                <div>
                    <div>Model</div>
                    <input onChange={handleInputChange} name="model" placeholder="enter model name" type="text" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Serial Number</div>
                    <input onChange={handleInputChange} name="serialNo" placeholder="enter serial number" type="text" />
                </div>

                <div>
                    <div>Storage</div>
                    <input onChange={handleInputChange} name="storage" placeholder="enter storage" type="text" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Warranty Start</div>
                    <input onChange={handleInputChange} name="warrantyStartDate" type="date" />
                </div>

                <div>
                    <div>Warranty Expiry</div>
                    <input onChange={handleInputChange} name="warrantyExpiryDate" type="date" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Date Of Purchase</div>
                    <input onChange={handleInputChange} name="purchasedDate" type="date" />
                </div>

                <div></div>
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
                <Button onClick={() => {
                    handleSubmit()
                    setMoreDropdowns(false)
                }} variant="contained">Save </Button>
            </div>
        </div>
    );
}

function DisplayHarddiskForm({
    moreDropdowns,
    setMoreDropdowns,
    data,
    setData,
    showClient,
    setShowClient,
    handleInputChange,
    handleSubmit,
    editData
}) {
    return (
        <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
            <div className="commonDiv">
                <div style={{ float: "left" }}>
                    <div>Owned By</div>
                    <select name="ownedBy" onChange={handleInputChange}>
                        <option value="" hidden></option>
                        <option value="remote_state" onClick={() => setShowClient(false)}>RemoteState</option>
                        <option value="client" onClick={() => setShowClient(true)}>Client</option>
                    </select>
                </div>
                <div>{showClient && <ClientDropdown />}</div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Make</div>
                    <input onChange={handleInputChange} name="brand" placeholder="enter brand name" type="text" />
                </div>

                <div>
                    <div>Model</div>
                    <input onChange={handleInputChange} name="model" placeholder="enter model name" type="text" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Serial Number</div>
                    <input onChange={handleInputChange} name="model" placeholder="enter serial number" type="text" />
                </div>

                <div>
                    <div>Storage</div>
                    <input onChange={handleInputChange} name="storage" placeholder="enter storage" type="text" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Warranty Start</div>
                    <input onChange={handleInputChange} name="warrantyStartDate" type="date" />
                </div>

                <div>
                    <div>Warranty Expiry</div>
                    <input onChange={handleInputChange} name="warrantyExpiryDate" type="date" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Date Of Purchase</div>
                    <input name="purchasedDate" onChange={handleInputChange} type="date" />
                </div>

                <div></div>
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
                <Button onClick={() => {
                    handleSubmit();
                    setMoreDropdowns(false)
                }} variant="contained">Save </Button>
            </div>
        </div>
    );
}

function DisplayMobileForm({
    moreDropdowns,
    setMoreDropdowns,
    data,
    setData,
    showClient,
    setShowClient,
    handleInputChange,
    handleSubmit,
    editData
}) {
    return (
        <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
            <div className="commonDiv">
                <div style={{ float: "left" }}>
                    <div>Owned By</div>
                    <select name="ownedBy" onChange={handleInputChange}>
                        <option value="" hidden></option>
                        <option value="remote_state" onClick={() => setShowClient(false)}>RemoteState</option>
                        <option value="client" onClick={() => setShowClient(true)}>Client</option>
                    </select>
                </div>
                <div>{showClient && <ClientDropdown />}</div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Make</div>
                    <input onChange={handleInputChange}name="brand" placeholder="Enter brand name" type="text" />
                </div>

                <div>
                    <div>Model</div>
                    <input onChange={handleInputChange}name="model" placeholder="Enter model name" type="text" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>RAM</div>
                    <input onChange={handleInputChange}name="model" placeholder="Enter RAM" type="text" />
                </div>

                <div>
                    <div>OS type</div>
                    <select name="osType" style={{ width: "200px" }} onChange={handleInputChange}>
                        <option value="" hidden></option>

                        <option value="android">Android</option>
                        <option value="ios">iOS</option>
                    </select>
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>IMEI Number 1</div>
                    <input onChange={handleInputChange}name="imeiNumber1"placeholder="Enter IMEI number 1" type="text" />
                </div>

                <div>
                    <div>IMEI Number 2</div>
                    <input onChange={handleInputChange}name="imeiNumber2"placeholder="Enter IMEI number 2" type="text" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Date of Purchase</div>
                    <input onChange={handleInputChange}name="purchasedDate"type="date" />
                </div>

                <div>
                    <div>Serial Number</div>
                    <input onChange={handleInputChange}name="serialNo"placeholder="Enter serial number" type="text" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Warranty Start</div>
                    <input onChange={handleInputChange}name="warrantyStartDate"type="date" />
                </div>

                <div>
                    <div>Warranty Expiry</div>
                    <input onChange={handleInputChange}name="warrantyExpiryDate"type="date" />
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
                <Button onClick={() => {
                    handleSubmit();
                    setMoreDropdowns(false)
                }} variant="contained">Save </Button>
            </div>
        </div>
    );
}

function DisplaySIMForm({
    moreDropdowns,
    setMoreDropdowns,
    data,
    setData,
    showClient,
    setShowClient,
    handleInputChange,
    handleSubmit,
    editData

}) {
    return (
        <div style={{ float: "left", maxHeight: "600px", overflow: "scroll" }}>
            <div className="commonDiv">
                <div style={{ float: "left" }}>
                    <div>Owned By</div>
                    <select name="ownedBy" onChange={handleInputChange}>
                        <option value="" hidden></option>
                        <option value="remote_state" onClick={() => setShowClient(false)}>RemoteState</option>
                        <option value="client" onClick={() => setShowClient(true)}>Client</option>
                    </select>
                </div>
                <div>{showClient && <ClientDropdown />}</div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Make</div>
                    <input onChange={handleInputChange}name="brand"placeholder="Enter brand name" type="text" />
                </div>

                <div>
                    <div>SIM Card Number</div>
                    <input onChange={handleInputChange}name="simNo"placeholder="Enter SIM number" type="text" />
                </div>
            </div>

            <div className="commonDiv">
                <div>
                    <div>Mobile Number Number</div>
                    <input onChange={handleInputChange}name="phoneNo"placeholder="Enter mobile number" type="text" />
                </div>

                <div>
                    <div>Date Of Purchase</div>
                    <input onChange={handleInputChange}name="purchasedDate"type="date" />
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
                <Button onClick={() => {
                    handleSubmit();
                    setMoreDropdowns(false)
                }}variant="contained">Save </Button>
            </div>
        </div>
    );
}

export function DisplayForm() {
    const { selectVal, setSelectVal, moreDropdowns, setMoreDropdowns, token , editData} =
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

    const handleSubmit = () => {
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

    if (selectVal === "laptop") {
        return (
            <DisplayLaptopForm
                moreDropdowns={moreDropdowns}
                setMoreDropdowns={setMoreDropdowns}
                data={data}
                setData={setData}
                showClient={showClient}
                setShowClient={setShowClient}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                editData={editData}
            />
        );
    }

    if (selectVal === "mouse") {
        return (
            <DisplayMouseForm
                moreDropdowns={moreDropdowns}
                setMoreDropdowns={setMoreDropdowns}
                showClient={showClient}
                setShowClient={setShowClient}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                editData={editData}
            />
        );
    }

    if (selectVal === "pen drive") {
        return (
            <DisplayPendriveForm
                moreDropdowns={moreDropdowns}
                setMoreDropdowns={setMoreDropdowns}
                showClient={showClient}
                setShowClient={setShowClient}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                editData={editData}

            />
        );
    }

    if (selectVal === "hard disk") {
        return (
            <DisplayHarddiskForm
                moreDropdowns={moreDropdowns}
                setMoreDropdowns={setMoreDropdowns}
                showClient={showClient}
                setShowClient={setShowClient}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                editData={editData}

            />
        );
    }
    if (selectVal === "mobile") {
        return (
            <DisplayMobileForm
                moreDropdowns={moreDropdowns}
                setMoreDropdowns={setMoreDropdowns}
                showClient={showClient}
                setShowClient={setShowClient}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                editData={editData}

            />
        );
    }
    if (selectVal === "sim") {
        return (
            <DisplaySIMForm
                moreDropdowns={moreDropdowns}
                setMoreDropdowns={setMoreDropdowns}
                showClient={showClient}
                setShowClient={setShowClient}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                editData={editData}

            />
        );
    }
}


