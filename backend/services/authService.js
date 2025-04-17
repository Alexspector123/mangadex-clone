import axios from 'axios';

const clientId = process.env.MANGADEX_CLIENT_ID;
const clientSecret = process.env.MANGADEX_CLIENT_SECRET;
const username = process.env.MANGADEX_USERNAME;
const password = process.env.MANGADEX_PASSWORD;

// Get access token
export const getAccessToken = async () => {
  const creds = {
    grant_type: 'password',
    username,
    password,
    client_id: clientId,
    client_secret: clientSecret
  };

  try {
    const response = await axios.post(
      'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
      new URLSearchParams(creds)
    );
    return response.data; // contains access_token and refresh_token
  } catch (error) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw error;
  }
};

// Refresh access token
export const refreshAccessToken = async (refreshToken) => {
  const creds = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret
  };

  try {
    const response = await axios.post(
      'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
      new URLSearchParams(creds)
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error.response?.data || error.message);
    throw error;
  }
};
