  function initMap() {
    const lokasi = { lat: -7.0124, lng: 110.3814 };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: lokasi,
    });

    const marker = new google.maps.Marker({
      position: lokasi,
      map: map,
      title: "Siomay Patemon",
    });
  }

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('emailForm');
    const notif = document.getElementById('notif');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        notif.style.display = 'block';
        form.reset();

        setTimeout(() => {
            notif.style.display = 'none';
        }, 3000);
    });
});


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
          item.classList.remove("d-none");
        } else {
          item.classList.add("d-none");
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


document.addEventListener("DOMContentLoaded", async () => {

  console.log("Memuat model AI...");
  const model = await mobilenet.load();
  console.log("Model siap digunakan!");


  const umkmImages = [
    { name: "Siomay Patemon", src: "./assets/img/siomay1.jpg", selector: '.card-img-top[alt="Siomay Patemon"]' },
    { name: "Buah Bu Yati", src: "./assets/img/buah.jpg", selector: '.card-img-top[alt="Buah Bu Yati"]' },
    { name: "Budidaya Jamur", src: "./assets/img/jamur.jpg", selector: '.card-img-top[alt="Budidaya Jamur"]' },
    { name: "Giri Chicken", src: "./assets/img/gc.jpg", selector: '.card-img-top[alt="Giri Chicken"]' },
    { name: "Tiwul Patemon", src: "./assets/img/tiwul.jpg", selector: '.card-img-top[alt="Tiwul Patemon"]' },
    { name: "Es Kelapa", src: "./assets/img/degan.jpg", selector: '.card-img-top[alt="Es Kelapa"]' },
    { name: "Bengkel Sampang", src: "./assets/img/bengkel.jpg", selector: '.card-img-top[alt="Bengkel"]' },
    { name: "Warung Makan Ibune Rizky", src: "./assets/img/ibune.jpg", selector: '.card-img-top[alt="Warung Makan"]' },
    { name: "Penjahit Bu Is", src: "./assets/img/penjahit.jpg", selector: '.card-img-top[alt="Penjahit"]' },
    { name: "Isi Ulang Gas Portabel", src: "./assets/img/gas.jpg", selector: '.card-img-top[alt="Gas"]' },
    { name: "Dapur RTM", src: "./assets/img/rtm3.jpg", selector: '.card-img-top[alt="Dapur RTM"]' },
    { name: "Hasil Bumi", src: "./assets/img/bumi.jpg", selector: '.card-img-top[alt="Hasil Bumi"]' }
  ];



  const filterButtons = document.querySelectorAll(".tag-filter");
  const umkmItems = document.querySelectorAll(".umkm-item");
  const searchBar = document.getElementById("searchBar");
  const hasilContainer = document.getElementById("hasil");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      umkmItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.classList.remove("d-none");
        } else {
          item.classList.add("d-none");
        }
      });

      searchBar.value = "";
      hasilContainer.innerHTML = "";
      hasilContainer.style.display = "none";
    });
  });



  function jalankanPencarian() {
    const keyword = searchBar.value.trim().toLowerCase();
    hasilContainer.innerHTML = "";

    if (keyword === "") {
      hasilContainer.style.display = "none";
      umkmItems.forEach((item) => item.classList.remove("d-none"));
      return;
    }

    const hasilFilter = Array.from(umkmItems).filter((item) =>
      item.querySelector(".card-title").textContent.toLowerCase().includes(keyword)
    );

    hasilContainer.style.display = "block";

    umkmItems.forEach((item) => {
      if (hasilFilter.includes(item)) item.classList.remove("d-none");
      else item.classList.add("d-none");
    });

    if (hasilFilter.length > 0) {
      hasilFilter.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = item.querySelector(".card-title").textContent;

        li.addEventListener("click", () => {
          umkmItems.forEach((card) => {
            if (card === item) card.classList.remove("d-none");
            else card.classList.add("d-none");
          });

          searchBar.value = li.textContent;
          hasilContainer.style.display = "none";

          window.scrollTo({
            top: item.offsetTop - 150,
            behavior: "smooth"
          });
        });

        hasilContainer.appendChild(li);
      });

    } else {
      hasilContainer.innerHTML = `<li class="list-group-item text-muted">UMKM tidak ditemukan!</li>`;
    }
  }

  if (searchBar) {
    searchBar.addEventListener("input", jalankanPencarian);
    searchBar.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        jalankanPencarian();
      }
    });
  }



  const btnScan = document.getElementById("btnScan");
  const inputFoto = document.createElement("input");
  inputFoto.type = "file";
  inputFoto.accept = "image/*";
  inputFoto.style.display = "none";
  document.body.appendChild(inputFoto);

  btnScan.addEventListener("click", () => inputFoto.click());

  inputFoto.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadedImg = await loadImage(URL.createObjectURL(file));
    const uploadedHist = getImageHistogram(uploadedImg);

    let bestMatch = null;
    let lowestDiff = Infinity;

    for (const item of umkmImages) {
      const refImg = await loadImage(item.src);
      const refHist = getImageHistogram(refImg);

      const diff = compareHist(uploadedHist, refHist);

      if (diff < lowestDiff) {
        lowestDiff = diff;
        bestMatch = item;
      }
    }

    if (bestMatch) {
      alert("Hasil ditemukan: " + bestMatch.name);

      const targetImage = document.querySelector(bestMatch.selector);
      const targetCard = targetImage.closest(".umkm-item");

      document.querySelectorAll(".umkm-item").forEach(c => c.classList.add("d-none"));
      targetCard.classList.remove("d-none");

      window.scrollTo({
        top: targetCard.offsetTop - 100,
        behavior: "smooth"
      });

    } else {
      alert("Tidak ada UMKM yang mirip ditemukan!");
    }
  });


  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.src = src;
    });
  }


  function getImageHistogram(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 64;
    canvas.height = 64;

    ctx.drawImage(img, 0, 0, 64, 64);

    const data = ctx.getImageData(0, 0, 64, 64).data;
    const hist = [0, 0, 0];

    for (let i = 0; i < data.length; i += 4) {
      hist[0] += data[i];
      hist[1] += data[i + 1];
      hist[2] += data[i + 2];
    }
    return hist;
  }


  function compareHist(h1, h2) {
    return Math.sqrt(
      (h1[0] - h2[0]) ** 2 +
      (h1[1] - h2[1]) ** 2 +
      (h1[2] - h2[2]) ** 2
    );
  }

});




