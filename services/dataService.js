exports.getData = async (db) => {
    if (!db) {
      throw new Error('Database connection not provided');
    }
  
    try {
      const collection = db.collection('data');
      const data = await collection.find({}).toArray();
      console.log('Data fetched from MongoDB:', data.length, 'items');
      return data;
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error.message);
      throw new Error('Failed to fetch data from database');
    }
  };