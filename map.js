// === Cek apakah elemen peta ada di halaman ini ===
if (document.getElementById("map-lokasi")) {
  // 1️⃣ Inisialisasi peta dengan koordinat pusat (titik UMKM)
  const map = L.map("map-lokasi").setView([-7.059198, 110.397104], 17);

  // 2️⃣ Tambahkan layer dasar (peta OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map);

  // 3️⃣ Data spasial UMKM (contoh — bisa dikembangkan)
  const umkmData = [
    {
      nama: "tiwul",
      lat: -7.059198,
      lng: 110.397104,
      kategori: "Makanan Tradisional",
      alamat: "Patemon, Gunungpati, Semarang",
    },
    {
      nama: "Tahu Bakso Bu Dwi",
      lat: -7.058915,
      lng: 110.396936,
      kategori: "Kuliner",
      alamat: "Patemon, Gunungpati, Semarang",
    },
    {
      nama: "Keripik Singkong Bu Siti",
      lat: -7.059400,
      lng: 110.396800,
      kategori: "Camilan",
      alamat: "Jl. Raya Patemon No.21, Semarang",
    },
  ];

  // 4️⃣ Tambahkan marker untuk tiap UMKM
  umkmData.forEach((data) => {
    const marker = L.marker([data.lat, data.lng]).addTo(map);
    marker.bindPopup(`
      <b>${data.nama}</b><br>
      Kategori: ${data.kategori}<br>
      Alamat: ${data.alamat}<br>
      Koordinat: ${data.lat}, ${data.lng}
    `);
  });

  // 5️⃣ Analisis sederhana (contoh: tampilkan jarak antar dua titik)
  const jarak = map.distance(
    [umkmData[0].lat, umkmData[0].lng],
    [umkmData[1].lat, umkmData[1].lng]
  );

  console.log(`Jarak antara ${umkmData[0].nama} dan ${umkmData[1].nama}: ${(jarak / 1000).toFixed(2)} km`);

  // 6️⃣ Tambahkan garis penghubung antar titik (contoh analisis spasial)
  const garis = L.polyline(
    umkmData.map((u) => [u.lat, u.lng]),
    { color: "blue", weight: 3, dashArray: "5,10" }
  ).addTo(map);

  // 7️⃣ Zoom agar semua titik terlihat
  map.fitBounds(garis.getBounds());
}
