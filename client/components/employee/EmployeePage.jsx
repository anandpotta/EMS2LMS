
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import qs from 'query-string';

import EmployeeTable from './employee-table/EmployeeTable.jsx'


const PAGE_SIZE = 10;
class EmployeePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            totalCount: 0,
        };
    }
    render() {
        return (
            <div>
                <h1 className="page-title">{"Employees"}</h1>
                <EmployeeTable />
            </div>

        );
    }
}
EmployeePage.propTypes = {
    employees: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    const employeeState = state.employeeState;
    return {
        employees: employeeState.employees,
        totalCount: employeeState.totalCount,
        isFetching: employeeState.isFetching,
        lastUpdated: employeeState.lastUpdated,
        updatedEmployee: employeeState.updatedIssue,
    }
};

export default withRouter(connect(mapStateToProps)(EmployeePage));

