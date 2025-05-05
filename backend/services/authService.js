import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const clientId = process.env.MANGADEX_CLIENT_ID;
const clientSecret = process.env.MANGADEX_CLIENT_SECRET;
const username = process.env.MANGADEX_USERNAME;
const password = process.env.MANGADEX_PASSWORD;

const JWT_KEY = process.env.JWT_KEY || "your_jwt_secret_key";

// Get mangadex access token
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

// Refresh mangadex access token
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

export const hashPassword = async (password) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (name) => {
  return jwt.sign({name}, JWT_KEY, { expiresIn: '1d' });
};