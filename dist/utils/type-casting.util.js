"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toObjectId = void 0;
const mongodb_1 = require("mongodb");
const toObjectId = (id) => {
    return typeof id === 'string' ? new mongodb_1.ObjectId(id) : id;
};
exports.toObjectId = toObjectId;
//# sourceMappingURL=type-casting.util.js.map