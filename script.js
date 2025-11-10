  function initMap() {
    const lokasi = { lat: -7.0124, lng: 110.3814 };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: lokasi,
    });

    // Penanda (marker)
    const marker = new google.maps.Marker({
      position: lokasi,
      map: map,
      title: "Siomay Patemon",
    });
  }

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".tag-filter");
  const umkmItems = document.querySelectorAll(".umkm-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      umkmItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });












  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const count = btn.nextElementSibling;
      count.textContent = parseInt(count.textContent) + 1;
    });
  });

  document.querySelectorAll(".dislike-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const count = btn.nextElementSibling;
      count.textContent = parseInt(count.textContent) + 1;
    });
  });
});












document.addEventListener("DOMContentLoaded", () => {
  console.log("Script aktif");

  const searchBar = document.getElementById("searchBar");
  const hasilContainer = document.getElementById("hasil");
  const btnScan = document.getElementById("btnScan");
  const tagFilters = document.querySelectorAll(".tag-filter");
  const umkmItems = document.querySelectorAll(".umkm-item");

  // === Tombol Scan ===
  if (btnScan) {
    btnScan.addEventListener("click", () => {
      alert("Fitur scan akan aktif di versi berikutnya!");
    });
  }

  // === Fungsi Pencarian ===
  function jalankanPencarian() {
    const keyword = searchBar.value.trim().toLowerCase();
    hasilContainer.innerHTML = "";

    if (keyword === "") {
      hasilContainer.style.display = "none";
      return;
    }

    const hasilFilter = Array.from(umkmItems).filter(item =>
      item.querySelector(".card-title").textContent.toLowerCase().includes(keyword)
    );

    hasilContainer.style.display = "block";

    if (hasilFilter.length > 0) {
      hasilFilter.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = item.querySelector(".card-title").textContent;
        hasilContainer.appendChild(li);
      });
    } else {
      hasilContainer.innerHTML = `<li class="list-group-item text-muted">UMKM tidak ditemukan!</li>`;
    }
  }

  // Event pencarian
  if (searchBar) {
    searchBar.addEventListener("input", jalankanPencarian);
    searchBar.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        jalankanPencarian();
      }
    });
  }

  // === Fungsi Menata Kembali Card ===
  function reorderCards() {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      const container = section.querySelector(".row");
      if (!container) return;
      const visibleItems = Array.from(container.querySelectorAll(".umkm-item"))
        .filter(item => item.style.display !== "none");

      container.innerHTML = "";
      visibleItems.forEach(item => {
        const col = item.closest(".col-md-3");
        container.appendChild(col);
      });
    });
  }
});
