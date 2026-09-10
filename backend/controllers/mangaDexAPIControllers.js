import axios from 'axios';

import { extractData } from '../util/mangaDexAPIHelpers.js';

const mangaDexAPI = axios.create({
  baseURL: "https://api.mangadex.org/manga",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
  },
});

//function to make call to mangaDex API and return all results with specified word in title, desc, tags, etc
async function searchManga(req, res) {
  try {
    const response = await mangaDexAPI.get(
      `?title=${req.params.keyword}&includes[]=author&includes[]=artist&includes[]=cover_art`,
    );
    const data = response.data.data;

    //if no search results
    if (data.length === 0) {
      res.status(200).json({
        success: true,
        payload: [],
        message: "No titles found...",
        error: null,
      });
      return;
    }

    //do the extraction of the necessary data here
    const extractedData = data.map((d) => extractData(d));

    //If I do get a response
    res.status(200).json({
      success: true,
      payload: extractedData,
      message: "Search Results",
      error: null,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      payload: [],
      message: "Network Error",
      error: "Network Error",
    });
  }
}



export  {searchManga}




