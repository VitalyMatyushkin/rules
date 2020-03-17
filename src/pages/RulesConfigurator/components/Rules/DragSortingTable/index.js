import React from 'react'
import { Table } from 'antd'
import { inject, observer } from 'mobx-react'
import { withStyles } from 'material-ui'

import DragableBodyRow from './DragableBodyRow'
import ControlTableButtons from './ControlTableButtons'
import UpdateTableText from '../../../../../components/UpdateTableText'
import { columnsRules, MODAL_MODE } from '../../../helper'
import styles from '../../../style'

@inject('rulesConfigStore')
@observer
class DragSortingTable extends React.Component {
	render() {
		const classes = this.props.classes
		const {
			tableRules,
			onMoveRulesRow,
			selectedRowKeys,
			onSelectRow,
			onDoubleClickRow,
			entities,
		} = this.props.rulesConfigStore
		const tableHeight = document.documentElement.clientHeight - 350
		const rowSelection = { selectedRowKeys, onChange: onSelectRow, type: 'radio' }
		const filterData = { entities }

		return tableRules.isWasLoaded ? (
			<Table
				columns={columnsRules(classes, filterData)}
				dataSource={tableRules.data.slice()}
				title={() => <ControlTableButtons />}
				components={{
					body: {
						row: DragableBodyRow,
					},
				}}
				onRow={(record, index) => {
					return {
						index,
						moveRow: onMoveRulesRow,
						onDoubleClick: () => onDoubleClickRow(index, MODAL_MODE.EDIT),
					}
				}}
				rowSelection={rowSelection}
				pagination={false}
				scroll={{ y: tableHeight }}
				locale={{ emptyText: 'Нет данных' }}
				bordered
			/>
		) : (
			<UpdateTableText />
		)
	}
}

export default withStyles(styles)(DragSortingTable)
