class OverviewView {
  static renderView(entriesPerCategory) {
    const $mainContainer = document.getElementById("main-container");

    let view = `<h1>Overview</h1>`;

    for (let category in entriesPerCategory) {
      view += `<div class="card bg-light mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${category}</h5>
                        <p class="card-text">${entriesPerCategory[category].length} entries in this category.</p>
                    </div>
                </div>`;
    }

    $mainContainer.innerHTML = view;
  }
}

export default OverviewView;
