import mysql from 'mysql';

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "memorizex12345",
    database: 'mangadex'
});

const connectDB = async () => {
    db.connect(err => {
        if (err) {
          console.error('Database connection failed:', err.message);
          process.exit(1);
        }
        console.log('Connected to MySQL Database');
      });
}

export default connectDB;