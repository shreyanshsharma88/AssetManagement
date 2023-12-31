import { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const globalTokenContext = createContext();

export function AccessToken({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):'');
    const [data, setData] = useState();
    const [assetsData, setAssetsData] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [selectVal, setSelectVal] = useState('');
    const [moreDropdowns, setMoreDropdowns] = useState(false);
    const [selectKey, setSelectKey] = useState('')
    const [showDelelte, setShowDelete] = useState(false)
    //const [showEdit, setShowEdit] = useState(false)
    const [action, setAction] = useState(false);
    const [showAddAsset, setShowAddAsset] = useState(false);
    const [editData, setEditData] = useState({})
    //For dashBoard data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://devassetapi.remotestate.com/asset-management/user/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Not Available');
                }

                const dataFromJSON = await response.json();
                setData(dataFromJSON)
                console.log(data.totalAssets);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [token]);



    //for gettign token
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

const navigate= useNavigate('')
    useEffect(()=>{
        if(!token){
            navigate('/')
        }
    },[token])

    //for assets data

    useEffect(() => {
         async function fetchData() {
            try {
                var params = {
                    name: searchInput
                }
                const res = await fetch(`https://devassetapi.remotestate.com/asset-management/user/asset?limit=10&${new URLSearchParams(params).toString()}&warranty=&available=&assigned=false&deleted=false&assetType=&page=0`,

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
                setAssetsData(dataFromJSON.GetAsset)

            } catch (err) {
                console.log(err)
            }
        }
        const timer = setTimeout(
            async () => {
                fetchData()
            }, 300
        )
        return () => { clearTimeout(timer) }
        //fetchData()
    }, [token, searchInput, showDelelte]);



    return (
        <globalTokenContext.Provider value={{ token, setToken, data, assetsData, setAssetsData, searchInput, setSearchInput, selectVal, setSelectVal, moreDropdowns, setMoreDropdowns, selectKey, setSelectKey, showDelelte, setShowDelete, action, setAction, showAddAsset, setShowAddAsset, editData, setEditData}}>
            {children}
        </globalTokenContext.Provider>
    );
}

export const useGlobally = () => useContext(globalTokenContext);
