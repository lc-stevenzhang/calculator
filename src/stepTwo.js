import React, { Component } from 'react'
import { Form, Input, Select, Radio, Button, Tag } from 'antd'
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
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
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
      <div className='stepTwo-container' >
        {this.props.full_cover &&
          <div style={{ width: '50%', margin: 'auto' }}>
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

            <Form.Item
              {...formItemLayout}
              label="螺栓孔"
            >
              <RadioGroup onChange={this.props.onBoltHoleChange} value={this.props.bolt_hole_size}>
                <Radio value={'m8'}>M8</Radio>
                <Radio value={'m10'}>M10</Radio>
                <Radio value={'m12'}>M12</Radio>
                <Radio value={'m20'}>M20</Radio>
                <Radio value={'m24'}>M24</Radio>
              </RadioGroup>
              <Input
                name='bolt_hole_number'
                type='number'
                addonAfter={'个'}
                value={this.props.bolt_hole_number}
                onChange={this.props.onChange} />
            </Form.Item>

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

            {this.props.hole_array.map((element, index) => {
              return (
                <React.Fragment key={element.id}>
                  <Form.Item
                    key={element.id}
                    {...formItemLayout}
                    label={element.shape === 'circle' ? '直径' : '长度'}
                  >
                    <div className='flex-space-between'>
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
                    </div>

                  </Form.Item>

                  {element.shape === 'square' &&
                    <div style={{ marginTop: '-20px' }}>
                      <Form.Item
                        key={element.id + 1}
                        {...formItemLayout}
                        label={'宽度'}
                      >
                        <div className='flex-space-between'>
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
                        </div>
                      </Form.Item>
                    </div>
                  }
                </React.Fragment>
              )
            })}
          </div>
        }

        {!this.props.full_cover &&
          <div style={{ width: '100%', margin: 'auto' }}>
            <div className='flex-space-between'>
              <Tag>方形支座</Tag>
              <Input
                name='leg_length'
                type='number'
                addonBefore={'长'}
                addonAfter={'cm'}
                value={this.props.leg_length}
                onChange={this.props.onChange} />
              <Input
                name='leg_width'
                type='number'
                addonBefore={'宽'}
                addonAfter={'cm'}
                value={this.props.leg_width}
                onChange={this.props.onChange} />
              <Input
                name='leg_square_count'
                type='number'
                addonBefore={'个数'}
                value={this.props.leg_square_count}
                onChange={this.props.onChange} />
            </div>

            <div className='flex-space-between'>
              <Tag>圆形支座</Tag>
              <Input
                name='leg_diameter'
                type='number'
                addonBefore={'直径'}
                addonAfter={'cm'}
                value={this.props.leg_diameter}
                onChange={this.props.onChange} />
              <Input
                name='leg_circle_count'
                type='number'
                addonBefore={'个数'}
                value={this.props.leg_circle_count}
                onChange={this.props.onChange} />
            </div>
          </div>
        }
        <div style={{ width: '50%', margin: 'auto' }}>
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
      </div >
    )
  }
}
export default StepTwo
