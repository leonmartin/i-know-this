const { prompt } = require('enquirer');

class MainMenu {
    constructor() {
        this.mainMenuCallbacks = this.getMainMenuCallbacks()
    }

    run() {
        const response = prompt({
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        })

        return response
    }

    getMainMenuCallbacks() {

        function handleLoadJson() {

        }

        function handleCreateEntry() {

        }

        function handleSearchEntry() {

        }

        function handleDeleteEntry() {

        }

        function handleQuit() {

        }

        return {
            'Load JSON': handleLoadJson,
            'Create Entry': handleCreateEntry,
            'Search Entry': handleSearchEntry,
            'Delete Entry': handleDeleteEntry,
            'Quit': handleQuit
        }
    }

}

module.exports = MainMenu