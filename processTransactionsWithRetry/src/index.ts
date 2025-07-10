

interface ITransaction {
    id: number;
    category: string;
    amount: number;
}

async function processTransaction(transaction: ITransaction): Promise<any> {
    if(Math.random() < 0.5){
        throw new Error(`Error with ${transaction.id}`)
    }
}


async function processTransactionsWithRetry(transactions: ITransaction[]): Promise<number[]> {
    let arr: number[] = []


    for(const transaction of transactions){
        let retry = 0;
        let success = false;

        while(!success && retry < 3){

            try {
                await processTransaction(transaction);
                success = true;
            } catch (error) {
               retry++
               if(retry === 3){
                   arr.push(transaction.id)
               }
            }
        }
    }

    return arr
}

export {
    processTransactionsWithRetry,
    processTransaction,
    ITransaction
}