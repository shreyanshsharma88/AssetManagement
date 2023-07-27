import { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';

const globalTokenContext = createContext();

export function AccessToken({ children }) {
    const [token, setToken] = useState('');
    const [data, setData] = useState();
    const [assetsData, setAssetsData] = useState();


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

    //for assets data
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('https://devassetapi.remotestate.com/asset-management/user/asset/',
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
fetchData()
    }, [token])


    return (
        <globalTokenContext.Provider value={{ token, setToken, data, assetsData, setAssetsData }}>
            {children}
        </globalTokenContext.Provider>
    );
}

export const useGlobally = () => useContext(globalTokenContext);
