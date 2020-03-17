import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import EntityComponent from './EntityComponent'
import { withStyles, WithStyles } from 'material-ui'
import { Button, Row, Col } from 'antd'
import classNames from 'classnames'
import { IOperator, IEntitie, IConstructorItem } from '../../../../../../stores/RulesConfigStore'

import { CONSTRUCTOR_ITEM_TYPES } from '../../../../helper'

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const removeItem = (list: any, index: number) => {
	const result = Array.from(list)
	result.splice(index, 1)
	return result
}

const grid = 8

interface IPropsConstructorForm extends WithStyles {
	rulesConfigStore?: any
}

@inject('rulesConfigStore')
@observer
class ConstructorForm extends Component<IPropsConstructorForm> {
	componentDidMount = () => {
		window.addEventListener('keydown', this.keyHandling)
	}

	componentWillUnmount = () => {
		window.removeEventListener('keydown', this.keyHandling)
	}

	keyHandling = (e: KeyboardEvent) => {
		const { startForPaste, setStartItem, constructorItems, ResponderProvided } = this.props.rulesConfigStore
		if (e.keyCode === 37 && startForPaste > -1) {
			setStartItem(startForPaste - 1)
		}
		if (e.keyCode === 39 && startForPaste < constructorItems.length - 1) {
			setStartItem(startForPaste + 1)
		}
	}

	onDragEnd = (result: DropResult) => {
		const { constructorItems, changeItems } = this.props.rulesConfigStore
		let items: any = []
		// dropped outside the list
		if (!result.destination) {
			items = removeItem(constructorItems, result.source.index)
			changeItems(items)
			return
		}

		items = reorder(constructorItems, result.source.index, result.destination.index)
		changeItems(items)
	}

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	render() {
		const { classes, rulesConfigStore } = this.props
		const {
			setStartItem,
			constructorItems,
			addConstructorOperator,
			addConstructorEntity,
			operators,
			entities,
			startForPaste,
			changeItem,
			errorsConstructor,
		} = rulesConfigStore

		return (
			<React.Fragment>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable" direction="horizontal">
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className={classNames(
									classes.dropWrapper,
									snapshot.isDraggingOver && classes.activeWrapper,
									startForPaste === -1 && classes.activeLeft,
								)}
							>
								{constructorItems.map((item: IConstructorItem, index: number) => (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												onDoubleClick={() => setStartItem(index)}
												className={classNames(
													classes.verticalCenter,
													classes.dragItem,
													index === startForPaste && classes.activeRight,
													snapshot.isDragging && classes.draggingItem,
												)}
											>
												<React.Fragment>
													{item.type === CONSTRUCTOR_ITEM_TYPES.OPERATOR && (
														<div className={classes.operatorBlock}>{item.data.name}</div>
													)}
													{item.type === CONSTRUCTOR_ITEM_TYPES.ENTITY && (
														<EntityComponent
															item={toJS(item)}
															changeItem={changeItem}
															index={index}
														/>
													)}
												</React.Fragment>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<div className={classes.errorMessageWrap}>
					{errorsConstructor.operators.map((mes: string, index: number) => (
						<div key={index}>{mes}</div>
					))}
					{errorsConstructor.entities.map((mes: string, index: number) => (
						<div key={index}>{mes}</div>
					))}
				</div>
				<Row gutter={32} className={classes.keybordsWrap}>
					<Col span={8} className={classes.buttonKeybordOperators}>
						<div>{`Operators`}</div>
						{operators.map((t: IOperator, index: number) => {
							return (
								<Button onClick={() => addConstructorOperator(index)} key={t.name}>
									{t.name}
								</Button>
							)
						})}
					</Col>

					<Col span={16} className={classes.buttonKeybordEntities}>
						<div>{`Entities`}</div>
						{entities.map((t: IEntitie, index: number) => {
							return (
								<Button onClick={() => addConstructorEntity(index)} key={t.entity_name}>
									{t.entity_name}
								</Button>
							)
						})}
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

const style = (theme: any) => ({
	verticalCenter: {
		display: 'flex',
		alignItems: 'center',
	},
	operatorBlock: {
		fontWeight: 700,
	},
	keybordsWrap: {
		marginTop: 15,
		'& button': {
			margin: 5,
		},
	},
	buttonKeybordEntities: {
		'& button': {
			width: 140,
		},
		'& div': {
			textAlign: 'center',
			fontWeight: 700,
			margin: '5px 0',
		},
	},
	buttonKeybordOperators: {
		'& button': {
			width: 45,
		},
		'& div': {
			textAlign: 'center',
			fontWeight: 700,
			margin: '5px 0',
		},
	},
	dragItem: {
		userSelect: 'none',
		padding: grid * 2,
		margin: `0 ${grid}px 0 0`,
		background: `#ccc`,
		position: 'relative',
	},
	activeRight: {
		'&:after': {
			content: ' " " ',
			display: 'block',
			width: 5,
			height: 50,
			right: -6,
			margin: 'auto',
			background: `#FF8E53`,
			position: 'absolute',
			animation: 'blinker 2s linear infinite',
		},
	},
	activeLeft: {
		'&:after': {
			content: ' " " ',
			display: 'block',
			width: 5,
			height: 50,
			left: 0,
			top: 0,
			bottom: 0,
			margin: 'auto',
			background: `#FF8E53`,
			position: 'absolute',
			animation: 'blinker 2s linear infinite',
		},
	},
	'@keyframes blinker ': {
		'50%': {
			opacity: 0,
		},
	},
	draggingItem: {
		background: '#1976D2',
	},
	dropWrapper: {
		border: '1px solid #ccc',
		display: 'flex',
		padding: grid,
		overflow: 'auto',
		position: 'relative',
		minHeight: 70,
	},
	activeWrapper: {
		border: '1px solid #1976D2',
	},
	errorMessageWrap: {
		color: '#ff4444',
		fontSize: 15,
	},
})
export default withStyles(style as any)(ConstructorForm)
