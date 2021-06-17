import React from 'react'
import Sidebar from '../component/Navigation/Sidebar/Sidebar'

const Layout = ({ children }) => (
    <React.Fragment>
        <div style={{display:'flex',flexFlow:'row' }}>
            <div>
            <Sidebar />
            </div>
            <main style={{width:'85%',marginLeft:'280px'}}>{children}</main>
            <footer></footer>
        </div>
    </React.Fragment>
)
export default Layout;