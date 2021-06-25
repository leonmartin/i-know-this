class NotificationManager {
  static displayNotification(message, type) {
    if (type === "SUCCESS") {
      document.querySelector(
        ".toast-container"
      ).innerHTML = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header bg-success text-white">
                          <strong class="me-auto">Success</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                          ${message}
                        </div>
                      </div>`;
    } else if (type === "FAIL") {
      document.getElementById(
        "notification-container"
      ).innerHTML = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header bg-danger text-white">
                          <strong class="me-auto">Fail</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                          ${message}
                        </div>
                      </div>`;
    }

    // initialize toasts
    const toastElList = [].slice.call(document.querySelectorAll(".toast"));
    const toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl);
    });
    toastList.forEach((toast) => toast.show());
  }
}

export default NotificationManager;
