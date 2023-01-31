module.exports = {
    multipleToObject: (mongoose) => {
        return mongoose.map((m) => m.toObject());
    },
    toObject: (mongoose) => {
        return mongoose.toObject();
    },

    checkTwoString: (str1, str2) => {
        let indexOfPrevChar = 0;//previous element's posistion of str1 that we found in str2
        outerlopp:
        for (let i = 0; i < str1.length; i++) {
            for (let j = indexOfPrevChar; j < str2.length; j++) {
                if (str1.charAt(i) == str2.charAt(j)) {
                    indexOfPrevChar = j;
                    if (i == str1.length - 1) return true;
                    break;
                } else if (j == str2.length - 1) return false;
            }
        }
        return false;
    }
};
