const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
export default corsOptions;
//# sourceMappingURL=corsOptions.js.map