import { Link } from 'react-router-dom';
import HWHelperTransparent from '../img/HWHelperTransparent2.png';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src={HWHelperTransparent} alt='HWHelperTransparent' className='image' width='50' height='50' />
                    <h1 className='headerOne'>Homework Helper</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span className='emailHeader'>{user.email}</span>
                            <button className="logout" onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar