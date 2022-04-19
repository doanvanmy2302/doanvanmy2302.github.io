import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Staffs } from './staffs';
import { Departments } from './departments';
import { HomeBackground } from './homeBackground';
import { DeptImages } from './deptImg';
import { StaffsSalary } from './staffsSalary';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            homeImage: HomeBackground,
            deptImages: DeptImages,
            staffsSalary: StaffsSalary,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
} 