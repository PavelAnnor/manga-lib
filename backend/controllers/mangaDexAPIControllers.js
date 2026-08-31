import axios from 'axios';

const mangaDexAPI = axios.create({
  baseURL: "https://api.mangadex.org/manga",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
  },
});




