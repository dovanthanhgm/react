// import PropTypes from 'prop-types'
// import classNames from 'classnames/bind'
import Header from '~/layouts/partials/Header'
import Sidebar from '~/layouts/partials/Sidebar'

// const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className="">
            <Header />
            <div className="">
                <Sidebar />
                <div className="">{children}</div>
            </div>
        </div>
    )
}

// DefaultLayout.propTypes = {
//     children: PropTypes.node.isRequired,
// }

export default DefaultLayout
