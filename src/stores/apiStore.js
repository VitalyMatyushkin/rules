import { action, computed, observable, useStrict } from 'mobx'

useStrict(true)

class ApiStore {
    @observable loadingCount

    constructor() {
        this.loadingCount = 0
    }

    @computed
    get loading() {
        return this.loadingCount > 0
    }

    @action
    startLoading() {
        this.loadingCount++
    }

    @action
    stopLoading() {
        this.loadingCount--
    }
}

export default new ApiStore()
