import { Button, Form, Icon, Select, Tooltip } from 'antd'
import React from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withStyles } from 'material-ui'
import styles from '../../../style'

const Option = Select.Option

const FormItem = Form.Item

const BotRulesForm = inject('rulesConfigStore')(
	observer(
		Form.create({
			onFieldsChange(props, changedFields) {
				props.onChange(changedFields)
			},

			mapPropsToFields(props) {
				const fields = Object.getOwnPropertyNames(toJS(props.rulesConfigStore.formRulesFilter.fields))
				const resultFields = {}
				fields.forEach(
					field =>
						(resultFields[field] = Form.createFormField({
							...props[field],
							value: toJS(props[field].value),
						})),
				)

				return resultFields
			},
		})(props => {
			const { getFieldDecorator } = props.form
			const { classes, loadedData, onSubmit } = props

			const handleSubmit = e => {
				e.preventDefault()
				props.form.validateFields((err, values) => {
					if (!err) {
						onSubmit()
					}
				})
			}

			return (
				<Form layout="inline" onSubmit={handleSubmit} className={classes.form}>
					<FormItem label="Rule types">
						{getFieldDecorator('ruleType', {
							rules: [{ required: true, message: 'Пожалуйста, выберите тип правил!' }],
						})(
							<Select allowClear showSearch optionFilterProp="children">
								{loadedData.ruleTypes &&
									loadedData.ruleTypes.length > 0 &&
									loadedData.ruleTypes.map(item => (
										<Option key={item.id} value={item.id}>
											{item.rule_type}
										</Option>
									))}
							</Select>,
						)}
					</FormItem>

					<div className={classes.controlButtonsWrap}>
						<FormItem>
							<Tooltip placement="bottomLeft" title="Загрузить данные">
								<Button type="primary" htmlType="submit">
									<Icon type="sync" theme="outlined" />
								</Button>
							</Tooltip>
						</FormItem>
					</div>
				</Form>
			)
		}),
	),
)

export default withStyles(styles, { withTheme: true })(BotRulesForm)
