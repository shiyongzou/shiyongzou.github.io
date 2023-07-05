function getPublicIP() {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip);
}
function getLocationByIP(ip) {
  const apiUrl = `https://ipapi.co/${ip}/json/`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const location = {
        country: data.country_name,
        region: data.region,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude
      };

      return location;
    });
}

