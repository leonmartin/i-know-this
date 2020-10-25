class ListView {
  getView(jsonData) {
    this.currentData = jsonData;

    let view = `<h1>List</h1>
                <div id="accordion">`;

    for (let key in jsonData) {
      view += `
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center" id="heading${key}">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}">
                        ${key}
                        </button>
                        </h5>
                    <span class="badge badge-primary badge-pill">${jsonData[key].length}</span>
                </div>
            
                <div id="collapse${key}" class="collapse" aria-labelledby="heading${key}" data-parent="#accordion">
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                            ${this.buildListElems(jsonData[key])}
                        </ul>
                    </div>
                </div>
            </div>
          `;
    }

    view += `</div>`;

    return view;
  }

  buildListElems(jsonArray) {
    let htmlListElems = ``;
    for (let elem of jsonArray) {
      console.log(elem);
      htmlListElems += `<li class="list-group-item">`;
      for (let key in elem) {
        htmlListElems += `<p class="mb-0">${key}: ${elem[key]}</p>`;
      }
      htmlListElems += `<//li>`;
    }

    return htmlListElems;
  }
}

export default ListView;
