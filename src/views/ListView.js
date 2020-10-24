class ListView {
    
    getView() {
        
        if (this.view === undefined) {
            this.buildView();
        }

        return this.view;
        
    }
    
    buildView() {
        this.view = "<h1>List</h1>"

        
    }

}

export default ListView;