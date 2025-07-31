"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDatabaseError = handleDatabaseError;
const common_1 = require("@nestjs/common");
function handleDatabaseError(error) {
    if (error instanceof common_1.HttpException) {
        throw error;
    }
    throw new common_1.InternalServerErrorException(error instanceof Error ? error.message : 'Something went wrong');
}
//# sourceMappingURL=db.exception.js.map