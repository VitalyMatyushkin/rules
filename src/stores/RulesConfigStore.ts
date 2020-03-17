import { IOperator } from './RulesConfigStore'
import { action, observable, runInAction, toJS, computed } from 'mobx'
import apiStore from './apiStore'
import { message } from 'antd'
import update from 'immutability-helper'
import generate from 'shortid'
import {
	validateConstructor,
	MODAL_MODE,
	CONSTRUCTOR_ITEM_TYPES,
	prepareForm,
	prepareConstructor,
	unescapeForm,
} from '../pages/RulesConfigurator/helper'

import {ENTITIES, RULES, OUTPUTS, RULES_TYPES} from '../assets/data'

export interface IOutput {
	id: number,
	value: string
}

export interface IRuleType {
	id: number,
	rule_type: string
}

export interface IEntitie {
	id: number,
	entity_name: string,
	entity_variable: string,
	entity_type: string, //строка, массив и т.п.
	value: any
}

export interface IRuleRow {
	id: number,
	rule_name: string,
	rule_string: string,
	output: string,
	priority: number
}

export interface ITools {
	type: string,
	name: string,
	value: any,
	entityType?: string
}

export interface IOperator {
	type: string,
	name: string,
	value: string
}

interface IRuleFormResult {
	description: string,
	output: number,
	priority: number,
	rule_name: string
}

export interface IConstructorItem {
	data: {
		entity_variable?: string,
		entity_type?: string,
		entity_name?: string,
		name?: string,
		type?: string,
		id?: number,
		value: any
	}
	error?: {
		operator: boolean,
		value: boolean,
	}
	id: string,
	operator?: string,
	type: string,
	value?: any
}

export default class RulesConfigStore {
	@observable outputs: IOutput[] = []
	@observable ruleTypes: IRuleType[] = []
	@observable entities: IEntitie[] = []

	@observable tableRules: { isLoad: boolean; data: IRuleRow[]; isWasLoaded: boolean } = {
		isLoad: false,
		data: [],
		isWasLoaded: false,
	}

	@observable selectedRowKeys = []
	@observable editRowData: any = null
	@observable isLoadRowData: boolean = false

	@action onSelectRow = (selectedRowKeys: any) => {
		this.selectedRowKeys = selectedRowKeys
	}

	@computed
	get rulesCount() {
		return this.tableRules.data.length
	}

	@action fetchRulesData = async () => {
		apiStore.startLoading()
		this.tableRules.isLoad = true

		const id = this.formRulesFilter.fields.ruleType.value

		try {
			// const response = await api.getConstructorRulesByType(id)
			const response = RULES
			if (response) {
				runInAction(() => {
					this.tableRules.data = response
						.sort((a: IRuleRow, b: IRuleRow) => Number(a.priority) - Number(b.priority))
						.map((d: IRuleRow) => ({ ...d, key: d.priority }))
				})
			} else {
				message.error('Не удалось загрузить правила.')
			}
			runInAction(() => {
				this.tableRules.isLoad = false
				this.tableRules.isWasLoaded = true
				this.selectedRowKeys = []
			})
			apiStore.stopLoading()
			return response
		} catch (error) {
			runInAction(() => {
				this.tableRules.isLoad = false
			})
			message.error('Не удалось загрузить правила.')
			apiStore.stopLoading()
		}
	}

	@action fetchRulesRow = async (id: number) => {
		this.isLoadRowData = true

		// try {
		// 	const response = await api.getConstructorRule(id)
		// 	if (response) {
		// 		runInAction(() => {
		// 			const { form_data, ...rest } = response
		// 			this.constructorItems = form_data ? unescapeForm(form_data) : []
		// 			this.editDataForm = rest
		// 		})
		// 	} else {
		// 		message.error('Не удалось загрузить правило.')
		// 	}
		// 	runInAction(() => {
		// 		this.isLoadRowData = false
		// 	})
		// 	apiStore.stopLoading()
		// 	return response
		// } catch (error) {
		// 	runInAction(() => {
		// 		this.isLoadRowData = false
		// 	})
		// 	message.error('Не удалось загрузить правило.')
		// 	apiStore.stopLoading()
		// }
	}

	@action onMoveRulesRow = async (dragIndex: any, hoverIndex: any) => {
		const { data } = this.tableRules
		const dragRow: any = data[dragIndex]
		const dropRow: any = data[hoverIndex]

		const helpRowPriority = (dropRow as any).priority

		this.tableRules = update(toJS(this.tableRules) as any, {
			data: {
				$splice: [[dragIndex, 1], [hoverIndex, 0, { ...dragRow, priority: helpRowPriority }]],
			},
		})

		this.tableRules.data = (this.tableRules as any).data.map((d: any, i: number) => {
			return { ...(d as any), priority: i }
		})

		const id = dragRow.id
		await this.changePriority(dragIndex, hoverIndex, id)
	}

