export const ENTITIES = [
		{ entity_variable: 'PN', entity_type: 'array', entity_name: 'Poker Network', value: 'PPP,PM', id: 1 },
		{ entity_variable: 'MAX_TIME', entity_type: 'number', entity_name: 'Maximum time', value: null, id: 4 },
		{ entity_variable: 'MAX_HANDS', entity_type: 'number', entity_name: 'Maximum hand', value: null, id: 5 },
		{ entity_variable: 'MAINTENANCE', entity_type: 'array', entity_name: 'Maintenance', value: 'Sib,VSD', id: 3 }
	]

export const RULES = [
		{ output: 'seat', rule_name: 'dsdsfsdf', rule_string: 'MAX_HANDS || MAX_TIME', id: 1, priority: 2 },
		{ output: 'seat', rule_name: '1qa', rule_string: 'PN', id: 1, priority: 1 },
		{
			output: 'seat',
			rule_name: 'Test_namete',
			rule_string: '( MAX_HANDS || MAX_TIME ) || MAINTENANCE',
			id: 1,
			priority: 3,
		},
		{ output: "don't seat", rule_name: 'Te123123', rule_string: 'PN & MAX_TIME', id: 3, priority: 4 },
		{ output: "don't seat", rule_name: 'Te123123', rule_string: '( PN || MAX_TIME ) & MAX_HANDS', id: 3, priority: 0 }
	]

export const OUTPUTS = [
		{ id: 1, value: 'seat', rule_type_id: 1 },
		{ id: 2, value: 'trow', rule_type_id: 2 },
		{ id: 3, value: "don't seat", rule_type_id: 1 },
		{ id: 4, value: "don't throw", rule_type_id: 2 }
	]

export const RULES_TYPES = [{ rule_type: 'pre_open', id: 1 }, { rule_type: 'game', id: 2 }]

