import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames';

import enUS from 'antd/lib/locale-provider/en_US';
import { Layout, Menu, Icon, LocaleProvider, Breadcrumb } from 'antd';
const { Content, Sider } = Layout;
import "./App.css";

import SideMenu from "./SideMenu.jsx";
import Header from "./Header.jsx";
import Routes from "../Routes/AppRoutes.jsx";


// withRouter IssueList can use this.props.router to access the router object.(this.props.location)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            date: '',
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        const { history, location } = this.props;

        return (
            <LocaleProvider locale={enUS}>
                <Layout className={classNames("app", "ant-layout-has-sider")}>
                    <SideMenu collapsed={this.state.collapsed} />
                    <Layout>
                        <Header toggleMenu={this.toggle} collapsed={this.state.collapsed} />
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Routes />
                        </Content>
                    </Layout>
                </Layout>
            </LocaleProvider>
        );
    }
}


export default App;
