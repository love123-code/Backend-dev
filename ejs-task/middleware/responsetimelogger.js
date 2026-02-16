module.exports = (req, res, next) => {

    const start = Date.now();

    res.on("finish", () => {
        const end = Date.now();
        const time = end - start;

        console.log(`${req.method} ${req.url} - ${time}ms`);
    });

    next();
};
