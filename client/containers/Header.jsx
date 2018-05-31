import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout, Menu, Icon, Badge } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import AuthStore from "../store/auth";

import "./Header.css";

class AdminMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['2']}
        className="header-item"
        onClick={this.props.handleClick}
      >
        <Menu.Item key="mail">
          <Badge count={5}>
            <Icon type="mail" />
          </Badge>
        </Menu.Item>
        <SubMenu title={<span><Icon type="user" />{"guest"}</span>}>
          <Menu.Item key="logout">
            {"Logout"}
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
AdminMenu.prototypes = {
  history: PropTypes.object.isRequired,
}


class AppHeader extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }
  handleClick(e) {
    if(e.key == 'logout') {
      AuthStore.deauthenticateUser();
      this.props.history.replace({
        pathname: `/`
      })
    }
  }
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger header-item"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggleMenu}
        />
        <span className="header-title">{"Employee Management"}</span>
        <AdminMenu handleClick={this.handleClick} />
      </Header>
    );
  }
}

AppHeader.prototypes = {
  toggleMenu: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(AppHeader);
