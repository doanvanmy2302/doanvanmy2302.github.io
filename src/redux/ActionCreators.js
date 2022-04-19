import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import dateFormat  from "dateformat";

export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
})

export const postStaff = (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    dispatch(staffsLoading(true));
    const newStaff = {
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
    }
    newStaff.image = "/assets/images/staff_img.jpg"; 

        return fetch(baseUrl + 'staffs', {
            method: 'POST',
            body: JSON.stringify(newStaff),
            headers: {
                'Content-Type': 'application/json'
            }, 
            credentials: 'same-origin',
        })
            .then(response => {
                    if(response.ok) {
                        return response;
                    }
                    else {
                        var error = new Error('Error ' + response.status + ': ' + response.message);
                        error.response = response;
                        throw error;
                    }
                }, 
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
                .then(response => response.json())
                .then(staff => dispatch(addStaff(staff)))
                .then(() => dispatch(fetchStaffsSalary()))
                .then(() => dispatch(fetchDepartments()))
                .catch(error => dispatch(staffsFailed(error.message)))
}

export const changeInfo = (staffId, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    
    const staffChanged = {
        name: name,
        doB: dateFormat(doB, "dd/mm/yyyy"),
        startDate: dateFormat(startDate, "dd/mm/yyyy"),
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
    }
    staffChanged.image = "/assets/images/alberto.png"; 
    let testurl =  baseUrl + 'staffs/' + staffId;
    console.log('TEST  URL ' + testurl);
    console.log('STAFF CHANGE ' + JSON.stringify(staffChanged));
        
        return fetch(baseUrl + 'staffs/' + staffId, {
            method: "PATCH",
            body: JSON.stringify(staffChanged),
            headers: {
                "Access-Control-Allow-Origin": "https://rjs101xbackend.herokuapp.com",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
            })
            .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
            },
            error => {
            throw error;
            })
            .then(response => response.json())
            .then(response => console.log('RESPONSE ' + response))
            // .then(() => dispatch(fetchStaffsSalary()))
            // .then(() => dispatch(fetchDepartments()))
            .catch(error => { console.log('CHANGE STAFF', error.message); alert('Your update is failed\nError: ' + error.message); });
}

export const onDelete = (staffId) => (dispatch) => {
    return fetch(`${baseUrl}staffs/${staffId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        })
        .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                }
            }, 
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(staffs => dispatch(addStaffs(staffs)))
            .then(() => dispatch(fetchStaffsSalary()))
            .then(() => dispatch(fetchDepartments()))
            .catch(error => dispatch(staffsFailed(error.message)))
};

export const fetchStaffs = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'staffs')
        .then(response =>{
                if(response.ok) {
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                };
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response => response.json()))
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)));
};


export const addStaffs = (staffs) =>({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
}); 

export const delStaff = (staff) => ({
    type: ActionTypes.DELETE_STAFF,
    payload: staff
})

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

/////////////////////////////////////////////////////////////////
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
        .then(response =>{
                if(response.ok) {
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                };
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response => response.json()))
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)));
};

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
});

////////////////////////////////////////////////////////
export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsSalaryLoading(true));

    return fetch(baseUrl + 'staffsSalary')
        .then(response =>{
                if(response.ok) {
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                };
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response => response.json()))
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
        .catch(error => dispatch(staffsSalaryFailed(error.message)));
};

export const addStaffsSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_STAFFSSALARY,
    payload: staffsSalary
});

export const staffsSalaryLoading = () => ({
    type: ActionTypes.STAFFSSALARY_LOADING,
});

export const staffsSalaryFailed = (errmess) => ({
    type: ActionTypes.STAFFSSALARY_FAILED,
    payload: errmess
});