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
exports.processTransactionsWithRetry = processTransactionsWithRetry;
exports.processTransaction = processTransaction;
function processTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Math.random() < 0.5) {
            throw new Error(`Error with ${transaction.id}`);
        }
    });
}
function processTransactionsWithRetry(transactions) {
    return __awaiter(this, void 0, void 0, function* () {
        let arr = [];
        for (const transaction of transactions) {
            let retry = 0;
            let success = false;
            while (!success && retry < 3) {
                try {
                    yield processTransaction(transaction);
                    success = true;
                }
                catch (error) {
                    retry++;
                    if (retry === 3) {
                        arr.push(transaction.id);
                    }
                }
            }
        }
        return arr;
    });
}
