const { Input } = require('enquirer');

class View {
    constructor() {

    }

    showInitMenu() {

    }

    runMainMenu(mainMenu) {
        const response = mainMenu.run()

        return response
    }

    showLoadJsonPrompt(loadJsonCallback) {
        const prompt = new Input({
            message: 'What is the path to your JSON file?',
            initial: './data/example.json'
        })

        prompt.run()
            .then(answer => loadJsonCallback(answer))
            .catch(console.log)
    }
}

export default View