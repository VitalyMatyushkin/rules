import React from 'react'
import { withStyles, WithStyles } from 'material-ui'
import { inject, observer } from 'mobx-react'
import { Button, Popconfirm, Icon } from 'antd'

import ModalContainer from './Modals'
import { MODAL_MODE } from '../../../helper'

interface IPropsControlTableButtons extends WithStyles {
	rulesConfigStore?: any
}

const ControlTableButtons: React.SFC<IPropsControlTableButtons> = inject('rulesConfigStore')(
	observer(({ classes, rulesConfigStore }) => {
		const { changeModalMode, selectedRowKeys, deleteRules } = rulesConfigStore && rulesConfigStore

		return (
			<div className={classes.editButtonWrap}>
				<Button type="primary" onClick={() => changeModalMode(MODAL_MODE.ADD)}>
					<Icon type="plus" /> Добавить
				</Button>
				<Button onClick={() => changeModalMode(MODAL_MODE.EDIT)} disabled={selectedRowKeys.length === 0}>
					<Icon type="edit" /> Редактировать
				</Button>

				<Popconfirm
					placement="bottom"
					title="Вы действительно хотите удалить выбранное правило?"
					onConfirm={deleteRules}
				>
					<Button type="danger" disabled={selectedRowKeys.length === 0}>
						<Icon type="delete" /> Удалить
					</Button>
				</Popconfirm>

				<ModalContainer />
			</div>
		)
	}),
)

const styles = (theme: any) => ({
	editButtonWrap: {
		textAlign: 'center',
		'& button': {
			width: 150,
			margin: '0 5px',
			textAlign: 'center',
		},
	},
})

export default withStyles(styles as any)(ControlTableButtons)