	@observable formRulesFilter = {
		fields: {
			ruleType: { value: '' },
		},
	}

	@action
	handleformRulesFilterChange = (changedFields: any) => {
		this.formRulesFilter.fields = { ...toJS((this.formRulesFilter as any).fields), ...changedFields }
	}

	@action loadSelectsData = async () => {
		await Promise.all([this.fetchOutputs(), this.fetchRuleTypes(), this.fetchEntities()])
	}

	@action fetchOutputs = async () => {
		apiStore.startLoading()

		try {
			// const response = await api.getConstructorOutputs()
			const response = OUTPUTS

			if (response) {
				runInAction(() => {
					this.outputs = response
				})
			} else {
				message.error('Не удалось загрузить Outputs.')
			}
			apiStore.stopLoading()
			return response
		} catch (error) {
			message.error('Не удалось загрузить Outputs.')
			apiStore.stopLoading()
		}
	}

	@action fetchRuleTypes = async () => {
		apiStore.startLoading()

		try {
			// const response = await api.getConstructorRuleTypes()
			const response = RULES_TYPES
			if (response) {
				runInAction(() => {
					this.ruleTypes = response
				})
			} else {
				message.error('Не удалось загрузить Rule Types.')
			}
			apiStore.stopLoading()
			return response
		} catch (error) {
			message.error('Не удалось загрузить Rule Types.')
			apiStore.stopLoading()
		}
	}

	@action fetchEntities = async () => {
		apiStore.startLoading()

		try {
			// const response = await api.getConstructorEntities()
			const response = ENTITIES
			if (response) {
				runInAction(() => {
					// this.entities = response.map((e: IEntitie) => ({
					this.entities = response.map((e: any) => ({
						...e,
						value: e.value ? e.value.split(',') : null,
					}))
				})
			} else {
				message.error('Не удалось загрузить Entities.')
			}
			apiStore.stopLoading()
			return response
		} catch (error) {
			message.error('Не удалось загрузить Entities.')
			apiStore.stopLoading()
		}
	}
	//----------------------------------------------------------------------------------------------------------------------------------
	//Modal add and edit

	@observable visibleModal = false
	@observable modalMode: string | null = null

	@action showModal = () => (this.visibleModal = true)
	@action hideModal = () => {
		this.visibleModal = false
		this.clearEditDataForm()
	}

	@action changeModalMode = (mode: string) => {
		if (mode === MODAL_MODE.EDIT) {
			const recordId = this.tableRules.data[this.selectedRowKeys[0]].id

			this.fetchRulesRow(recordId)
		}

		this.modalMode = mode
		this.visibleModal = true
	}

	@action onDoubleClickRow = (index: number, mode: string) => {
		this.onSelectRow([index])
		this.changeModalMode(mode)
	}

	@action addRules = async (value: IRuleFormResult) => {
		apiStore.startLoading()
		this.tableRules.isLoad = true
		const dataFromForm = prepareForm(value, this.formRulesFilter.fields.ruleType.value)
		const dataFromConstructor = prepareConstructor(toJS(this.constructorItems))

		const dataToSend = { ...dataFromForm, ...dataFromConstructor }

		// try {
		// 	const response = await api.constructorAddRule(dataToSend)
		// 	if (response) {
		// 	} else {
		// 		message.error('Не удалось добавить правило.')
		// 	}
		// 	apiStore.stopLoading()
		// 	runInAction(() => {
		// 		this.tableRules.isLoad = true
		// 		this.hideModal()
		// 		this.clearEditDataForm()
		// 		this.fetchRulesData()
		// 	})
		// 	return response
		// } catch (error) {
		// 	runInAction(() => {
		// 		this.tableRules.isLoad = true
		// 	})
		// 	message.error('Не удалось добавить правило.')
		// 	apiStore.stopLoading()
		// }
	}

	@action
	updateRules = async (value: IRuleFormResult) => {
		apiStore.startLoading()
		this.tableRules.isLoad = true
		const dataFromForm = prepareForm(value, this.formRulesFilter.fields.ruleType.value)
		const dataFromConstructor = prepareConstructor(toJS(this.constructorItems))
		const ruleId = this.tableRules.data[this.selectedRowKeys[0]].id
		const dataToSend = {
			...dataFromForm,
			...dataFromConstructor,
			id: ruleId,
		}

		// try {
		// 	const response = await api.constructorUpdateRule(dataToSend)
		// 	if (response) {
		// 	} else {
		// 		message.error('Не удалось добавить правило.')
		// 	}
		// 	apiStore.stopLoading()
		// 	runInAction(() => {
		// 		this.tableRules.isLoad = true
		// 		this.hideModal()
		// 		this.clearEditDataForm()
		// 		this.fetchRulesData()
		// 	})
		// 	return response
		// } catch (error) {
		// 	runInAction(() => {
		// 		this.tableRules.isLoad = true
		// 	})
		// 	message.error('Не удалось добавить правило.')
		// 	apiStore.stopLoading()
		// }
	}

