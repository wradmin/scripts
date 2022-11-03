import * as fs from "fs";
import fetch from "node-fetch";
const BASE_URL = "https://transit.land/api/v2/rest";
const API_KEY = "&apikey=yqn5x3xjV2hHKXY4dWBIiQVr5ZZLOguw";
const AGENCIES_URL = `${BASE_URL}/agencies?${API_KEY}`;
const FEEDS_URL = `${BASE_URL}/feeds?${API_KEY}`;

const getData = async (url, type, limit=2) => {
  console.log( `Начало получения из API данных о "${type}" по "${limit}" штук за раз` );
  let nextURL = url + `&limit=${limit}`;
  let resultArr = [];
  let i = 1;

  while (nextURL !== "") {
    const data = await fetch(nextURL)
      .then((r) => r.json())
      .then((data) => data);

    resultArr = resultArr.concat(data[type]);
    nextURL = data.meta?.next || ""
    console.log( "Получена порция №" + i);
    i++;
  }

  console.log( `Начало получения из API данных о "${type}"` );
  return resultArr;
};

if (!fs.existsSync("./files")) {
  fs.mkdirSync("./files");
}

const getAgencies = async () => {
  const agencies = await getData(AGENCIES_URL, "agencies", 500);
  fs.writeFile("./files/agencies.json", JSON.stringify(agencies), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const getFeeds = async () => {
  const feeds = await getData(FEEDS_URL, "feeds", 500);
  fs.writeFile("./files/feeds.json", JSON.stringify(feeds), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

await getAgencies();
await getFeeds();
