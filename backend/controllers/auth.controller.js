import { db } from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { hashPassword, comparePassword, generateToken } from '../services/authService.js';

const salt = 10;

export const register = (req, res) => {
  const sql = "INSERT INTO User (`name`, `email`, `password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if(err) return res.json({Error: "Error for hassing password"});
    const values = [
      req.body.name,
      req.body.email,
      hash
    ];
    db.query(sql,[values], (err, result) => {
      if(err) return res.json({Error: "Inserting data Error in server"});
      return res.json({Status: "Success"});
    })
  })
};

export const login = (req, res) => {
  const sql = "SELECT * FROM User WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if(err) return res.json({Error: "Login Error in server"});
    if(data.length > 0){
      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
        if(err) return res.json({Error: "Password compare error"});
        if(response) {
          const name = data[0].name;
          const token = generateToken(name);
          res.cookie('token', token);
          return res.json({Status: "Success"});
        } else {
          return res.json({Error: "Password not matched"});
        }
      })
    } else {
      return res.json({Error: "No email existed"});
    }
  })
};