	@action
	deleteRules = async () => {
		apiStore.startLoading()
		this.tableRules.isLoad = true
		const ruleId = this.tableRules.data[this.selectedRowKeys[0]].id

		// try {
		// 	const response = await api.constructorDeleteRule(ruleId)
		// 	if (response) {
		// 	} else {
		// 		message.error('Не удалось удалить правило.')
		// 	}
		// 	apiStore.stopLoading()
		// 	runInAction(() => {
		// 		this.tableRules.isLoad = true
		// 		this.fetchRulesData()
		// 	})
		// 	return response
		// } catch (error) {
		// 	runInAction(() => {
		// 		this.tableRules.isLoad = true
		// 	})
		// 	message.error('Не удалось удалить правило.')
		// 	apiStore.stopLoading()
		// }
	}

	@action
	changePriority = async (dragIndex: number, hoverIndex: number, ruleId: number) => {
		apiStore.startLoading()
		this.tableRules.isLoad = true

		const bodyToSend = {
			id: ruleId,
			drag_index: dragIndex,
			hover_index: hoverIndex,
		}
		// try {
		// 	const response = await api.constructorChangePriorityRule(bodyToSend)
		// 	if (response) {
		// 	} else {
		// 		message.error('Не удалось изменить приоритет.')
		// 	}
		// 	apiStore.stopLoading()
		// 	runInAction(() => {
		// 		this.tableRules.isLoad = true
		// 		this.fetchRulesData()
		// 	})
		// 	return response
		// } catch (error) {
		// 	runInAction(() => {
		// 		this.tableRules.isLoad = true
		// 	})
		// 	message.error('Не удалось изменить приоритет.')
		// 	apiStore.stopLoading()
		// }
	}

	//-------------------------------------------------------------------------------------------------------------------------------------

	@observable constructorItems: IConstructorItem[] = []

	@observable editDataForm = {
		rule_name: '',
		output_id: null,
		priority: null,
		description: '',
		rule_type_id: null,
	}

	@observable operators: IOperator[] = [
		{ type: 'operator', name: '(', value: '(' },
		{ type: 'operator', name: ')', value: ')' },
		{ type: 'operator', name: '!', value: '!' },
		{ type: 'operator', name: '&', value: '&' },
		{ type: 'operator', name: '||', value: '||' },
	]

	@observable startForPaste = -1

	@observable errorsConstructor = {
		operators: [] as string[],
		entities: [] as string[],
	}

	@action clearEditDataForm = () => {
		this.editDataForm = {
			rule_name: '',
			output_id: null,
			priority: null,
			description: '',
			rule_type_id: null,
		}
		this.constructorItems = []
		this.errorsConstructor = {
			operators: [] as string[],
			entities: [] as string[],
		}
	}

	@action setStartItem = (index: number) => (this.startForPaste = index)
	@action changeItems = (items: IConstructorItem[]) => (this.constructorItems = items)
	@action changeItem = (item: IConstructorItem, index: number) =>
		(this.constructorItems = (this.constructorItems as any).map((c: any, i: number) => (i === index ? item : c)))

	@action addConstructorOperator = (index: number) => {
		const currentTools: IOperator = this.operators[index]
		const items: IConstructorItem[] = this.constructorItems
		const start = this.startForPaste + 1

		items.splice(start, 0, {
			id: `item_${currentTools.name}_${generate()}`,
			type: CONSTRUCTOR_ITEM_TYPES.OPERATOR,
			data: currentTools,
		})

		this.constructorItems = items
		this.startForPaste = start
	}

	@action addConstructorEntity = (index: number) => {
		const currentEntity: IEntitie = this.entities[index]
		const items: IConstructorItem[] = this.constructorItems
		const start = this.startForPaste + 1

		items.splice(start, 0, {
			id: `item_${currentEntity.entity_variable}_${generate()}`,
			type: CONSTRUCTOR_ITEM_TYPES.ENTITY,
			data: currentEntity,
			error: {
				operator: false,
				value: false,
			},
		})

		this.constructorItems = items
		this.startForPaste = start
	}

	@action isValidConstructor = () => {
		const { constructorItems, errors } = validateConstructor(this.constructorItems)
		this.constructorItems = constructorItems
		this.errorsConstructor = errors

		return errors.operators.length === 0 && errors.entities.length === 0
	}
}
