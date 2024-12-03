import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
export default function Dashboard() {
    return (
        <>
            <Sidebar></Sidebar>
            <div className="main__content">
                <div id="dashboard" className="card__box">
                    <h2>Welcome to the Dashboard</h2>
                    <p>This is a simple dashboard layout.  </p>
                </div>
            </div>
        </>
    )
}
