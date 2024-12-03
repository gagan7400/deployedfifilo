import React from 'react'

function Loader() {
    return (
        <div className='loader'>
            <div className="loading-container">
                <div className="loading-text">
                    <span><img src="./assets/img/f-i.svg" alt="" /></span>
                    <span><img src="./assets/img/i.svg" alt="" /></span>
                    <span><img src="./assets/img/f-ii.svg" alt="" /></span>
                    <span><img src="./assets/img/ii.svg" alt="" /></span>
                    <span><img src="./assets/img/l.svg" alt="" /></span>
                    <span><img src="./assets/img/o.svg" alt="" /></span>
                </div>
            </div>
        </div>
    )
}

export default Loader
