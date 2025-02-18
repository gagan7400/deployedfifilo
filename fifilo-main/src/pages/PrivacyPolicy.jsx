import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishPrivacyPage } from '../redux/actions/privacyAction';
import DOMPurify from 'dompurify';
import Loader from './Loader';
function PrivacyPolicy() {
    let dispatch = useDispatch();
    let { publishedprivacydata, privacyloading } = useSelector((state) => state.privacy);
    useEffect(() => {
        dispatch(getPublishPrivacyPage());
    }, [dispatch])

    return (
        <>
            {privacyloading && !publishedprivacydata ? <Loader /> : <>
                <div className='bnr__policy'>
                    <div className='container'>
                        <h2 dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(!privacyloading && publishedprivacydata?.heroSection.heading)
                        }} />

                    </div>
                </div>
                <div className='policy__content rn__section__gapTop'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-lg-10' dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(!privacyloading && publishedprivacydata?.content)
                            }} />
                        </div>
                    </div>
                </div>
            </>}</>
    )
}

export default PrivacyPolicy
