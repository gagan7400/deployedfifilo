import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
export default function Dashboard() {
    return (
        <>
            <Sidebar></Sidebar>
            <div className="main__content">
                <div id="dashboard" className="dashboard__card">
                    <h1>Welcome to Admin Dashboard</h1>
                    <h5>Manage content, monitor performance,<br />and make updates easily.</h5>
                </div>
            </div>
        </>
    )
}
