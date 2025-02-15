import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getHomePage, openHomePage } from '../redux/actions/homeAction';
import { NavLink } from 'react-router-dom';
import { pageAction } from '../redux/actions/pagedataAction';

export default function Dashboard() {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    let alldata = async () => {
        try {
            let { data } = await axios.get('http://localhost:5000/admin/pages/getallpages');
            setAllData(data.data);
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }
    useEffect(() => {
        alldata()
    }, [])
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHomePage())
    }, [dispatch])
    let dateformat = (date) => {
        let time = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
        return time
    }
    return (
        <>
            <Sidebar />
            <div className="main__content">
                <div id="home" className="card__box" style={{ display: "block" }}>
                    <div className="page__editors">
                        <div className="page__title">
                            <h5>Pages</h5>
                        </div>
                    </div>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: "40%" }}>Page name</th>
                                    <th scope="col">Created on</th>
                                    <th scope="col">Updated on</th>
                                    <th scope="col" style={{ width: "100px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((v, i) => {
                                    return <tr key={i}>
                                        <td>{v.pageName.split("p").join(" P")}</td>
                                        <td>{v.createdAt && dateformat(v.createdAt)}</td>
                                        <td>{v.updatedAt && dateformat(v.updatedAt)}</td>
                                        <td> <NavLink to={`/pages/${v.pageName.split(" ").join("").split("page")[0].toLowerCase()}`} onClick={() => { dispatch(pageAction({ ...v })) }} className="btn"> <img src="/assets/imgs/edit.svg" alt="Edit icon" /></NavLink> </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ >
    )
}
