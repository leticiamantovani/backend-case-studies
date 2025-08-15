import aggregateByCategory from "./aggregateByCategory";

//happy test - follow the main scope
// single category
// empty array
// wrong array
// zero amounts

describe("aggregateByCategory Function Test", () => {
    let transactions: any = []

    beforeEach(() => {
        transactions = [
            { id: 1, category: 'food', amount: 20 },
            { id: 2, category: 'transport', amount: 15 },
            { id: 3, category: 'food', amount: 10 },
        ];
    })
    
    it("Should calculate the amount of many categories", () => {

        const result = aggregateByCategory(transactions);

        expect(result).toEqual({
            "food": 30,
            "transport": 15
        })
        expect(result).not.toBe(null);
    })

    it("Should calculate the amount of one category", () => {

        const result = aggregateByCategory([transactions[0]]);

        expect(result).toBe({
            "food": 20,
        })
        expect(result).not.toBe(null);
    })

    it("Should not calculate the amount of any category - [] empty array", () => {

        const result = aggregateByCategory([]);

        expect(result).toThrow(new Error("Empty array"))
    })

    it("Should calculate the amount of any category - amount zero", () => {

        transactions.forEach(transaction => {
            transaction.amount = 0
        })

        const result = aggregateByCategory(transactions);

        expect(result).toEqual([{
            "food": 0,
            "transportation": 0
        }])
    })

    it("Should not calculate the amount of any category - [] wrong array", () => {
        let wrongArray: any = [{
            id: 1,
            transaction: "transaction1"
        }];

        const run = () => aggregateByCategory(wrongArray);
        expect(run).toThrow("Empty array");
    })

})