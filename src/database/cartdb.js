import SQLite from 'react-native-sqlite-storage';
import CartEventEmitter from '../screens/CartEventEmitter';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "MainDB";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

const openDB = async () => {
  return SQLite.openDatabase(database_name, database_version, database_displayname, database_size);
};

export const createTable = async () => {
  const db = await openDB();
  await db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS Cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        item_id INTEGER UNIQUE, 
        title TEXT, 
        description TEXT, 
        thumbnail TEXT, 
        category TEXT, 
        rating REAL,
        price INTEGER,
        count INTEGER DEFAULT 1)`,
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.error('Error creating table: ', error.message);
      }
    );
  });
};

const checkAndAddPriceColumn = async () => {
  const db = await openDB();
  await db.transaction(txn => {
    txn.executeSql(
      `PRAGMA table_info(Cart)`,
      [],
      (tx, results) => {
        const columns = [];
        for (let i = 0; i < results.rows.length; i++) {
          columns.push(results.rows.item(i).name);
        }
        if (!columns.includes('price')) {
          txn.executeSql(
            `ALTER TABLE Cart ADD COLUMN price INTEGER`,
            [],
            () => {
              console.log('Price column added successfully');
            },
            error => {
              console.error('Error adding price column: ', error.message);
            }
          );
        }
      },
      error => {
        console.error('Error checking table info: ', error.message);
      }
    );
  });
};

const checkCount = async () => {
  const db = await openDB();
  await db.transaction(txn => {
    txn.executeSql(
      `PRAGMA table_info(Cart)`,
      [],
      (tx, results) => {
        const columns = [];
        for (let i = 0; i < results.rows.length; i++) {
          columns.push(results.rows.item(i).name);
        }
        if (!columns.includes('count')) {
          txn.executeSql(
            `ALTER TABLE Cart ADD COLUMN count INTEGER`,
            [],
            () => {
              console.log('Count column added successfully');
            },
            error => {
              console.error('Error adding count column: ', error.message);
            }
          );
        }
      },
      error => {
        console.error('Error checking table info: ', error.message);
      }
    );
  });
};

const initializeDatabase = async () => {
  await createTable();
  await checkAndAddPriceColumn();
  await checkCount();
};

initializeDatabase();

export const insertItem = async (item) => {
  const db = await openDB();
  await db.transaction(async (txn) => {
    await txn.executeSql(
      `INSERT INTO Cart (item_id, title, description, thumbnail, category, rating, price, count)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)
       ON CONFLICT(item_id) DO UPDATE SET count = count + 1`,
      [item.id, item.title, item.description, item.thumbnail, item.category, item.rating, item.price],
      () => {
        console.log('Item added successfully');
        CartEventEmitter.emit('itemAdded');
      },
      (error) => {
        console.error('Error adding item: ', error.message);
      }
    );
  });
};


export const updateItemCount = async (item) => {
  const db = await openDB();
  await db.transaction(async (txn) => {
    await txn.executeSql(
      `UPDATE Cart SET count = ? WHERE item_id = ?`,
      [item.count, item.id],
      () => {
        console.log('Item count updated successfully');
        CartEventEmitter.emit('itemCountUpdated');
      },
      (error) => {
        console.error('Error updating item count: ', error.message);
      }
    );
  });
};

export const getItems = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM Cart`,
        [],
        (tx, results) => {
          let items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          resolve(items);
        },
        error => {
          console.error('Error getting items: ', error.message);
          reject(error);
        }
      );
    });
  });
};

export const removeItem = async (itemId) => {
  const db = await openDB();
  await db.transaction(txn => {
    txn.executeSql(
      `DELETE FROM Cart WHERE item_id = ?`,
      [itemId],
      () => {
        console.log('Item removed successfully');
        CartEventEmitter.emit('itemRemoved');
      },
      error => {
        console.error('Error removing item: ', error.message);
      }
    );
  });
};

export const clearCart = async () => {
  try {
    const db = await openDB();
    await db.transaction(async (txn) => {
      // Execute SQL query to delete all records from the cart table
      await txn.executeSql('DELETE FROM Cart');
      console.log('Cart cleared successfully');
      // Emit an event after successfully clearing the cart
      CartEventEmitter.emit('cartCleared');
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};