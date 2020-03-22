import Model from '../model/Model'
import View from '../view/View'

class Controller {
    constructor(configPath) {
        this.model = new Model()
        this.view = new View()

        this.loadConfig(configPath)
        this.startCli()
    }

    loadConfig(configPath) {
        this.config = this.model.loadConfigJson(configPath)
        console.log('INFO: ' + configPath + ' has been successfully loaded.')
    }

    async startCli() {
        console.log('INFO: Starting CLI...')

        if (!this.config['json_path'] || this.config['json_path'] === '') {
            this.view.showInitMenu()
        }

        const mainMenu = this.model.buildMainMenu()
        const response = await this.view.runMainMenu(mainMenu)

        console.log(response)
    }

    loadJson(jsonPath) {
        this.model.loadJson(jsonPath)
    }

}

export default Controller