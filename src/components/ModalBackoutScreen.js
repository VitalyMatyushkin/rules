import React from 'react'
import { withStyles } from 'material-ui'
import { Icon, Modal } from 'antd'

const style = theme => ({
	backoutScreen: {
		width: '100%',
		height: '100%',
		position: 'fixed',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
		margin: 'auto',
		backgroundColor: 'rgba(0,0,0,.65)',
	},
	closeScreen: {
		color: 'rgb(255, 255, 255)',
		position: 'absolute',
		fontSize: 35,
		right: 20,
		top: 70,
		cursor: 'pointer',
	},
})

export default withStyles(style)(props => {
	const { visible, isDataLoad, classes, onCancel } = props

	return (
		<>
			{visible &&
				(!isDataLoad ? (
					<Modal {...props}>{props.children}</Modal>
				) : (
					<div className={classes.backoutScreen}>
						<Icon className={classes.closeScreen} type="close-square" onClick={onCancel} />
					</div>
				))}
		</>
	)
})
