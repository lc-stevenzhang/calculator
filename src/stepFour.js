import React, { Component } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import './App.css'

class StepFour extends Component {
  static propTypes = {
    power: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  }

  roundValue(number) { // digits is how many nubmers does the rounding need.
    return Math.round(number * 1000) / 1000
  }

  render() {
    const dataSource_SR = [{
      key: '1',
      name: 'SR11',
      value: 0.011,
      result: (this.props.power / 0.011)
    },
    {
      key: '2',
      name: 'SR18',
      value: 0.018,
      result: (this.props.power / 0.018)
    },
    {
      key: '3',
      name: 'SR28',
      value: 0.028,
      result: (this.props.power / 0.028)
    },
    {
      key: '4',
      name: 'SR42',
      value: 0.042,
      result: (this.props.power / 0.042)
    },
    {
      key: '5',
      name: 'SR55',
      value: 0.055,
      result: (this.props.power / 0.055)
    },
    {
      key: '6',
      name: 'SR110',
      value: 0.11,
      result: (this.props.power / 0.11)
    },
    {
      key: '7',
      name: 'SR220',
      value: 0.22,
      result: (this.props.power / 0.22)
    },
    {
      key: '8',
      name: 'SR450',
      value: 0.45,
      result: (this.props.power / 0.45)
    },
    {
      key: '9',
      name: 'SR850',
      value: 0.85,
      result: (this.props.power / 0.85)
    },
    {
      key: '10',
      name: 'SR1200',
      value: 1.2,
      result: (this.props.power / 1.2)
    }]

    const columns_SR = [{
      title: '材料',
      dataIndex: 'name',
    }, {
      title: '静载荷极限（N/mm2）',
      dataIndex: 'value',
    }, {
      title: '负载利用率',
      dataIndex: 'result',
      render: (value) =>
        <span>
          {(this.roundValue(value) * 100).toString().slice(0, 4)}%
      </span>
    }]

    const dataSource_NB = [{
      key: '1',
      name: 'NB',
      value: 0.075,
      result: (this.props.power / 0.075)
    },
    {
      key: '2',
      name: 'NC',
      value: 0.15,
      result: (this.props.power / 0.15)
    },
    {
      key: '3',
      name: 'ND',
      value: 0.35,
      result: (this.props.power / 0.35)
    },
    {
      key: '4',
      name: 'NE',
      value: 0.75,
      result: (this.props.power / 0.75)
    },
    {
      key: '5',
      name: 'NF',
      value: 1.5,
      result: (this.props.power / 1.5)
    },
    {
      key: '6',
      name: 'HRB HS 3000',
      value: 3,
      result: (this.props.power / 3)
    },
    {
      key: '7',
      name: 'HRB HS 6000',
      value: 6,
      result: (this.props.power / 6)
    }]

    const columns_NB = [{
      title: '材料',
      dataIndex: 'name',
    }, {
      title: '静载荷极限（N/mm2）',
      dataIndex: 'value',
    }, {
      title: '负载利用率',
      dataIndex: 'result',
      render: (value) =>
        <span>
          {(this.roundValue(value) * 100).toString().slice(0, 4)}%
      </span>
    }]

    const dataSource_SP = [{
      key: '1',
      name: 'SP10',
      value: 0.005,
      result: this.props.power / 0.005
    },
    {
      key: '2',
      name: 'SP30',
      value: 0.012,
      result: (this.props.power / 0.012)
    },
    {
      key: '3',
      name: 'SP100',
      value: 0.05,
      result: (this.props.power / 0.05)
    },
    {
      key: '4',
      name: 'SP300',
      value: 0.15,
      result: (this.props.power / 0.15)
    },
    {
      key: '5',
      name: 'SP500',
      value: 0.25,
      result: (this.props.power / 0.25)
    },
    {
      key: '6',
      name: 'SP1000',
      value: 0.5,
      result: (this.props.power / 0.5)
    }]

    const columns_SP = [{
      title: '材料',
      dataIndex: 'name',
    }, {
      title: '静载荷极限（N/mm2）',
      dataIndex: 'value',
    }, {
      title: '负载利用率',
      dataIndex: 'result',
      render: (value) =>
        <span>
          {(this.roundValue(value) * 100).toString().slice(0, 4)}%
      </span>
    }]
    return (
      <div className='stepFour-container'>
        <Table dataSource={dataSource_SR} columns={columns_SR} size='small' pagination={false} />
        <Table dataSource={dataSource_NB} columns={columns_NB} size='small' pagination={false} />
        <Table dataSource={dataSource_SP} columns={columns_SP} size='small' pagination={false} />
      </div>
    )
  }
}

export default StepFour
