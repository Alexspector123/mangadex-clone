export function serializeParams(params) {
    const query = [];
  
    for (const key in params) {
      const value = params[key];
  
      if (value === undefined || value === null) continue;
  
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Handle nested objects (e.g., order)
        for (const subKey in value) {
          query.push(`${encodeURIComponent(`${key}[${subKey}]`)}=${encodeURIComponent(value[subKey])}`);
        }
      } else if (Array.isArray(value)) {
        // Handle arrays (e.g., includedTags)
        value.forEach((item) => {
          query.push(`${encodeURIComponent(`${key}[]`)}=${encodeURIComponent(item)}`);
        });
      } else {
        // Handle primitive values
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  
    return query.join('&');
  };
  