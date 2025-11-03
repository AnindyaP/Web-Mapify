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



