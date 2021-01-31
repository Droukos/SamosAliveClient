export async function getLocation(func: (position: Position) => Promise<void>) {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      resolve(navigator.geolocation.getCurrentPosition(func));
    } else {
      console.log("Geo Location not supported by browser");
      reject()
    }
  })
}
