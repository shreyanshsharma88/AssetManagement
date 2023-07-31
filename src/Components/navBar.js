import { useNavigate } from 'react-router-dom'
import '../App.css'
import companyIcn from '../images/companyIcon.png'
import usrImg from '../images/userImage.png'
import { useLocation } from 'react-router-dom'
export function Nav() {
    const navigate = useNavigate('');
//     const location = useLocation();
//   const isLoginPage = location.pathname === '/';

//   if (isLoginPage) {
//     return null; // Don't display the navbar on the login page
//   }
    return (
        <div className='navBar'>
            <div>

                <img style={{ height: '60px', width: '60px', float: 'left', padding: '10px' }} src={companyIcn} />
                <div style={{ display: 'grid', float: 'left' }}>

                    <label style={{ height: '5px', fontSize: '14px', fontWeight: '700', color: '#7737FF', padding: '10px' }}>StoreX</label>

                    <label style={{ fontFamily: 'poppins', fontSize: '14px', fontWeight: '300', color: '#7737FF', padding: '10px' }}>Asset Management</label>

                </div>
            </div>

            <div style={{ display: 'flex', columnGap: '50px', alignItems: 'center' }}>
                <p  onClick={() => {
                    navigate('/dashboard/assetList')
                }} style={{ fontFamily: 'poppins' }}>Asset List</p>
                <p  style={{ fontFamily: 'poppins' }}>Employer List</p>
                <p  style={{ fontFamily: 'poppins' }}>Accessed By</p>
            </div>



            <div style={{ display: 'flex', columnGap: '20px', padding: '15px' }} className="userImage">
                <p>Nitya anand</p>
                <img style={{ borderRadius: '100%', height: '40px', width: '40px', float: 'left', padding: '10px' }} src={usrImg} />

            </div>
        </div>
    )
}