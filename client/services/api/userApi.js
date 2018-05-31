class UserApi {

  static requestHeaders() {
    // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    return {};
  }

  static getAllUsers(search) {
    const headers = this.requestHeaders();
    const request = new Request(`/api/Users?${search}`, {
      method: 'GET',
      headers: headers
    });

    return fetch(request);
  }

  static getUser(id) {
    const headers = this.requestHeaders();
    const request = new Request(`/api/user/${id}`, {
      method: 'GET',
      headers: headers
    });

    return fetch(request);
  }

  static createUser(newUser) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/user`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(newUser)
    });

    return fetch(request);
  }

  static updateUser(issue) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/user/${User.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        User: User
      })
    });

    return fetch(request);
  }


  static deleteUser(User) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/user/${User._id}`, {
      method: 'DELETE',
      headers: headers
    });

    return fetch(request);
  }


}

export default UserApi;
