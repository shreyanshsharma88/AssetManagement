import { useRef, useState } from "react";
import { useGlobally } from "./globalToken";
import { Nav } from "./navBar";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DisplayForm } from "./modals/addMoreDropdowns";
import ToggleButton from '@mui/material/ToggleButton';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { HandleDelete } from "./handleAction";




function ActionBox() {

    const { showDelelte, setShowDelete, setAction, setShowAddAsset, setMoreDropdowns, token, editData, setEditData, selectKey, selectVal } = useGlobally();

    async function fetchData() {
        try {
            var params = {
                assetId: selectKey,
                assetType: selectVal
            }
            const res = await fetch(`https://devassetapi.remotestate.com/asset-management/user/asset/specifications?${new URLSearchParams(params).toString()}`,

                {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (!res.ok) {
                throw new Error('not available');
            }
            const dataFromJSON = await res.json();
            setEditData(dataFromJSON)
            
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="actionBox">
            <div
                onClick={
                    () => {
                        fetchData();
                        setShowAddAsset(true);
                        setMoreDropdowns(true)
                    }
                }
                className="edit-delete" style={{ display: 'flex', color: 'green', fontWeight: '400' }}>
                <CreateIcon fontSize="small" />
                Edit
            </div>


            <div onClick={() => {
                if (showDelelte) {
                    setShowDelete(false)
                }
                else {
                    setShowDelete(true)
                }
                setAction(false)
            }} className="edit-delete" style={{ display: 'flex', color: 'red', fontWeight: '400' }}>
                <DeleteIcon

                    fontSize="small" />
                Delete
            </div>

        </div>
    )
}

export function AddAssetOption({ setShowAddAsset, moreDropdowns, setMoreDropdowns, selectVal, setSelectVal }) {
    function MoreDropdowns() {
        return (
            <DisplayForm />
        )
    }
    const { setAction } = useGlobally()
    const { showDelelte } = useGlobally()
    console.log(showDelelte)
    return (
        <div className="addAssetBox">

            <div >

                <h1 style={{ color: '#6200EE', fontFamily: 'poppins', float: 'left', padding: '10px', marginLeft: '20px' }}>Add Asset</h1>
                <CancelIcon style={{ float: 'right', padding: '12px' }} onClick={() => {
                    setShowAddAsset(false)
                    setMoreDropdowns(false)
                    setAction(false)
                }} />
            </div>
            <div style={{ display: 'grid' }}>
                <div>Assign Asset</div>
                <select
                    value={selectVal}
                    onChange={(e) => {
                        setSelectVal(e.target.value)
                        setMoreDropdowns(true)
                    }} className="addAssetDropdown">

                    <option value="">None</option>
                    <option value="laptop">Laptop</option>
                    <option value="mouse">Mouse</option>
                    <option value="pen drive">Pen Drive</option>
                    <option value="hard disk">Hard Drive</option>
                    <option value="mobile">Mobile</option>
                    <option value="sim">SIM Card</option>
                </select>
                {moreDropdowns && <MoreDropdowns />}
            </div>

        </div>

    )
}


function DisplayAssets({ assetsData, setAssetsData, action, setAction, selectKey, setSelectKey }) {

    const { setShowDelete, setSelectVal } = useGlobally();

    return (
        <div style={{}} >
            <table className="tableBody">
                <thead className="assetHeader">
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Serial Number</th>
                        <th>Asset Type</th>
                        <th>Date Purchased</th>
                        <th>Warranty Date</th>
                        <th>Warranty Expires</th>
                        <th>Assigned To</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {assetsData.map((item) => {
                        return (<>
                            <tr key={item.id} >

                                <td style={{color:'blue', textDecoration:'underline'}}>{item.brand}</td>

                                <td>{item.model}</td>

                                <td>{item.serialNo}</td>

                                <td style={{backgroundColor:'#EBF0FA', color:'blue'}}>{item.AssetType}</td>

                                <td>{item.purchasedDate}</td>

                                <td>{item.warrantyStartDate}</td>

                                <td>{item.warrantyExpiryDate}</td>

                                <td>{item.assignedTo}</td>



                                <td style={{ display: 'flex' }}>


                                    {action && selectKey === item.id && <ActionBox />}

                                    <ToggleButton
                                        sx={{ width: '50px', height: '50px', zIndex: '1' }}
                                        onClick={() => {

                                            console.log(item.id)
                                            if (action) {
                                                if (selectKey == item.id) {

                                                    setAction(false)
                                                    setShowDelete(false)
                                                }
                                            }
                                            else {
                                                setAction(true)
                                                setShowDelete(false)
                                            }


                                            setSelectVal(item.AssetType)
                                            setShowDelete(false)
                                            setSelectKey(item.id)
                                        }} value="web">...</ToggleButton>
                                </td>

                            </tr>
                            <div style={{height:'20px'}}></div>

                        </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

function MakeAssetTable({ searchInput, setSearchInput, assetsData, setAssetsData, setShowAddAsset, showAddAsset, setMoreDropdowns, action, setAction, selectKey, setSelectKey }) {
    console.log(selectKey)
    const{setEditData, setSelectVal} = useGlobally()
    return (
        <div className="assetList">

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '20px', marginLeft: '30px' }}>
                <div style={{ borderBottom: '1px solid rgb(15, 15, 15)', height: '55px', display: 'flex', alignItems: 'center' }}>
                    <SearchIcon fontSize="large" />

                    <input

                        style={{ fontSize: '20px' }}
                        placeholder="Search"
                        className="searchBox"
                        val={searchInput}
                        type='text'
                        onChange={(e) => {
                            setSearchInput(e.target.value);

                        }}
                    />
                    <CancelIcon />
                </div>
                <div style={{ width: '300px' }}></div>
                <div style={{ display: 'flex', gap: '35px', marginRight: '30px' }}>
                    <div style={{ marginTop: '10px', marginRight: '15px', display: 'flex' }} >
                        <input type='checkbox' />
                        <p style={{ fontSize: '20px', fontWeight: '300' }}>
                            Available
                        </p>
                    </div>
                    <fieldset>
                        <legend >Asset Type</legend>

                        <select className="dropdowns">

                            <option hidden value="">All</option>
                            <option value="">Laptop</option>
                            <option value="">Mouse</option>
                            <option value="">Pen Drive</option>
                            <option value="">Hard Drive</option>
                            <option value="">Mobile</option>
                            <option value="">SIM Card</option>

                        </select>
                    </fieldset>

                    <fieldset>
                        <legend>Warranty</legend>
                        <select className="dropdowns">

                            <option value="">None</option>
                            <option value="">Expires in 1 months</option>
                            <option value="">Expires in 3 months</option>
                            <option value="">Expires in 6 months</option>
                            <option value="">Expired</option>

                        </select>
                    </fieldset>

                    <div onClick={() => {
                        setEditData()
                        setSelectVal('')
                        setMoreDropdowns(false)
                        if (showAddAsset) {
                            setShowAddAsset(false)
                        }
                        else {
                            setShowAddAsset(true)
                        }
                    }} style={{ display: 'flex', color: 'white', backgroundColor: '#6200EE', alignItems: 'center', width: '170px', justifyContent: 'center', gap: '10px', borderRadius: '10px' }}>

                        <AddCircleOutlineIcon />
                        <div>Add Asset</div>

                    </div>
                </div>
            </div>

            <DisplayAssets assetsData={assetsData} setAssetsData={setAssetsData} action={action} setAction={setAction} selectKey={selectKey} setSelectKey={setSelectKey} />
        </div>
    )
}


export function AssetList() {
    const { editData, setEditData, token } = useGlobally()
    const { assetsData, setAssetsData, searchInput, setSearchInput, selectVal, setSelectVal, moreDropdowns, setMoreDropdowns, selectKey, setSelectKey, action, setAction, showAddAsset, setShowAddAsset } = useGlobally();
    const { showDelelte } = useGlobally()
    if (!assetsData) {
        return (
            <div>
                <CircularProgress style={{ alignItems: 'center' }} />

            </div>
        )
    }

    return (
        <div>
            <Nav />
            {/* <HandleDelete/> */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <MakeAssetTable searchInput={searchInput} setSearchInput={setSearchInput} assetsData={assetsData} setAssetsData={setAssetsData} setShowAddAsset={setShowAddAsset} showAddAsset={showAddAsset} setMoreDropdowns={setMoreDropdowns} action={action} setAction={setAction} selectKey={selectKey} setSelectKey={setSelectKey} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-450px' }}>

                {showAddAsset && <AddAssetOption setShowAddAsset={setShowAddAsset} moreDropdowns={moreDropdowns} setMoreDropdowns={setMoreDropdowns} selectVal={selectVal} setSelectVal={setSelectVal} />}
                {showDelelte && <HandleDelete />}
            </div>

        </div>
    )
}