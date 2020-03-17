import { Button, Form, Input, Icon, Row, Col, Tooltip, InputNumber, Select } from 'antd'
import React from 'react'
import { withStyles, WithStyles } from 'material-ui'
import { inject, observer } from 'mobx-react'

import { MODAL_MODE } from '../../../../helper'

const FormItem = Form.Item

interface IPropsRuleForm extends WithStyles {
	rulesConfigStore?: any
	onSubmit: (values: any) => {}
	isValidConstructor: () => boolean
	form: any
}

@inject('rulesConfigStore')
@observer
class RuleForm extends React.Component<IPropsRuleForm> {
	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { rulesConfigStore, form } = this.props
		const { addRules, updateRules, isValidConstructor, modalMode } = rulesConfigStore

		form.validateFields((err: any, values: any) => {
			if (isValidConstructor() && !err) {
				modalMode === MODAL_MODE.EDIT ? updateRules(values) : addRules(values)
			}
		})
	}

	render() {
		const { classes, form, rulesConfigStore } = this.props
		const { outputs, ruleTypes, rulesCount, formRulesFilter } = rulesConfigStore
		const { getFieldDecorator } = form

		return (
			<Form onSubmit={this.handleSubmit} className={classes.bottomForm}>
				<Row gutter={48}>
					<Col span={8}>
						<Form.Item label="Rule name">
							{getFieldDecorator('rule_name', {
								rules: [{ required: true, message: 'Заполните Rule Name!' }],
							})(<Input />)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="Output">
							{getFieldDecorator('output', {
								rules: [{ required: true, message: 'Выберите Output!' }],
							})(
								<Select allowClear showSearch>
									{outputs &&
										outputs
											.filter(
												(out: any) =>
													out.rule_type_id === formRulesFilter.fields.ruleType.value,
											)
											.map((out: any) => (
												<Select.Option key={out.id} value={out.id}>
													{out.value}
												</Select.Option>
											))}
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="Priority">
							{getFieldDecorator('priority', {})(<InputNumber min={0} max={rulesCount - 1} />)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={48}>
					<Col>
						<Form.Item label="Description">
							{getFieldDecorator('description', {})(<Input.TextArea rows={3}></Input.TextArea>)}
						</Form.Item>
					</Col>
				</Row>

				<FormItem className={classes.formControl}>
					<Tooltip placement="bottomLeft" title="Загрузить данные">
						<Button type="primary" htmlType="submit">
							<Icon type="sync" theme="outlined" />
						</Button>
					</Tooltip>
				</FormItem>
			</Form>
		)
	}
}

const style = (theme: any) => ({
	bottomForm: {
		width: '60%',
		margin: '20px auto',
		'& .ant-select': {
			width: '100%',
		},
		'& .ant-input-number': {
			width: '100%',
		},
	},
	formControl: {
		textAlign: 'center',
	},
})

export default (Form as any).create({
	name: 'RuleForm',
	mapPropsToFields(props: any) {
		if (props.editDataForm) {
			return {
				output: Form.createFormField({
					...props.editDataForm.output_id,
					value: props.editDataForm.output_id,
				}),
				rule_name: Form.createFormField({
					...props.editDataForm.rule_name,
					value: props.editDataForm.rule_name,
				}),
				priority: Form.createFormField({
					...props.editDataForm.priority,
					value: props.editDataForm.priority,
				}),
				description: Form.createFormField({
					...props.editDataForm.description,
					value: props.editDataForm.description,
				}),
			}
		}
	},
})(withStyles(style as any)(RuleForm))
