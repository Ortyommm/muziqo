import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

// function fetchAudioFile(src: string) {
//   // go get the file
//   const requestObj = new Request(src, {
//     method: 'GET',
//     headers: {
//       // 'Accept-encoding': 'gzip' ,  // add your header(s)
//       'Authorization': `Bearer ${localStorage.getItem("token")}`
//     },
//     referrerPolicy: 'no-referrer'
//   });
//
//   fetch(requestObj).then(function(response) {
//     return response;
//   }).then(async function(outcome) {
//
//   const audio = new Audio()
//     const blob = await outcome.blob();
//     // convert our blob to a url that can be used by the audio tag
//     const url = window.URL.createObjectURL(blob);
//     // replace the source
//     audio.src = url;
//   })
// }
