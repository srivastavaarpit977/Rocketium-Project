exports.filterData = (data, filterString) => {
    if (!filterString) return data;
  
    try {
        const filters = filterString.split(',');
        const filteredData = data.filter(item =>
            filters.every(filter => {
                const [key, value] = filter.split(':');
                if (!key || !value) throw new Error(`Invalid filter format: ${filter}`);
                if (!item.hasOwnProperty(key)) throw new Error(`Unknown filter key: ${key}`);
                return item[key].toString().toLowerCase().includes(value.toLowerCase());
            })
        );
  
        if (filteredData.length === 0) {
            throw new Error(`No items match the filter: ${filterString}`);
        }
  
        return filteredData;
    } catch (error) {
        throw new Error(`Filter error: ${error.message}`);
    }
  };
  
  exports.sortData = (data, sortString) => {
    if (!sortString) return data;
    try {
        const [key, order] = sortString.split(':');
        if (!key || !['asc', 'desc'].includes(order)) {
            throw new Error(`Invalid sort format. Expected 'field:asc' or 'field:desc', got '${sortString}'`);
        }
        if (!data[0].hasOwnProperty(key)) throw new Error(`Unknown sort key: ${key}`);
  
        return [...data].sort((a, b) => {
            if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    } catch (error) {
        throw new Error(`Sort error: ${error.message}`);
    }
  };