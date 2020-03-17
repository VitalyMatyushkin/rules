import { createMuiTheme } from 'material-ui/styles'

const tableMainColor = '#e8e8e8'
const tableHeadFontColor = 'rgba(0, 0, 0, 0.85)'
const tableBackgroundColor = 'rgb(255, 255, 255)'
const sortArrowColor = 'rgb(191, 191, 191)'
const reactTableStyle = {
	border: `1px solid ${tableMainColor} !important`,
	fontSize: 14,
	fontFamily: 'Segoe UI',
	'& .rt-thead .rt-tr': {
		borderRight: `1px solid ${tableMainColor}`,
		borderBottom: `1px solid ${tableMainColor}`,
	},
	'& .rt-thead .rt-th': {
		backgroundColor: tableMainColor,
		fontWeight: 500,
		padding: '16px !important',
		borderRight: `1px solid ${tableMainColor}`,
		color: tableHeadFontColor,
		'&:before': {
			content: '"▲"',
			float: 'right',
			color: sortArrowColor,
			fontSize: 9,
			position: 'absolute',
			right: 10,
			top: 16,
		},
		'&:after': {
			content: '"▼"',
			float: 'right',
			color: sortArrowColor,
			fontSize: 9,
			position: 'absolute',
			right: 10,
			top: 24,
		},
	},
	'& .rt-tbody .rt-tr-group .rt-td': {
		backgroundColor: tableBackgroundColor,
		padding: 16,
		borderRight: `1px solid ${tableMainColor}`,
	},
	'& .rt-th.-sort-desc': {
		boxShadow: 'none !important',
	},

	'& .rt-th.-sort-asc': {
		boxShadow: 'none !important',
	},

	'& .rt-resizer': {
		width: 10,
		right: -6,
	},
}

