// // // database.js

import SQLite from 'react-native-sqlite-storage';

const database_name = 'CheckboxList.db';
const database_version = '1.0';
const database_displayname = 'SQLite Checkbox List';
const database_size = 200000;

let databaseInstance;

const getDatabase = async () => {
  if (!databaseInstance) {
    databaseInstance = await SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    );
  }
  return databaseInstance;
};

export const createTable = async () => {
  const db = await getDatabase();
  return db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        skills TEXT,
        checked INTEGER
      )`,
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table:', error);
      }
    );
  });
};

export const insertItem = async (name, skills, checked) => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Items (name, skills, checked) VALUES (?, ?, ?)',
        [name, skills, checked],
        (_, results) => {
          console.log('Item inserted:', results);
          resolve(results);
        },
        (_, error) => {
          console.log('Error inserting item:', error);
          reject(error);
        }
      );
    });
  });
};

export const getItems = async () => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Items',
        [],
        (_, { rows }) => {
          console.log('Query executed, rows:', rows);
          if (rows.length > 0) {
            const items = [];
            for (let i = 0; i < rows.length; i++) {
              items.push(rows.item(i));
            }
            console.log('Items retrieved:', items);
            resolve(items);
          } else {
            console.log('No items found');
            resolve([]);
          }
        },
        (_, error) => {
          console.log('Error retrieving items:', error);
          reject(error);
        }
      );
    });
  });
};

export const updateItem = async (id, checked) => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Items SET checked = ? WHERE id = ?',
        [checked, id],
        (_, results) => {
          console.log('Item updated:', results);
          resolve(results);
        },
        (_, error) => {
          console.log('Error updating item:', error);
          reject(error);
        }
      );
    });
  });
};

export const deleteItem = async (id) => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Items WHERE id = ?',
        [id],
        (_, results) => {
          console.log('Item deleted:', results);
          resolve(results);
        },
        (_, error) => {
          console.log('Error deleting item:', error);
          reject(error);
        }
      );
    });
  });
};