import * as modularMock from ".";


describe("processTransactionsWithRetry Tests", () => {
    const transactions: modularMock.ITransaction[] = [
        { id: 1, category: "books", amount: 10 },
        { id: 2, category: "games", amount: 20 },
      ];

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Should process transaction succefully", async () => {

        const mock = jest.spyOn(modularMock, "processTransaction");

        mock.mockResolvedValue(undefined);

        const res = await modularMock.processTransactionsWithRetry(transactions);

        expect(res).toStrictEqual([]);
    })

    it("Should retry transaction three times", async () => {

        const mock = jest.spyOn(modularMock, "processTransaction");

        mock.mockRejectedValueOnce(new Error("error"));
        mock.mockRejectedValueOnce(new Error("error"));
        mock.mockRejectedValueOnce(new Error("error"));
        mock.mockResolvedValueOnce(undefined);

        const res = await modularMock.processTransactionsWithRetry(transactions);
        console.log("RES", res)

        expect(res).toEqual([1]);
        expect(mock).toHaveBeenCalledTimes(4);
    })

    
})