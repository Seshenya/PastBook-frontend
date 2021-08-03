
import config from '../config';

// Common client to access the api
async function postClient(endpoint: string, body: any = {}): Promise<any> {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  const response = await fetch(`${config.data.passbookBEUrl}${endpoint}`, requestOptions);
  return await response.json();
}

async function getClient(endpoint: string): Promise<any> {
    const response = await fetch(`${config.data.passbookBEUrl}${endpoint}`);
    return await response.json();
}

export {
  postClient,
  getClient
};
