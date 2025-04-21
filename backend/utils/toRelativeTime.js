// Helper function to convert time to relative format (like "5 minutes ago")
export const toRelativeTime = (dateStr) => {
    const timeDiff = (new Date() - new Date(dateStr)) / 1000;
    if (timeDiff < 60) return `${Math.floor(timeDiff)} seconds ago`;
    if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)} minutes ago`;
    if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)} hours ago`;
    return `${Math.floor(timeDiff / 86400)} days ago`;
};