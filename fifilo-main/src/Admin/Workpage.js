import React from 'react';
import Sidebar from './Sidebar';
const Workpage = () => {
    return (
        <div className='dashboard-main'>
            <div >
                <Sidebar />
            </div>
            <div className="main-content">
                <div className="inner">
                    <h3> Hello Workpage </h3>
                </div>
            </div>
        </div>
    );
};

export default Workpage;