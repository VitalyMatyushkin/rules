import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { inject, observer } from 'mobx-react'

import Rules from './components/Rules'

@inject('rulesConfigStore')
@observer
class RulesConfigurator extends React.Component {

	componentDidMount = () => {
		this.props.rulesConfigStore.loadSelectsData()
	}

	render() {
		return <Rules />
	}
}

export default DragDropContext(HTML5Backend)(RulesConfigurator)
