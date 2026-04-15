const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
};

module.exports = {
    generateSlug,
};