import React from 'react'
import { Select } from 'antd'
import _ from 'lodash'

export const MODAL_MODE = {
	ADD: 'ADD',
	EDIT: 'EDIT',
}

export const CONSTRUCTOR_ITEM_TYPES = {
	OPERATOR: 'operator',
	ENTITY: 'entity',
}

export const OPERATOR_TYPES = {
	ARRAY: 'array',
	NUMBER: 'number',
}

export const OPERATORS_ARRAY = ['in']
export const OPERATORS_NUMBER = ['>', '<', '==']

export const columnsRules = (classes, filterData) => [
	{
		title: 'Rule name',
		dataIndex: 'rule_name',
		key: 'rule_name',
		width: 150,
	},
	{
		title: 'Rule string',
		dataIndex: 'rule_string',
		key: 'rule_string',
		width: 150,
		...getColumnStringSelectProps('rule_string', classes, filterData.entities),
	},
	{
		title: 'Output',
		dataIndex: 'output',
		key: 'output',
		width: 150,
	},
]

const getColumnStringSelectProps = (field, classes, filterSelectData) => ({
	filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
		return (
			<div className={classes.filterWrap}>
				<Select
					mode="multiple"
					onChange={val => setSelectedKeys(val ? [val] : [])}
					placeholder={field}
					onBlur={confirm}
					value={selectedKeys[0]}
				>
					{filterSelectData.map(data => (
						<Select.Option key={data.id} value={data.entity_variable}>
							{data.entity_variable}
						</Select.Option>
					))}
				</Select>
				<div className={classes.filterSearchWrap}>
					<span onClick={() => confirm()}>ОК</span>
					<span onClick={() => clearFilters()}>Reset</span>
				</div>
			</div>
		)
	},
	onFilter: (value, record) =>
		value
			.map(
				v =>
					record[field] &&
					record[field]
						.toString()
						.toLowerCase()
						.includes(v.toLowerCase()),
			)
			.reduce((a, b) => a && b),
})

export const prepareForm = (value, ruleType) => ({
	rule_name: value.rule_name,
	output: value.output,
	rule_type: ruleType,
	priority: value.priority ? value.priority : null,
	description: value.description ? value.description : null,
})

export const prepareConstructor = constructorItems => {
	const entities = []
	const resultStr = constructorItems
		.map(item => {
			switch (item.type) {
				case CONSTRUCTOR_ITEM_TYPES.OPERATOR:
					return item.data.value
				case CONSTRUCTOR_ITEM_TYPES.ENTITY:
					entities.push({
						name: item.data.entity_variable,
						operator: item.operator,
						type: item.data.entity_type,
						value: Array.isArray(item.value) ? item.value.join(',') : item.value,
					})
					return item.data.entity_variable
				default:
					return null
			}
		})
		.join(' ')

	return {
		resultStr: resultStr,
		entities: entities,
		form_data: _.escape(JSON.stringify(constructorItems)),
		// test: JSON.parse(_.unescape(_.escape(JSON.stringify(constructorItems)))),
	}
}

export const unescapeForm = form => JSON.parse(_.unescape(form))

