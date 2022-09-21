import axios from "axios";
import { store } from "../store";
import { setToken } from "../store/modules/user";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) store.dispatch(setToken(""));
    return error;
  }
);

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
