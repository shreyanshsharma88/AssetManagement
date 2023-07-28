import { useRef, useState } from "react";
import { useGlobally } from "./globalToken";
import { Nav } from "./navBar";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { Label } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function DisplayAssets({ assetsData, setAssetsData }) {
    return (
        <div>
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

function MakeAssetTable({ searchInput, setSearchInput, assetsData, setAssetsData }) {

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

                    <div style={{ display: 'flex', color: 'white', backgroundColor: '#6200EE', alignItems: 'center', width: '170px', justifyContent: 'center', gap: '10px', borderRadius: '10px' }}>

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

    const { assetsData, setAssetsData ,searchInput, setSearchInput} = useGlobally();

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
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <MakeAssetTable searchInput={searchInput} setSearchInput={setSearchInput} assetsData={assetsData} setAssetsData={setAssetsData} />
            </div>


        </div>
    )
}