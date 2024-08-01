const { filterData, sortData } = require('../utils/dataUtils');

exports.getData = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const collection = db.collection('data');
        
        let data = await collection.find({}).toArray();
        const { filter, sort, ...otherParams } = req.query;

        if (Object.keys(otherParams).length > 0) {
            const unrecognizedParams = Object.keys(otherParams).join(', ');
            return res.status(400).json({
                error: 'Unrecognized query parameter(s)',
                message: `Unrecognized query parameter(s): ${unrecognizedParams}`
            });
        }

        if (filter) {
            try {
                data = filterData(data, filter);
            } catch (error) {
                return res.status(400).json({ error: 'Filter error', message: error.message });
            }
        }

        if (sort) {
            try {
                data = sortData(data, sort);
            } catch (error) {
                return res.status(400).json({ error: 'Sort error', message: error.message });
            }
        }

        res.json(data);
    } catch (error) {
        console.error('Error in getData:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};