export const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#BBDEFB',
			main: '#1976D2',
			dark: '#0D47A1',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
	root: {
		width: '80%',
		margin: '0 auto',
		'& .subtitle-page': {
			color: 'rgba(0, 0, 0, 0.54)',
			// margin: '5px 0',
			textAlign: 'center',
		},
		'& .ant-table-wrapper': {
			'& .ant-table-thead th': {
				backgroundColor: tableMainColor,
				fontWeight: 500,
				padding: '16px !important',
				borderRight: `1px solid ${tableMainColor}`,
				color: tableHeadFontColor,
			},
			'& .ant-table-header': {
				backgroundColor: tableMainColor,
			},
		},
		'& table thead th': {
			backgroundColor: tableMainColor,
			fontWeight: 500,
			fontSize: 14,
			border: `1px solid ${tableMainColor}`,
			color: tableHeadFontColor,
			fontFamily: 'Segoe UI',
		},
		'& .ReactTable': reactTableStyle,
		'& .inactive-wrapp': {
			pointerУvents: 'none',
		},
		'& .ant-select-selection__clear': {
			top: 0,
			right: 6,
			bottom: 0,
			margin: 'auto',
			'& svg': {
				width: 15,
				height: 15,
			},
		},
	},
	modalWithTable: {
		'& .ReactTable': reactTableStyle,
	},
	//horizontal form

	formHorizontal: {
		display: 'flex',
		// justifyContent: 'safe center',
		margin: 'auto',
		overflow: 'auto',
		height: 130,
		width: 'fit-content',
		maxWidth: '100%',
		'& .ant-form-item': {
			width: 170,
			margin: '0 15px',
			'& input': {
				width: 170,
			},
			'& .ant-select-selection': {
				overflowY: 'auto',
				scrollbarWidth: 'none',
				width: 170,
				maxHeight: 60,
				marginTop: 4,
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				'& .ant-select-arrow': {
					display: 'none',
				},
			},
			'& .ant-radio-group': {
				lineHeight: 'normal',
			},
			'& .ant-form-extra': {
				paddingTop: 0,
			},
			'& .emty-option::first-child': {
				padding: 12,
			},
		},
		'& .ant-form-item.antd-form-calendar': {
			minWidth: 270,
			'& input': {
				width: '44%',
			},
			'& .ant-calendar-picker': {
				width: '270px !important',
			},
		},
		'& .ant-form-item.antd-form-buttons': {
			width: 'auto',
			'& .ant-form-item-children': {
				display: 'flex',
			},
			'& button': {
				marginTop: 42,
				marginLeft: 10,
			},
		},
		'& .ant-form-item.antd-form-long': {
			width: 350,
			margin: '0 15px',
			'& .ant-select-selection': {
				overflowY: 'auto',
				width: 350,
				maxHeight: 50,
				marginTop: 4,
				'& .ant-select-arrow': {
					display: 'none',
				},
			},
			'& .ant-radio-group': {
				lineHeight: 'normal',
			},
			'& .ant-form-extra': {
				paddingTop: 0,
			},
		},
	},

	formVertical: {
		display: 'flex',
		alignItems: 'center',
		overflow: 'auto',
		width: '100%',
		flexDirection: 'column',
		'& .ant-form-item': {
			width: 250,
			'& .ant-select-selection': {
				overflowY: 'auto',
				width: 250,
				'& .ant-select-arrow': {
					display: 'none',
				},
			},
			'& .ant-radio-group, & .ant-form-item-control': {
				lineHeight: 'normal',
			},
			'& .ant-form-extra': {
				paddingTop: 0,
			},
			'& .ant-form-item-label': {
				textAlign: 'left',
				lineHeight: 'normal',
			},
			'& .empty-option': {
				padding: 12,
			},
		},
		'& .ant-form-item.antd-form-buttons': {
			width: 'auto',
			'& .ant-form-item-children': {
				display: 'flex',
			},
			'& button': {
				margin: '0 10px',
			},
		},
		'& .ant-form-item.antd-form-calendar': {
			minWidth: 250,
			'& input': {
				width: 250,
			},
		},
	},
	virtualizedSelect: {
		'& .Select-arrow-zone': {
			display: 'none',
		},
		'& .Select-clear-zone': {
			lineHeight: 'normal',
		},
		'& .Select-clear': {
			borderRadius: 50,
			width: 15,
			fontSize: 15,
			lineHeight: '15px',
			color: 'white',
			'&:hover': {
				backgroundColor: 'rgba(0, 0, 0, 0.298)',
			},
		},
		'& .Select-control': {
			position: 'relative',
			marginTop: 0,
			height: 'auto',
		},
		'& .Select-value': {
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			marginTop: 3,
			color: 'rgba(0, 0, 0, 0.65)',
			fontSize: 14,
			marginRight: 18,
		},
		'& .Select-value-icon': {
			color: 'rgba(0, 0, 0, 0.47)',
			fontSize: 19,
			lineHeight: '19px',
			position: 'absolute',
			top: '-1px',
			right: '-20px',
			backgroundColor: '#fafafa',
			borderTop: '1px solid rgba(0, 126, 255, 0.24)',
			borderBottom: '1px solid rgba(0, 126, 255, 0.24)',
		},
		'& .Select-input': {
			height: 30,
		},
		'& .Select-menu-outer': {
			height: 500,
		},
		'& .Select-multi-value-wrapper': {
			overflow: 'auto',
			display: 'block',
			maxHeight: 58,
			lineHeight: 'normal',
			'&::-webkit-scrollbar': {
				display: 'none',
			},
		},
	},
	virtualizedMultiSelect: {
		'& .Select-arrow-zone': {
			display: 'none',
		},
		'& .Select-clear-zone': {
			lineHeight: 'normal',
		},
		'& .Select-clear': {
			borderRadius: 50,
			width: 15,
			fontSize: 15,
			lineHeight: '15px',
			color: 'white',
			'&:hover': {
				backgroundColor: 'rgba(0, 0, 0, 0.298)',
			},
		},
		'& .Select-control': {
			position: 'relative',
			marginTop: 3,
			height: 'auto',
		},
		'& .Select-value': {
			position: 'relative',
			marginTop: 3,
			backgroundColor: '#fafafa',
			color: 'rgba(0, 0, 0, 0.65)',
			fontSize: 14,
			marginRight: 18,
		},
		'& .Select-value-icon': {
			color: 'rgba(0, 0, 0, 0.47)',
			fontSize: 19,
			lineHeight: '19px',
			position: 'absolute',
			top: '-1px',
			right: '-20px',
			backgroundColor: '#fafafa',
			borderTop: '1px solid rgba(0, 126, 255, 0.24)',
			borderBottom: '1px solid rgba(0, 126, 255, 0.24)',
		},
		'& .Select-input': {
			height: 30,
		},
		'& .Select-menu-outer': {
			height: 500,
		},
		'& .Select-multi-value-wrapper': {
			overflow: 'auto',
			display: 'block',
			maxHeight: 58,
			lineHeight: 'normal',
			'&::-webkit-scrollbar': {
				display: 'none',
			},
		},
	},
})

const styles = theme => ({
	root: theme.root,
	fullWrapp: {
		width: '100%',
	},
	list: {
		width: 250,
	},
	listFull: {
		width: 'auto',
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	helperContainer: {
		height: 70,
	},
	linearProgress: {
		top: 0,
		left: 'auto',
		right: 0,
		position: 'fixed',
		width: '100%',
		zIndex: 99999,
	},
	icon: {
		fontSize: 20,
		color: 'rgba(0, 0, 0, 0.54)',
	},
	userName: {
		color: 'rgba(0, 0, 0, 0.87)',
		overflow: 'hidden',
		fontSize: '1rem',
		boxSizing: 'content-box',
		fontWeight: 400,
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		lineheight: '1.5em',
	},
})

export default styles
