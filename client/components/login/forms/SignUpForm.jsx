import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';

import { signup } from '../../../actions/authActions';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Card } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;



class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(signup(values, this.props.history));
      }
    });
  }
  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Card title="Regitster" style={{ width: "600px" }}>
        <div className="registration-form">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="E-mail"
              hasFeedback
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Password"
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Confirm Password"
              hasFeedback
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Nickname&nbsp;
              <Tooltip title="What do you want other to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
              hasFeedback
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(
                <Input />
                )}
            </FormItem>

            <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
              Already have an account? <Link to="/login">Log in!</Link>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Register</Button>
            </FormItem>

          </Form>
        </div>
      </Card>
    );
  }
}

export default connect()(Form.create()(SignUp));
