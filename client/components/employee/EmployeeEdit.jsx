import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditEmployeeForm from './forms/EditEmployeeForm.jsx';


class EmployeeEdit extends React.Component {
	static dataFetcher({ params, urlBase }) {
		return fetch(`${urlBase || ''}/api/employee/${params.id}`).then(response => {
			if (!response.ok) return response.json().then(error => Promise.reject(error));
			return response.json().then(data => ({ EmployeeEdit: data }));
		});
	}
	constructor(props) {
		super(props);
		console.log('props', props);

		this.state = {
			employee: {
				title: '', name: '',
			},
			open: true,
			isFetching: false
		};

		this.onChange = this.onChange.bind(this);
		this.onValidityChange = this.onValidityChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.submitForm = this.submitForm.bind(this);

		this.dismissValidation = this.dismissValidation.bind(this);
		this.showValidation = this.showValidation.bind(this);

		this.hideModal = this.hideModal.bind(this);
	}
	componentDidMount() {
		this.loadData();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.loadData();
		}
	}
	onValidityChange(event, valid) {
		// Properties in the target object will be overwritten by properties in the sources if they have the same key.  
		const invalidFields = Object.assign({}, this.state.invalidFields);
		if (!valid) {
			invalidFields[event.target.name] = true;
		} else {
			delete invalidFields[event.target.name];
		}
		this.setState({ invalidFields });
	}
	onChange(event, convertedValue) {
		const employee = Object.assign({}, this.state.employee);

		const value = (convertedValue !== undefined) ? convertedValue : event.target.value;
		employee[event.target.name] = value;
		this.setState({ employee });
	}
	showValidation() {
		this.setState({ showingValidation: true });
	}
	dismissValidation() {
		this.setState({ showingValidation: false });
	}


	formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}
	loadData() {
		this.setState({ isFetching: true });
		EmployeeEdit.dataFetcher({ params: this.props.match.params })
			.then(data => {
				const employee = data.EmployeeEdit;
				employee.createdAt = new Date(employee.createdAt);
				employee.completionDate = employee.completionDate != null ? this.formatDate(employee.completionDate) : null;
				console.log('employee.completionDate', employee.completionDate);

				this.setState({ employee });
				this.setState({ isFetching: false });
			}).catch(err => {
				this.props.dispatch(addNotification(`Error in fetching data from server: ${err.message}`, 'success'));
			});
	}
	hideModal() {
		this.setState({ open: false });
		this.props.history.push('/employee')
	};

	requestHeaders() {
		const jwt = Auth.getToken();
		return { 'AUTHORIZATION': `Bearer ${jwt}` }
	}

	onSubmit(values) {
		console.log('values', values);
		const employee = Object.assign({}, values);
		if (values.completionDate) {
			const completionDate = new Date(values.completionDate);
			employee.completionDate = completionDate;
		}
		const headers = Object.assign({
			'Content-Type': 'application/json'
		}, this.requestHeaders());
		const request = new Request(`/api/employee/${this.props.match.params.id}`, {
			method: 'PUT',
			headers: headers,
			body: JSON.stringify(employee),
		});

		fetch(request).then(response => {
			if (response.ok) {
				response.json().then(updatedEmployee => {
					// convert to MongoDB Date object type
					updatedEmployee.createdAt = new Date(updatedEmployee.createdAt);

					this.setState({ employee: updatedEmployee });
					// this.props.showSuccess('Updated employee successfully.');
					this.props.dispatch(addNotification('Updated employee successfully', 'success'));
				});
			} else {
				response.json().then(error => {
					this.props.dispatch(addNotification(`Failed to update employee: ${error.message}`, 'error'));
				});
			}
		}).catch(err => {
			this.props.dispatch(addNotification(`Failed to update employee: ${err.message}`, 'success'));
		});
	}
	submitForm() {
		this.props.dispatch(submit('EditEmployeeForm'));
	}
	render() {
		const employee = this.state.employee;
		return (
			<div>
				<EditEmployeeForm employee={employee} initialValues={employee} onSubmit={this.onSubmit} />
			</div>
		);
	}
}
EmployeeEdit.propTypes = {
	match: PropTypes.object.isRequired
};

export default withRouter(connect()(EmployeeEdit));
