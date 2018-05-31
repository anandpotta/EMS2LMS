import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Select, Spin, Icon, Button, Input, AutoComplete } from 'antd';
import debounce from 'lodash.debounce';
const Option = Select.Option;

import Highlighter from 'react-highlight-words';




function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return (new Array(getRandomInt(5))).join('.').split('.')
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }));
}

function renderOption(item) {
  return (
    <Option key={item.id} text={item.text} value={item.text}>
      <Highlighter
        highlightClassName='highlight'
        searchWords={[item.search]}
        textToHighlight={item.text}
      />
    </Option>
  );
}

class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;

    this.state = {
      data: [],
      value: [],
      fetching: false,
    }

    this.fetchUser = debounce(this.fetchUser, 800);

    this.onSelect = this.onSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.findEmployee = this.findEmployee.bind(this);
  }

  fetchUser(value) {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ value: value, fetching: true });

    fetch(`/api/employee?_limit=5&search=${value}`)
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.records.map(user => ({
          id: user._id,
          search: value,
          text: `${user.name.firstName} ${user.name.lastName}`,
        }));
        this.setState({ data , fetching: false});
      });
  }
  handleSearch(value) {
    this.setState({
      data: value ? fetchUser(value) : [],
    });
  }
  onSelect(value, option) {
    console.log('onSelect', value);
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  findEmployee() {
    if(!this.state.fetching) {
      const { search } = this.props.location;
      const query = Object.assign(qs.parse(search), { search: this.state.value });
      this.props.history.push({ pathname: this.props.location.pathname, search: qs.stringify(query) })
    }
  }
  render() {
    const { fetching, data, value } = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '100%' }}
          dataSource={data.map(renderOption)}
          onSelect={this.onSelect}
          onSearch={this.fetchUser.bind(this)}
          placeholder="Find by name"
          optionLabelProp="text"
        >
          <Input
            suffix={(
              <Button className="search-btn" size="large" type="primary" 
              loading={this.state.fetching}
              onClick={() => this.handleSearch()}>
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </div>
    );
  }
}
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

export default withRouter(connect(mapStateToProps)(EmployeeSearch));
