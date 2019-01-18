import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import './App.css'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

class StepThree extends Component {
  static propTypes = {
    power: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    total_area: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    real_area: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    block_number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    roll_number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }
  render() {
    console.log(this.props)
    return (
      <div className='stepTwo-container'>
        <div style={{ width: '50%', margin: 'auto' }}>
          <Form.Item
            {...formItemLayout}
            label="受力"
          >
            <Input
              type='number'
              addonAfter={'N/mm2'}
              value={this.props.power} />
            <Input
              type='number'
              addonAfter={'T/m2'}
              value={this.props.power * 101.97162129779} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="总面积"
          >
            <Input
              type='number'
              addonAfter={'m2'}
              value={this.props.total_area} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="实际面积"
          >
            <Input
              type='number'
              addonAfter={'m2'}
              value={this.props.real_area} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="块数量"
          >
            <Input
              type='number'
              addonAfter={'个'}
              value={this.props.block_number} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="卷数量"
          >
            <Input
              type='number'
              addonAfter={'个'}
              value={this.props.roll_number} />
          </Form.Item>
        </div>

      </div>
    )
  }
}

export default StepThree
