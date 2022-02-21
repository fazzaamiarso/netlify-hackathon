export const BASE_URL = `https://api.genius.com/`;

export const fetchFromGenius = async requestPath => {
  const url = `${BASE_URL}${requestPath}`;
  const encodedURL = encodeURI(url); //replace character with escape sequence of UTF-8 encoding

  const response = await fetch(encodedURL, {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`,
    },
  });
  const json = await response.json();
  const data = json.response;
  return data;
};