import PropTypes from 'prop-types';
import Navbar from '@/layouts/Navbar'

function DefaultLayout({ children }) {
    return (
        <div className='wrapper'>
            <Navbar />
            <div className='body bg-background'>{children}</div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;