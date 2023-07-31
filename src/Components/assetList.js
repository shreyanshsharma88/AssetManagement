import { useRef, useState } from "react";
import { useGlobally } from "./globalToken";
import { Nav } from "./navBar";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DisplayForm } from "./modals/addMoreDropdowns";



export function AddAssetOption({ setShowAddAsset, moreDropdowns, setMoreDropdowns, selectVal, setSelectVal }) {
    function MoreDropdowns() {


        return (
            <DisplayForm/>
        )
    }
    return (
        
            <div className="addAssetBox">
                <div >

                    <h1 style={{ color: '#6200EE', fontFamily: 'poppins', float: 'left', padding: '10px', marginLeft: '20px' }}>Add Asset</h1>
                    <CancelIcon style={{ float: 'right', padding: '12px' }} onClick={() => {
                        setShowAddAsset(false)
                        setMoreDropdowns(false)
                    }} />
                </div>
                <div style={{ display: 'grid' }}>
                    <div>Assign Asset</div>
                    <select onChange={(e) => {
                        setSelectVal(e.target.value)
                        setMoreDropdowns(true)
                    }} className="addAssetDropdown">

                        <option hidden value="">None</option>
                        <option value="laptop">Laptop</option>
                        <option value="mouse">Mouse</option>
                        <option value="pen drive">Pen Drive</option>
                        <option value="hard drive">Hard Drive</option>
                        <option value="mobile">Mobile</option>
                        <option value="sim card">SIM Card</option>
                    </select>
                    {moreDropdowns && <MoreDropdowns />}
                </div>
            </div>
        
    )
}

function DisplayAssets({ assetsData, setAssetsData }) {
    return (
        <div >
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
                            <tr>
                                <td>{item.brand}</td>

                                <td>{item.model}</td>

                                <td>{item.serialNo}</td>

                                <td>{item.AssetType}</td>

                                <td>{item.purchasedDate}</td>

                                <td>{item.warrantyStartDate}</td>

                                <td>{item.warrantyExpiryDate}</td>

                                <td>{item.assignedTo}</td>
                            </tr>
                        </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

function MakeAssetTable({ searchInput, setSearchInput, assetsData, setAssetsData, setShowAddAsset, showAddAsset, setMoreDropdowns }) {

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
                    <CancelIcon  />
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

            <DisplayAssets assetsData={assetsData} setAssetsData={setAssetsData} />
        </div>
    )
}


export function AssetList() {
    const [showAddAsset, setShowAddAsset] = useState(false);

    const { assetsData, setAssetsData, searchInput, setSearchInput, selectVal, setSelectVal, moreDropdowns, setMoreDropdowns } = useGlobally();

    if (!assetsData) {
        return (
            <div>
                <CircularProgress style={{ alignItems: 'center' }} />

            </div>
        )
    }

    console.log(selectVal)
    return (
        <div>
            <Nav/>


            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <MakeAssetTable searchInput={searchInput} setSearchInput={setSearchInput} assetsData={assetsData} setAssetsData={setAssetsData} setShowAddAsset={setShowAddAsset} showAddAsset={showAddAsset} setMoreDropdowns={setMoreDropdowns} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-450px' }}>

                {showAddAsset && <AddAssetOption setShowAddAsset={setShowAddAsset} moreDropdowns={moreDropdowns} setMoreDropdowns={setMoreDropdowns} selectVal={selectVal} setSelectVal={setSelectVal} />}
            </div>


        </div>
    )
}