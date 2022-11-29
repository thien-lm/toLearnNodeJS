module.exports = {
    multipleToObject: (mongoose) => {
        return mongoose.map((m) => m.toObject());
    },
    toObject: (mongoose) => {
        return mongoose.toObject();
    },
};
