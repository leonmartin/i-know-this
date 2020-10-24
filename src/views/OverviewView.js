class OverviewView {
  getView(jsonData) {
    let view = `<h1>Overview</h1>`;
    for (let key in jsonData) {
      view += `
            <div class="card bg-light m-3">
                <div class="card-body">
                    <h5 class="card-title">${key}</h5>
                    <p class="card-text">${jsonData[key].length} entries in this category.</p>
                </div>
            </div>
        `;
    }

    return view;
  }
}

export default OverviewView;