export const validateConstructor = constructorItems => {
	let brackets = []
	let errors = {
		operators: [],
		entities: [],
	}
	let entitiesCount = 0
	constructorItems = constructorItems.map((item, index) => {
		if (item.type === 'operator') {
			const operator = item.data.value
			if (operator === '(' || operator === ')') {
				if (operator === ')' && brackets.length > 0 && brackets[brackets.length - 1] === '(') {
					if (
						constructorItems[index - 1] &&
						constructorItems[index - 1].type === 'operator' &&
						constructorItems[index - 1].data.value === '('
					) {
						errors.operators.push('Между скобками должна находиться сущность.')
					}
					brackets.pop()
				} else {
					switch (true) {
						case (operator === '(' && brackets.length > 0 && brackets[brackets.length - 1] === '(') ||
							(operator === ')' && brackets.length > 0 && brackets[brackets.length - 1] === ')'):
							errors.operators.push(`Нельзя делать вложенные скобки.`)
							break
						case operator === '(' &&
							constructorItems[index - 1] &&
							constructorItems[index - 1].type === 'operator' &&
							constructorItems[index - 1].data.value === ')':
							errors.operators.push(`Между ")" и "(" должен идти оператор "||" или "&".`)
							break
						default:
							break
					}
					brackets.push(operator)
				}
			}

			if (operator === '!') {
				switch (true) {
					case constructorItems[index - 1] &&
						constructorItems[index - 1].type === 'operator' &&
						constructorItems[index - 1].data.value === '!':
						errors.operators.push('Использовать "!!" излишне. Это равнозначно их отсутствию')
						break
					case constructorItems[index - 1] &&
						constructorItems[index - 1].type === 'operator' &&
						constructorItems[index - 1].data.value === ')':
						errors.operators.push('Оператор "!" не может идти после ")".')
						break
					case constructorItems[index + 1] &&
						(constructorItems[index + 1].type === 'operator' &&
							(constructorItems[index + 1].data.value === '||' ||
								constructorItems[index + 1].data.value === '&' ||
								constructorItems[index + 1].data.value === ')')):
						errors.operators.push('После "!" не могут идти "||", "&", или ")".')
						break
					default:
						break
				}
			}

			switch (true) {
				case index === constructorItems.length - 1 && operator !== '(' && operator !== ')':
					errors.operators.push('Выражение не может оканчиваться оператором "!", "||", "&".')
					break
				case constructorItems[index - 1] &&
					constructorItems[index - 1].type === 'operator' &&
					operator !== '!' &&
					operator !== '(' &&
					operator !== ')' &&
					constructorItems[index - 1].data.value !== '!' &&
					constructorItems[index - 1].data.value !== '(' &&
					constructorItems[index - 1].data.value !== ')':
					errors.operators.push('Не могут идти подряд несколько операторов "||" или "&".')
					break
				case (operator === '&' || operator === '||') && index === 0:
					errors.operators.push('Выражение не может начинаться с "||" или "&".')
					break
				default:
					break
			}
		}

		if (item.type === 'entity') {
			entitiesCount += 1

			item = {
				...item,
				error: {
					operator: typeof item.operator === 'undefined' || item.operator.length === 0,
					value: typeof item.value === 'undefined' || item.value.length === 0,
				},
			}

			if (
				(constructorItems[index - 1] && constructorItems[index - 1].type === 'entity') ||
				(constructorItems[index - 1] &&
					constructorItems[index - 2] &&
					constructorItems[index - 1].type === 'operator' &&
					constructorItems[index - 1].data.value !== '||' &&
					constructorItems[index - 1].data.value !== '&' &&
					constructorItems[index - 2].type === 'entity')
			) {
				errors.entities.push(
					`Между двумя любыми сущностями должен стоять оператор "||" или "&" (${(constructorItems[index - 1]
						.type === 'entity' &&
						constructorItems[index - 1].data.entity_name) ||
						(constructorItems[index - 2].type === 'entity' &&
							constructorItems[index - 2].data.entity_name)} - 
                        ${constructorItems[index].data.entity_name}).`,
				)
			}

			if (
				constructorItems[index - 1] &&
				constructorItems[index - 1].type === 'operator' &&
				(constructorItems[index - 1].data.value === '(' ||
					(constructorItems[index - 1].data.value === '!' &&
						constructorItems[index - 2] &&
						constructorItems[index - 2].type === 'operator' &&
						constructorItems[index - 2].data.value === '(')) &&
				constructorItems[index + 1] &&
				constructorItems[index + 1].type === 'operator' &&
				constructorItems[index + 1].data.value === ')'
			) {
				errors.entities.push(
					`Скобки вокруг одной сущности излишни (${constructorItems[index].data.entity_name}).`,
				)
			}
		}

		return item
	})

	if (brackets.length > 0) {
		if (brackets.length % 2 === 1) {
			errors.operators.push('Количество открывающихся и закрывающихся скобок должно быть одинаковым.')
		} else {
			errors.operators.push('Проверьте корректность скобок.')
		}
	}

	if (
		constructorItems.forEach(
			item =>
				item.type === 'entity' &&
				(item.error.operator || item.error.value) &&
				errors.entities.push(`Заполните оператор и значение внутри сущности (${item.data.entity_name}).`),
		)
	) {
	}

	if (entitiesCount === 0) {
		errors.entities.push('Выражение должно содержать хотя бы одну сущность.')
	}

	if (constructorItems[0].data.value === '(' && constructorItems[constructorItems.length - 1].data.value === ')') {
		errors.entities.push('Скобки вокруг всего выражения излишни.')
	}

	return { constructorItems, errors }
}
