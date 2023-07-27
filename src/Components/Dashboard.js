import CircularProgress from '@mui/material/CircularProgress';
import { Nav } from "./navBar";
import { useGlobally } from "./globalToken";

import driveIcon from '../images/drive.png'
import distributedIcon from '../images/sun.png'
import availableIcon from '../images/hand.png'

import laptopIcon from '../images/laptop.jpg'
import mouseIcon from '../images/mouse.jpg'
import hardDiskIcon from '../images/hardDrive.jpg'
import penDriveIcon from '../images/pendrive.jpg'
import mobileIcon from '../images/mobile.jpg'
import simIcon from '../images/sim.jpg'


import upArrow from '../images/arrow-up.svg'
function DisplayCards({ cardImage, assetTitle, assetQuantity, assetGrowth }) {
const im =  <img  style={{ borderRadius: '100%', height: '20px', width: '20px', alignItems:'center' , marginTop:'2px' }} src={upArrow} />
    return (
        <div style={{ display: 'flex', textAlign: 'center' }} className="displayCard">
            <div style={{ paddingTop: '40px', paddingLeft: '25px' }}>

                <img className="cardImg" style={{ borderRadius: '100%', height: '70px', width: '70px', float: 'left', padding: '10px', alignItems: 'center' }} src={cardImage} />
            </div>



            <div style={{ display: 'flex', textAlign: 'center', flexDirection: 'column', columnGap: '10px', marginLeft: '10px' }}>

                <div style={{ fontFamily: 'poppins', fontWeight: '300', marginTop: '40px', marginBottom: '0px' }}> {assetTitle} </div>
                <h1 style={{ marginBottom: '15px' }}>{assetQuantity}</h1>
                <div style={{display:'flex', justifyContent:'center'}} >

                {assetGrowth && <div style={{ fontSize: '15px' }}>{im} {assetGrowth} %  this year</div>}
                </div>

            </div>


        </div>
    )
}


function MakeTable({ itemImage, item, quantity }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', padding: '25px', fontSize: '18px', fontWeight: 'bolder',alignItems:'center', columnGap:'12px' }}>
                <img style={{ borderRadius: '100%', height: '40px', width: '40px', float: 'left' }} src={itemImage} />
                {item}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '25px', fontSize: '18px', fontWeight: '200' }}>
                {quantity}
            </div>


        </div>
    )

}



export function Dashboard() {

    

    const { data } = useGlobally()
    if (!data) {
        return (
            <div>
                <CircularProgress style={{ alignItems: 'center' }} />

            </div>
        )
    }
    console.log(data)

    function AssetCard() {


        return (
            <div className="assetCard">

                <>
                    <h2  >Total Assets</h2>
                </>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '40px', fontSize: '18px', fontWeight: '200' }}>
                    <div>Category</div>
                    <div>Quantity</div>
                </div>
                <hr></hr>

                <div style={{ display: 'grid', margin:'30px' }}>
                    <MakeTable itemImage={laptopIcon} item={'Laptop'} quantity={data.laptopQuantity} />
                    <MakeTable itemImage={mouseIcon} item={'Mouse'} quantity={data.mouseQuantity} />
                    <MakeTable itemImage={hardDiskIcon} item={'Hard Disk'} quantity={data.hardDiskQuantity} />
                    <MakeTable itemImage={penDriveIcon} item={'Pen Drive'} quantity={data.hardDiskQuantity} />
                    <MakeTable itemImage={mobileIcon} item={'Mobile'} quantity={data.mobileQuantity} />
                    <MakeTable itemImage={simIcon} item={'SIM Card'} quantity={data.simQuantity} />
                </div>
                <button onClick={ () => {} }>add another asset</button>
            </div>
        )
    }
    return (
        <>
            <div style={{ display: 'grid', justifyContent: 'center', padding: '20px'
            //  , backgroundColor:'#F2F2F7 '
         }}>
                <Nav />


                <div style={{ display: 'flex', columnGap: '30px', marginTop: '100px', padding: '20px', justifyContent: 'center', flexWrap:'wrap' }}>

                    <DisplayCards
                        cardImage={driveIcon}
                        assetTitle={'Total Assets'}
                        assetQuantity={data.totalAssets}
                        assetGrowth={'4'} />
                    <DisplayCards
                        cardImage={distributedIcon}
                        assetTitle={'Distributed Assets'}
                        assetQuantity={data.distributedAssets}
                        assetGrowth={'10'} />
                    <DisplayCards
                        cardImage={availableIcon}
                        assetTitle={'Available Assets'}
                        assetQuantity={data.availableAssets}
                        assetGrowth={''} />
                </div>

                <AssetCard />
            </div>
        </>
    );
}