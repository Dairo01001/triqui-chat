class Triqui {
    constructor() {
        this.code = this.generateID();
    }

    generateID() {
        return Math.random().toString(36).substring(2, 18);
    }
}

module.exports = Triqui;