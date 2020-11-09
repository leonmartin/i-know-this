class ListView {
  static renderView(jsonData) {
    const $mainContainer = document.getElementById("main-container");

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
                    <ul class="list-group list-group-flush">
                        ${this.buildList(jsonData[key])}
                    </ul>
                    
                  </div>
                </div>
              </div>`;
    }

    view += `</div>`;

    $mainContainer.innerHTML = view;
  }

  static buildList(jsonArray) {
    let htmlList = ``;

    for (let elem of jsonArray) {
      let paragraphs = ``;

      for (let key in elem) {
        paragraphs += `<p class="mb-0">${key}: ${elem[key]}</p>`;
      }

      htmlList += `<li class="list-group-item">
                      <div class="row d-flex justify-content-between align-items-center">
                        <div class="">
                          ${paragraphs}
                        </div>
                        <div class="">
                          <button class="btn btn-primary far fa-trash-alt"></button>
                        </div>
                      </div>
                    </li>`;
    }

    return htmlList;
  }
}

export default ListView;
