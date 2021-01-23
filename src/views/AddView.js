class AddView {
  getView() {
    if (this.view === undefined) {
      this.buildView();
    }

    return this.view;
  }

  buildView() {
    this.view = "<h1>Add</h1>";
  }
}

export default AddView;
