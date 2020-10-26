class NotificationManager {
  static displayNotification(message, type) {
    if (type === "SUCCESS") {
      document.getElementById(
        "main-container"
      ).innerHTML += `<div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                              ${message}
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`;
    } else if (type === "FAIL") {
      document.getElementById(
        "main-container"
      ).innerHTML += `<div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                                ${message}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`;
    }
  }
}

export default NotificationManager;
