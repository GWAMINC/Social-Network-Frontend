document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab-button");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            const targetId = this.getAttribute("data-tab");

            tabs.forEach(tab => tab.classList.remove("active"));
            tabPanes.forEach(pane => pane.classList.remove("active"));

            this.classList.add("active");
            document.getElementById(targetId).classList.add("active");
        });
    });

    if (tabs.length > 0) {
        tabs[0].click();
    }
});
