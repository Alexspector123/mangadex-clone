import { db } from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { hashPassword, comparePassword, generateToken } from '../services/authService.js';

const salt = 10;

export const register = async (req, res) => {
  const sql = "INSERT INTO User (`name`, `email`, `password`) VALUES (?)";
  try {
    const hash = await hashPassword(req.body.password.toString());
    const values = [
        req.body.name,
        req.body.email,
        hash
      ];
    db.query(sql,[values], (err, result) => {
        if(err) return res.json({Error: "Inserting data Error in server"});
        return res.json({Status: "Success"});
    });
  } catch (error) {
    return res.json({ Error: "Error hashing password" });
  }
};

export const login = async (req, res) => {
  const sql = "SELECT * FROM User WHERE email = ?";
  
  db.query(sql, [req.body.email], async (err, data) => {
    if(err) return res.json({Error: "Login Error in server"});
    if(data.length > 0){
        try {
            const isMatch = await comparePassword(req.body.password.toString(), data[0].password);
            if(isMatch) {
                const name = data[0].name;
                const token = generateToken({name});
                res.cookie('token', token);
                return res.json({Status: "Success"});
            } else {
                return res.json({ Error: "Password not matched" });
            }
        } catch (error) {
            return res.json({ Error: "Password compare error" });
        }
    } else {
      return res.json({Error: "No email existed"});
    }
  });
};