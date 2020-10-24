class OverviewView {
    
    getView() {
        
        if (this.view === undefined) {
            this.buildView();
        }

        return this.view;
        
    }
    
    buildView() {
        this.view = "<h1>Overview</h1>"

        
    }

}

export default OverviewView;