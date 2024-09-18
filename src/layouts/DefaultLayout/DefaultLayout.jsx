import PropTypes from 'prop-types';
import Navbar from '@/layouts/Navbar'
import { Outlet } from 'react-router-dom';

function DefaultLayout() {
    return (
        <div className='wrapper'>
            <Navbar />
            <div className='body bg-background'>
                <Outlet />
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;