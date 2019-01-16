import React, { Component } from 'react'
import { Form, Input, Select, Radio, Button } from 'antd'
import 'antd/dist/antd.css'
import './App.css'

const RadioGroup = Radio.Group

class StepTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hole_shape: 'circle'
    }
  }

  onHoleShapeChange = (e) => {
    this.setState({
      hole_shape: e.target.value,
    })
  }
  render() {
    const Option = Select.Option
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const selectAfter = (
      <Select value={this.props.full_cover_unit} onChange={this.props.changeFullCoverUnit} >
        <Option value="m">m</Option>
        <Option value="cm">cm</Option>
      </Select>
    )

    const selectAfterWeight = (
      <Select value={this.props.weight_unit} onChange={this.props.changeWeightUnit} >
        <Option value="t">t</Option>
        <Option value="kg">kg</Option>
      </Select>
    )
    return (
      <div>
        {this.props.full_cover &&
          <div>
            <Form.Item
              {...formItemLayout}
              label="长度"
            >
              <Input
                name='full_cover_length'
                type='number'
                addonAfter={selectAfter}
                value={this.props.full_cover_length}
                onChange={this.props.onChange} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="宽度"
            >
              <Input
                name='full_cover_width'
                type='number'
                addonAfter={selectAfter}
                value={this.props.full_cover_width}
                onChange={this.props.onChange} />
            </Form.Item>
          </div>
        }

        {!this.props.full_cover &&
          <div>
            <Form.Item
              {...formItemLayout}
              label="开孔"
            >
              <RadioGroup onChange={this.onHoleShapeChange} value={this.state.hole_shape}>
                <Radio value='circle'>圆</Radio>
                <Radio value='square'>方形</Radio>
              </RadioGroup>
              <Button
                size='small'
                shape="circle"
                icon="plus"
                onClick={() => this.props.addHole(this.state.hole_shape)} />
            </Form.Item>
            {this.props.legs.map((element, index) => {
              return (
                <React.Fragment key={element.id}>

                  <Form.Item
                    key={element.id}
                    {...formItemLayout}
                    label={element.shape === 'circle' ? '直径' : '长度'}
                  >
                    <Input
                      name=''
                      type='number'
                      addonAfter={'cm'}
                      value={element.shape === 'circle' ? element.diameter : element.length}
                      onChange={(e) => this.props.onLegDimensionChange(e, element.id, element.shape === 'circle' ? 'diameter' : 'length')} />
                    {element.shape === 'circle' &&
                      <Button
                        size='small'
                        type='danger'
                        shape="circle"
                        icon="minus"
                        onClick={() => this.props.deleteHole(element.id)} />}
                  </Form.Item>

                  {element.shape === 'square' &&
                    <Form.Item
                      key={element.id + 1}
                      {...formItemLayout}
                      label={'宽度'}
                    >
                      <Input
                        name=''
                        type='number'
                        addonAfter={'cm'}
                        value={element.width}
                        onChange={(e) => this.props.onLegDimensionChange(e, element.id, 'width')} />
                      <Button
                        size='small'
                        type='danger'
                        shape="circle"
                        icon="minus"
                        onClick={() => this.props.deleteHole(element.id)} />
                    </Form.Item>
                  }
                </React.Fragment>
              )
            })}
          </div>
        }

        <Form.Item
          {...formItemLayout}
          label="重量"
        >
          <Input
            name='weight'
            type='number'
            addonAfter={selectAfterWeight}
            value={this.props.weight}
            onChange={this.props.onChange} />
        </Form.Item>
      </div>
    )
  }
}
export default StepTwo
