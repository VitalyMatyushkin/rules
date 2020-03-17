import React from 'react'
import { inject, observer } from 'mobx-react'
import RuleForm from './RuleForm'
import ConstructorForm from './ConstructorForm'
import { Divider } from 'antd'
import ModalBackoutScreen from '../../../../../../components/ModalBackoutScreen'

interface IPropsModalContainer {
	rulesConfigStore?: any
}

@inject('rulesConfigStore')
@observer
class ModalContainer extends React.Component<IPropsModalContainer> {
	render() {
		const { hideModal, visibleModal, isLoadRowData, editDataForm } = this.props.rulesConfigStore

		return (
			<ModalBackoutScreen
				isDataLoad={isLoadRowData}
				title={`Добавить правило`}
				visible={visibleModal}
				onOk={() => hideModal()}
				onCancel={() => hideModal()}
				footer={null}
				destroyOnClose={true}
				width={1200}
			>
				<ConstructorForm />

				<Divider />

				<RuleForm editDataForm={editDataForm} />
			</ModalBackoutScreen>
		)
	}
}

export default ModalContainer
