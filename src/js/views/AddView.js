class AddView {
  static getView() {
    let view = `<h1>Add</h1>`;

    view += `<form id="add-form">
                <div class="form-group">
                    <label for="category-input">Category</label>
                    <input type="text" class="form-control" id="category-input" placeholder="Enter category" required>
                </div>
                <div class="form-group">
                    <label for="title-input">Title</label>
                    <input type="text" class="form-control" id="title-input" placeholder="Enter title" required>
                </div>
                <input type="submit" class="btn btn-primary" id="add-button" value="Submit">
            </form>`;

    return view;
  }
}

export default AddView;
