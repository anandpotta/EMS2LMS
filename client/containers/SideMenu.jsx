import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
import "./SideMenu.css";


class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.history.push(`${item.key}`);
  }

  render() {
    const { history, location } = this.props;

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo">
          <img src="/images/logo.svg"></img>
          {this.props.collapsed ? "" : <span>{"EMS ADMIN"}</span>}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname == "/" ? "/dashboard" : location.pathname]} onClick={item => this.handleClick(item)}>
          <Menu.Item key="/dashboard">
            <Icon type="appstore-o" />
            <span>Dashboard</span>
          </Menu.Item>

          <Menu.Item key="/employee">
            <Icon type="team" />
            <span>Employees</span>
          </Menu.Item>
          <Menu.Item key="/schedule">
            <Icon type="schedule" />
            <span>Shedule</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

SideMenu.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(SideMenu);
