import DATA, { NewsItem, Friend } from "./data";

export type response = {
  status: number,
  data: string[] | NewsItem[] | Friend[]
};

const get = (endpoint : "/menu" | "/news-feed" | "/friends") => {
  const delay : number = Math.floor(Math.random() * 1000) + 500;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!DATA.hasOwnProperty(endpoint)) {
        const validEndpoints : string = Object.keys(DATA)
          .map((endpoint) => ` - "${endpoint}"`)
          .join("\n ");
        reject(
          `"${endpoint}" is an invalid endpoint. Try getting data from: \n ${validEndpoints}`
        );
      }

      const toReturn : response = { status: 200, data: DATA[endpoint] };

      resolve(toReturn);
    }, delay);
  });
}

export default get;
