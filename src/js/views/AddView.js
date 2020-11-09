class AddView {
  static renderView() {
    const $mainContainer = document.getElementById("main-container");

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

    $mainContainer.innerHTML = view;
  }

  static bindPlusButtonClick() {
    const $addFormGroupButton = document.getElementById(
      "add-additional-button"
    );

    let counter = 0;

    $addFormGroupButton.addEventListener("click", () => {
      counter++;

      const $form = document.getElementById("add-form");
      const $buttonGroup = document.getElementById("form-button-group");

      const template = document.createElement("template");
      template.innerHTML = `<div class="additional-attribute">
                            <div class="form-group">
                              <label>Additional Attribute #${counter}</label>
                              <input type="text" class="form-control" id="key-input" placeholder="Enter additional attribute #${counter}">
                            </div>
                            <div class="form-group">
                              <label>Value of attribute #${counter}</label>
                              <input type="text" class="form-control" id="value-input" placeholder="Enter value of additional attribute #${counter}">
                            </div>
                          </div>`;

      $form.insertBefore(template.content.firstChild, $buttonGroup);
    });
  }

  static bindAddButtonClick(callback) {
    const $addButton = document.getElementById("add-button");
    $addButton.addEventListener("click", (event) => {
      // prevent default form behavior
      // event.preventDefault();
      callback(this.getValidatedEntry());
    });
  }

  static getValidatedEntry() {
    const entry = {};

    // get category
    const category = document.getElementById("category-input").value;

    // get title
    const title = document.getElementById("title-input").value;
    entry["Title"] = title;

    // iterate over form groups for additional attributes to get other key-value-pairs
    const $additionalAttributes = document.getElementsByClassName(
      "additional-attribute"
    );

    for (let $additionalAttribute of $additionalAttributes) {
      const key = $additionalAttribute.querySelector("#key-input").value;
      const value = $additionalAttribute.querySelector("#value-input").value;

      if (this.isInputValid(key) && this.isInputValid(value)) {
        entry[key] = value;
      }
    }

    const validatedEntry = {};

    // return the entry if category and title are valid
    if (this.isInputValid(category) && this.isInputValid(title)) {
      validatedEntry[category] = entry;
    }

    return validatedEntry;
  }

  static isInputValid(inputString) {
    let isValid = true;

    if (inputString === undefined || inputString === "") isValid = false;

    if (inputString.trim() == "") isValid = false;

    return isValid;
  }
}

export default AddView;
