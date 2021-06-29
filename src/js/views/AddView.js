class AddView {
  static renderView(entry = { category: "", title: "" }) {
    let initialInputs = ``;

    for (let attribute in entry) {
      if (attribute === "_id") {
        initialInputs += `<div id="_id" class="mb-3 d-none">${entry[attribute]}</div>`;
      } else {
        initialInputs += `<div class="mb-3">
                            <label for="${attribute}-input" class="form-label">${attribute}</label>
                            <input type="text" class="form-control" id="${attribute}-input" value="${entry[attribute]}" required>
                          </div>`;
      }
    }

    const view = `<h1>Add Entry</h1>
                  <form id="add-form">
                    ${initialInputs}
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
                              <div class="mb-3">
                                <label for="key${counter}-input" class="form-label">Name of additional attribute #${counter}</label>
                                <input type="text" class="form-control key-input" id="key${counter}-input">
                              </div>
                              <div class="mb-3">
                                <label for="value${counter}-input" class="form-label">Value of additional attribute #${counter}</label>
                                <input type="text" class="form-control value-input" id="value${counter}-input">
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
      addCallback(entry);

      // clear input fields
      const $inputs = document.getElementsByTagName("input");
      for (let $input of $inputs) {
        $input.value = "";
      }
    });
  }

  static getEntry() {
    const entry = {};

    // get id
    if (document.getElementById("_id")) {
      const id = document.getElementById("_id").innerHTML;
      entry["_id"] = id;
    }

    // get category
    const category = document.getElementById("category-input").value;
    entry["category"] = category;

    // get title
    const title = document.getElementById("title-input").value;
    entry["title"] = title;

    // iterate over form groups for additional attributes to get other key-value-pairs
    const $additionalAttributes = document.getElementsByClassName(
      "additional-attribute"
    );

    for (let $additionalAttribute of $additionalAttributes) {
      const key = $additionalAttribute.querySelector(".key-input").value;
      const value = $additionalAttribute.querySelector(".value-input").value;
      entry[key] = value;
    }

    return entry;
  }
}

export default AddView;
