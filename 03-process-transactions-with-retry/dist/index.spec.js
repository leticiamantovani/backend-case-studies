"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("processTransactionsWithRetry Tests", () => {
    let transactions = [];
    beforeEach(() => {
        transactions = [
            { id: 1, category: 'books', amount: 10 },
            { id: 2, category: 'games', amount: 20 },
            { id: 3, category: 'music', amount: 30 }
        ];
    });
    it("Should process transaction succefully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, _1.processTransactionsWithRetry)(transactions);
        expect(res).toBe([]);
    }));
});
