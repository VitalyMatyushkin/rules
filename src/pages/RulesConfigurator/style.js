const newLineDropColor = '#1890ff'

export default theme => ({
	root: theme.root,
	form: {
		...theme.formHorizontal,
	},
	fieldMulti: {
		width: 150,
		margin: '0 15px',
		'& .ant-select-selection': {
			overflowY: 'auto',
			width: 150,
			maxHeight: 50,
			marginTop: 4,
		},
		'& .ant-radio-group': {
			lineHeight: 'normal',
		},
		'& .ant-form-extra': {
			paddingTop: 0,
		},
	},
	fieldTextMin: {
		width: 90,
		margin: '0 15px',
	},
	fieldCalendar: {
		minWidth: 250,
		maxWidth: 250,
	},
	controlButtonsWrap: {
		marginTop: 38,
	},
	drop_over_downward: {
		'& td': {
			borderBottom: `2px dashed ${newLineDropColor} !important`,
		},
	},
	drop_over_upward: {
		'& td': {
			borderTop: `2px dashed ${newLineDropColor} !important`,
		},
	},
	filterSearchWrap: {
		padding: '7px 8px',
		overflow: 'hidden',
		borderTop: '1px solid #e8e8e8',
		textAlign: 'center',
		'& span': {
			color: '#1890ff',
			margin: '0 5px',
			cursor: 'pointer',
		},
	},
	filterWrap: {
		width: 200,
		'& .ant-select': {
			width: '100%',
		},
	},
})
