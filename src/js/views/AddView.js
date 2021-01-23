class AddView {
  static renderView() {
    const view = `<h1>Add</h1>
                <form id="add-form">
                    <div class="form-group">
                      <label for="category-input">Category</label>
                      <input type="text" class="form-control" id="category-input" placeholder="Enter category" required>
                    </div>
                    <div class="form-group">
                      <label for="title-input">Title</label>
                      <input type="text" class="form-control" id="title-input" placeholder="Enter title" required>
                    </div>
                    <div class="btn-group" id="form-button-group" role="group">
                      <button type="button" class="btn btn-secondary" id="add-additional-button">+ Attribute</button>
                      <button type="submit" class="btn btn-primary" id="add-button">Submit</button>
                    </div>
                </form>`;

    const $mainContainer = document.getElementById("main-container");
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

  static bindAddButtonClick(addCallback) {
    const $form = document.getElementById("add-form");
    $form.addEventListener("submit", (event) => {
      // prevent default form behavior, i.e., refresh after submission
      event.preventDefault();
    });

    const $addButton = document.getElementById("add-button");
    $addButton.addEventListener("click", () => {

      const entry = this.getEntry();
      const category = document.getElementById("category-input").value;
      addCallback(category, entry);

      // clear input fields
      const $inputs = document.getElementsByTagName("input");
      for (let $input of $inputs) {
        $input.value = "";
      }
    });
  }

  static getEntry() {
    const entry = {};

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

    return entry;
  }

  static isInputValid(inputString) {
    let isValid = true;

    if (inputString === undefined || inputString === "") isValid = false;

    if (inputString.trim() == "") isValid = false;

    return isValid;
  }
}

export default AddView;
