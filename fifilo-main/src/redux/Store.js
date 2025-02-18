import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/adminreducer.js'
import { jobsReducer, careerpagereducer } from './reducers/careerreducer.js';
import { contactReducer, contactPageReducer } from './reducers/contactReducer.js';
import { homePageReducer } from './reducers/homeReducer.js';
import { pageReducer } from './reducers/pageReducer.js';
import { servicesReducer } from './reducers/servicesReducer.js';
import { aboutPageReducer } from './reducers/aboutReducer.js';
import { faqPageReducer } from './reducers/faqReducer.js';
import { casestudyReducer } from './reducers/casestudyReducer.js';
import { blogReducer } from './reducers/blogReducer.js';
import { privacyPageReducer } from './reducers/privacyReducer.js';
export const store = configureStore({
    reducer: {
        user: userReducer,
        jobs: jobsReducer,
        contact: contactReducer,
        homepage: homePageReducer,
        services: servicesReducer,
        careerpage: careerpagereducer,
        about: aboutPageReducer,
        faq: faqPageReducer,
        contactpage: contactPageReducer,
        page: pageReducer,
        casestudy: casestudyReducer,
        blog: blogReducer,
        privacy: privacyPageReducer,
    }
})
