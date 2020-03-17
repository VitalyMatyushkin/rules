import React from 'react'
import generate from 'shortid'
import { Select, Input } from 'antd'
import { withStyles, WithStyles } from 'material-ui'
import classNames from 'classnames'

import { OPERATOR_TYPES, OPERATORS_ARRAY, OPERATORS_NUMBER } from '../../../../helper'

interface IEntityComponent extends WithStyles {
	item: any
	changeItem: (item: any, index: number) => {}
	index: number
}

const EntityComponent: React.SFC<IEntityComponent> = ({ item, changeItem, index, classes }) => {
	let componentForType
	const { data: entity } = item

	const onChangeOperator = (operator: string) => {
		item.operator = operator
		changeItem(item, index)
	}

	const onChangeValueSelect = (val: string | string[]) => {
		item.value = val
		changeItem(item, index)
	}

	const onChangeValueInput = (e: React.FormEvent<HTMLInputElement>) => {
		item.value = e.currentTarget.value
		changeItem(item, index)
	}

	switch (entity.entity_type) {
		case OPERATOR_TYPES.ARRAY:
			componentForType = (
				<div className={classes.verticalCenter}>
					<Select
						key={`select_array_operat_${generate()}`}
						onChange={onChangeOperator}
						value={item.operator && item.operator}
						className={classNames(classes.operatorSelect, item.error.operator && classes.errorField)}
					>
						{OPERATORS_ARRAY.map(op => (
							<Select.Option key={`${entity.id}_${generate()}_array_operator`} value={op}>
								{op}
							</Select.Option>
						))}
					</Select>
					<Select
						mode="multiple"
						key={`select_array_val_${entity.id}}`}
						onChange={onChangeValueSelect}
						value={item.value && item.value}
						className={classNames(classes.multiSelect, item.error.value && classes.errorField)}
					>
						{entity.value.map((val: any, i: number) => (
							<Select.Option key={`${entity.id}}_array`} value={val}>
								{val}
							</Select.Option>
						))}
					</Select>
				</div>
			)
			break
		case OPERATOR_TYPES.NUMBER:
			componentForType = (
				<div className={classes.verticalCenter}>
					<Select
						key={`select_num_${generate()}`}
						onChange={onChangeOperator}
						value={item.operator && item.operator}
						className={classNames(classes.operatorSelect, item.error.operator && classes.errorField)}
					>
						{OPERATORS_NUMBER.map(op => (
							<Select.Option key={`${entity.id}_${generate()}_num_operator`} value={op}>
								{op}
							</Select.Option>
						))}
					</Select>
					<Input
						key={`${entity.id}_num`}
						type="number"
						onChange={onChangeValueInput}
						value={item.value && item.value}
						className={classNames(classes.inputEntity, item.error.value && classes.errorField)}
					/>
				</div>
			)
			break
		default:
			break
	}

	return (
		<div className={classes.verticalCenter}>
			<div className={classes.entityName}>{`${entity.entity_name} `}</div>
			{componentForType}
		</div>
	)
}

const style = (theme: any) => ({
	verticalCenter: {
		display: 'flex',
		alignItems: 'center',
		' & input::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
		},
	},
	inputEntity: {
		width: 60,
	},
	multiSelect: {
		width: 90,
	},
	operatorSelect: {
		width: 60,
		margin: '0 10px',
	},
	entityName: {
		fontWeight: 700,
	},
	errorField: {
		outline: '2px solid #ff4444',
	},
})

export default withStyles(style as any)(EntityComponent)
