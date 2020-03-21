import Model from '../model/Model'
import View from '../view/View'

class Controller {
    constructor() {
        console.log('Hello')
        const model = new Model()
        const view = new View()
    }
}

export default Controller