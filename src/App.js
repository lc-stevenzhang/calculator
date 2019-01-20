import React, { Component } from 'react'
import { Radio, Button } from 'antd'
import 'antd/dist/antd.css'
import './App.css'
import convert from 'convert-units'
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
      bolt_hole_size: 'm8',// size: M8/10/12/20/24
      bolt_hole_number: '',// size: M8/10/12/20/24
      leg_length: '',
      leg_width: '',
      leg_diameter: '',
      leg_square_count: 0,
      leg_circle_count: 0,
      weight: '',
      weight_unit: 't', // unit: t, kg
      power: '', //受力 N/mm2
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

  onBoltHoleChange = (e) => {
    this.setState({
      bolt_hole_size: e.target.value
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

  clear = () => {
    this.setState({
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
      leg_square_count: 0,
      leg_circle_count: 0,
      weight: '',
      weight_unit: 't', // unit: t, kg
      power: '', //受力 N/mm2
      real_area: '', // m2
      total_area: '',
      block_number: '',
      roll_number: ''
    })
  }

  calculate = () => {
    const weight_kg = convert(this.state.weight).from(this.state.weight_unit).to('kg')
    // if it is full_cover(满铺)
    const full_cover_area = convert(this.state.full_cover_length).from(this.state.full_cover_unit).to('cm') * convert(this.state.full_cover_width).from(this.state.full_cover_unit).to('cm')
    let hole_area = 0
    console.log(this.state.hole_array)
    this.state.hole_array.forEach(element => {
      hole_area = hole_area + (element.shape === 'circle' ? 0.25 * Math.PI * element.diameter * element.diameter : element.length * element.width)
    })
    console.log(`hole_area: ${hole_area} cm2`)

    // if it has legs(支座)
    const legs_area = this.state.leg_length * this.state.leg_width * this.state.leg_square_count + 0.25 * Math.PI * this.state.leg_diameter * this.state.leg_circle_count
    console.log(`legs_area: ${legs_area} cm2`) // cm2
    // result
    const total_area = this.state.full_cover ? full_cover_area : legs_area  // cm2
    //console.log(`total_area: ${total_area} cm2`)
    const real_area = this.state.full_cover ? full_cover_area - hole_area : legs_area // cm2
    // console.log(`real_area: ${real_area} cm2`)
    const power = weight_kg / (this.state.full_cover ? real_area : legs_area) // N/mm2 = kg/cm2
    const block_number = (this.state.full_cover ? full_cover_area : legs_area) / (1.15 * 1.5 * 10000)
    const roll_number = (this.state.full_cover ? full_cover_area : legs_area) / (1.15 * 5 * 10000)

    this.setState({
      power: power,
      total_area: total_area / 10000,
      real_area: real_area / 10000,
      block_number: block_number,
      roll_number: roll_number
    })
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
            bolt_hole_size={this.state.bolt_hole_size}
            bolt_hole_number={this.state.bolt_hole_number}
            leg_length={this.state.leg_length}
            leg_width={this.state.leg_width}
            leg_diameter={this.state.leg_diameter}
            leg_square_count={this.state.leg_square_count}
            leg_circle_count={this.state.leg_circle_count}
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
            onBoltHoleChange={this.onBoltHoleChange}
          />
          <div className='flex-space-between-button'>
            <Button onClick={this.clear}>清空</Button>
            <Button type='primary' onClick={this.calculate}>计算</Button>
          </div>

          <h3 className='h3-header'>3.结果</h3>
          <StepThree
            power={this.state.power}
            total_area={this.state.total_area}
            real_area={this.state.real_area}
            block_number={this.state.block_number}
            roll_number={this.state.roll_number}
          />

          <h3 className='h3-header'>4.材料选择</h3>
          <StepFour power={this.state.power}/>
        </div>
      </div>
    );
  }
}

export default App
