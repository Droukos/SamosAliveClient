export async function getLocation(func: (position: Position) => void) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(func);
  } else {
    console.log("Geo Location not supported by browser");
  }
}
