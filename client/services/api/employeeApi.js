import Auth from '../../store/auth';

class employeeApi {

  static requestHeaders() {
    const jwt = Auth.getToken();
    return {'AUTHORIZATION': `Bearer ${jwt}`}
  }

  static getAllEmployees(search) {
    const headers = this.requestHeaders();
    const request = new Request(`/api/employee?${search}`, {
      method: 'GET',
      headers: headers
    });

    return fetch(request);
  }
  static createEmployee(employee) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/employee`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(employee)
    });

    return fetch(request);
  }
  static readEmployee(id) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/employee/${id}`, {
      method: 'GET',
      headers: headers,
    });

    return fetch(request);
  }

  static updateEmployee(employee) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/employee/${employee._id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(employee)
    });

    return fetch(request);
  }


  static deleteEmployee(id) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/employee/${id}`, {
      method: 'DELETE',
      headers: headers
    });

    return fetch(request);
  }

  static deleteBulkEmployee(docIds) {

    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/employee`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({
        docIds: docIds
      })
    });

    return fetch(request);
  }
}

export default employeeApi;
