class ListView {
  static renderView(jsonData) {
    let view = `<h1>List</h1>
                <div id="accordion">`;

    for (let key in jsonData) {
      view += `<div class="card">
                <div class="card-header d-flex justify-content-between align-items-center" id="heading${key}">
                  <h5 class="mb-0">
                      <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}">
                        ${key}
                      </button>
                      </h5>
                  <span class="badge badge-primary badge-pill">${
                    jsonData[key].length
                  }</span>
                </div>
            
                <div id="collapse${key}" class="collapse" aria-labelledby="heading${key}" data-parent="#accordion">
                  <div class="card-body p-0">
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

      entryList += `<li class="list-group-item">
                      <div class="row d-flex justify-content-between align-items-center">
                        <div>
                          ${entryAttributes}
                        </div>
                        <div>
                          <button data-id=${entry["id"]} class="btn btn-primary far fa-trash-alt delete-button"></button>
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
        deleteCallback(event.target.dataset.id);
      });
    }
  }
}

export default ListView;
