import React, { Component } from 'react'
import { Radio, Button } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
import StepTwo from './stepTwo'
import StepThree from './stepThree'
import StepFour from './stepFour'

const RadioGroup = Radio.Group

const uuidv1 = require('uuid/v1')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      full_cover: true,
      hole_array: [], // {id: '', shape: 'circle', diameter: '2', length:'', width: ''}
      full_cover_length: '',
      full_cover_width: '',
      full_cover_unit: 'm',
      //hole_array: [], // {id: '', shape: 'circle', diameter: '7.8', dimension: '5'},
      bolt_hole: { size: '', number: '' }, // size: M8/10/12/20/24
      leg_length: '',
      leg_width: '',
      leg_diameter: '',
      leg_square_count: '',
      leg_circle_count: '',
      weight: '',
      weight_unit: 't', // unit: t, kg
      power: '',
      real_area: '', // m2
      total_area: '',
      block_number: '',
      roll_number: ''
    }
  }

  onFullCoverChange = (e) => {
    console.log('full_cover changed: ', e.target.value);
    this.setState({
      full_cover: e.target.value,
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onLegDimensionChange = (e, id, field) => {
    const value = e.target.value
    this.setState({
      hole_array: this.state.hole_array.map(element => {
        if (element.id === id) {
          return Object.assign({}, element, { [field]: value })
        } else {
          return element
        }
      })
    })
  }

  changeFullCoverUnit = (value) => {
    console.log('changeFullCoverUnit to: ' + value)
    if (this.state.full_cover_unit === 'cm' && value === 'm') {
      this.setState({
        full_cover_unit: value,
        full_cover_length: this.state.full_cover_length / 100,
        full_cover_width: this.state.full_cover_width / 100,
      })
    }
    if (this.state.full_cover_unit === 'm' && value === 'cm') {
      this.setState({
        full_cover_unit: value,
        full_cover_length: this.state.full_cover_length * 100,
        full_cover_width: this.state.full_cover_width * 100,
      })
    }
  }


  changeWeightUnit = (value) => {
    console.log('changeWeightUnit to: ' + value)
    if (this.state.weight_unit === 't' && value === 'kg') {
      this.setState({
        weight_unit: value,
        weight: this.state.weight * 1000,
      })
    }
    if (this.state.weight_unit === 'kg' && value === 't') {
      this.setState({
        weight_unit: value,
        weight: this.state.weight / 1000,
      })
    }
  }

  addHole = (shape) => {
    console.log('addHole, type is: ' + shape)
    console.log(this.state.hole_array.concat({
      id: uuidv1(),
      shape: shape,
      diameter: '',
      length: '',
      width: ''
    }))
    this.setState({
      hole_array: this.state.hole_array.concat({
        id: uuidv1(),
        shape: shape,
        diameter: '',
        length: '',
        width: ''
      })
    })
  }

  deleteHole = (id) => {
    this.setState({
      hole_array: this.state.hole_array.filter(element => element.id !== id)
    })
  }

  calculate = () => {

  }
  render() {
    return (
      <div className="App">
        <div className='parent-container'>
          <h3 className='h3-header'>1.选择类型</h3>
          <RadioGroup onChange={this.onFullCoverChange} value={this.state.full_cover}>
            <Radio value={true}>满铺</Radio>
            <Radio value={false}>支座</Radio>
          </RadioGroup>
          <h3 className='h3-header'>2.输入数据</h3>
          <StepTwo
            full_cover={this.state.full_cover}
            full_cover_length={this.state.full_cover_length}
            full_cover_width={this.state.full_cover_width}
            full_cover_unit={this.state.full_cover_unit}
            hole_array={this.state.hole_array}
            weight={this.state.weight}
            weight_unit={this.state.weight_unit}
            onChange={this.onChange}
            onLegDimensionChange={this.onLegDimensionChange}
            changeFullCoverUnit={this.changeFullCoverUnit}
            changeWeightUnit={this.changeWeightUnit}
            addHole={this.addHole}
            deleteHole={this.deleteHole}
          />
          <div>
            <Button onClick={this.calculate}>计算</Button>
          </div>

          <h3 className='h3-header'>3.结果</h3>
          <StepThree />

          <h3 className='h3-header'>4.材料选择</h3>
          <StepFour />
        </div>
      </div>
    );
  }
}

export default App
