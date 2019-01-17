import React, { Component } from 'react'
import { Form, Input } from 'antd'
import './App.css'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

class StepThree extends Component {
  render() {
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label="受力"
        >
          <Input
            name=''
            type='number'
            addonAfter={'N/mm2'}
            value={this.props.power} />
          <Input
            name=''
            type='number'
            addonAfter={'T/mm2'}
            value={this.props.power} />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="总面积"
        >
          <Input
            name=''
            type='number'
            addonAfter={'m2'}
            value={this.props.total_area} />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="实际面积"
        >
          <Input
            name=''
            type='number'
            addonAfter={'m2'}
            value={this.props.real_area} />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="块数量"
        >
          <Input
            name=''
            type='number'
            addonAfter={'个'}
            value={this.props.block_number} />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="卷数量"
        >
          <Input
            name=''
            type='number'
            addonAfter={'个'}
            value={this.props.roll_number} />
        </Form.Item>
      </div>
    )
  }
}

export default StepThree
