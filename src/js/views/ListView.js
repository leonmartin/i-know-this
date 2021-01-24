class ListView {
  static renderView(jsonData) {
    let view = `<h1>List Entries</h1>
                <div class="accordion">`;

    for (let key in jsonData) {
      view += `<div class="accordion-item">
                  <h5 class="accordion-header" id="heading${key}">
                    <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}">
                      <div>
                        ${key}
                      </div>
                      <div class="badge rounded-pill bg-primary ms-1">
                        ${jsonData[key].length}
                      </div>
                    </button>
                  </h5>
                  <div class="accordion-collapse collapse" id="collapse${key}" aria-labelledby="heading${key}" data-parent="#accordion">
                    <div class="accordion-body p-0">
                      ${this.buildList(jsonData[key])}            
                    </div>
                  </div>
                </div>`;
    }

    view += `</div>`;

    const $mainContainer = document.getElementById("main-container");
    $mainContainer.innerHTML = view;
  }

  static buildList(categoryEntries) {
    let entryList = `<ul class="list-group list-group-flush">`;

    for (let entry of categoryEntries) {
      let entryAttributes = ``;

      for (let attribute in entry) {
        if (attribute !== "id") {
          entryAttributes += `<p class="mb-0">${attribute}: ${entry[attribute]}</p>`;
        }
      }

      entryList += `<li data-id="${entry["id"]}" class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        ${entryAttributes}
                      </div>
                      <div>
                        <div class="btn-group" role="group" aria-label="Basic example">
                          <button class="btn btn-primary fas fa-edit edit-button"></button>
                          <button class="btn btn-primary far fa-trash-alt delete-button"></button>
                        </div>
                      </div>
                    </li>`;
    }

    return entryList + "</ul>";
  }

  static bindDeleteButtonsClick(deleteCallback) {
    const $deleteButtons = document.getElementsByClassName("delete-button");

    for (let $button of $deleteButtons) {
      $button.addEventListener("click", (event) => {
        const $entry = event.target.closest("li[data-id]");
        deleteCallback($entry.dataset.id);

        // update count pill
        const $accordionItem = $entry.closest(".accordion-item");
        const $pill = $accordionItem.querySelector(".badge");
        $pill.innerHTML = $pill.innerHTML - 1;

        if ($pill.innerHTML == 0) {
          $accordionItem.remove();
        } else {
          $entry.remove();
        }

      });
    }
  }

  static bindEditButtonsClick(editCallback) {
    const $editButtons = document.getElementsByClassName("edit-button");

    for (let $button of $editButtons) {
      $button.addEventListener("click", (event) => {
        const $entry = event.target.closest(`li[data-id]`);
        editCallback($entry.dataset.id);
      });
    }
  }
}

export default ListView;
