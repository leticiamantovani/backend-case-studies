


// [
//     { id: 1, category: 'food', amount: 20 },
//     { id: 2, category: 'transport', amount: 15 },
//     { id: 3, category: 'food', amount: 10 },
//   ]

interface ITransaction {
    id: number,
    category: string,
    amount: number
}

interface IRecord {
    [category: string]: number
}

const aggregateByCategory = (transactions: ITransaction[]): IRecord => {
    let record: IRecord = {};

    if(transactions.length === 0){
        throw new Error("Empty array")
    }

    for(const transaction of transactions){
        const { category, amount } = transaction;

        record[category] = (record[category] || 0) + amount;

    }

    return record;
}

export default aggregateByCategory;