const commentForm = document.getElementById("commentForm");
  const commentList = document.getElementById("commentList");

  let comments = [];

  function renderComments() {
    commentList.innerHTML = "";

    comments.forEach((comment, index) => {
      const commentCard = document.createElement("div");
      commentCard.className = "card shadow-sm mb-3";

      commentCard.innerHTML = `
        <div class="card-body">
          <h6 class="fw-bold"><i class="bi bi-person-fill me-2"></i>${comment.username}</h6>
          <p class="mb-2">${comment.text}</p>
          
          <button class="btn btn-sm btn-outline-primary reply-btn mb-2" data-index="${index}">
            <i class="bi bi-reply-fill me-1"></i> Balas
          </button>

          <div class="reply-section mt-3">
            ${(comment.replies || [])
              .map(
                reply => `
              <div class="p-2 mb-2 bg-light rounded">
                <strong>${reply.username}:</strong> ${reply.text}
              </div>
            `
              )
              .join("")}
          </div>

          <div class="reply-form mt-3 d-none" id="replyForm-${index}">
            <input type="text" class="form-control mb-2 reply-name" placeholder="Nama Anda">
            <textarea class="form-control mb-2 reply-text" rows="2" placeholder="Tulis balasan..."></textarea>
            <button class="btn btn-sm btn-success submit-reply" data-index="${index}">
              Kirim Balasan
            </button>
          </div>
        </div>
      `;

      commentList.appendChild(commentCard);
    });

    attachReplyEvents();
  }

  
  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const commentText = document.getElementById("commentText").value;

    comments.push({ username, text: commentText, replies: [] });

    renderComments();
    commentForm.reset();
  });

 
  function attachReplyEvents() {
    const replyButtons = document.querySelectorAll(".reply-btn");
    const submitReplyButtons = document.querySelectorAll(".submit-reply");

    replyButtons.forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const form = document.getElementById(`replyForm-${index}`);
        form.classList.toggle("d-none");
      });
    });

    submitReplyButtons.forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");

        const replyName = document.querySelector(`#replyForm-${index} .reply-name`).value;
        const replyText = document.querySelector(`#replyForm-${index} .reply-text`).value;

        if (replyName && replyText) {
          comments[index].replies.push({
            username: replyName,
            text: replyText
          });

          renderComments();
        }
      });
    });
  }









