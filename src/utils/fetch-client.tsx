// Common client to access the third party api

const fetchClient = async (apiUrl: string) => {
  const response = await fetch(apiUrl);
  const client = await response.json();
  return client;
}

export default fetchClient;