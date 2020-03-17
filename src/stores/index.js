
import RulesConfigStore from './RulesConfigStore'
import apiStore from './apiStore'

let instance = null
// Экспортируем синглтон, он нам понадобится для инъекций и для прямого доступа из статик методов классов
class stores {
	constructor() {
		if (!instance) {
			instance = this
			this.apiStore = apiStore
			this.rulesConfigStore = new RulesConfigStore()
		}
		return instance
	}
}

export default new stores()
