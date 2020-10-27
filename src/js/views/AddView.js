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
                <div class="btn-group" id="form-button-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-secondary" id="add-additional-button">+</button>
                  <button type="submit" class="btn btn-primary" id="add-button">Submit</button>
                </div>
            </form>`;

    return view;
  }

  static getAdditionalFormGroupNode(number) {
    var template = document.createElement("template");
    template.innerHTML = `<div class="additional-attribute">
                            <div class="form-group">
                              <label>Additional Attribute #${number}</label>
                              <input type="text" class="form-control" id="key-input" placeholder="Enter additional attribute #${number}">
                            </div>
                            <div class="form-group">
                              <label>Value of attribute #${number}</label>
                              <input type="text" class="form-control" id="value-input" placeholder="Enter value of additional attribute #${number}">
                            </div>
                          </div>`;
    return template.content.firstChild;
  }
}

export default AddView;
