import React from 'react'
import { inject, observer } from 'mobx-react'

import RulesForm from './RulesForm'

export default inject('rulesConfigStore')(
	observer(({ rulesConfigStore }) => {
		const { formRulesFilter, handleformRulesFilterChange, ruleTypes, outputs, fetchRulesData } = rulesConfigStore
		const fields = formRulesFilter.fields

		return (
			<RulesForm
				{...fields}
				onChange={handleformRulesFilterChange}
				loadedData={{ ruleTypes, outputs }}
				onSubmit={fetchRulesData}
			/>
		)
	}),
)
