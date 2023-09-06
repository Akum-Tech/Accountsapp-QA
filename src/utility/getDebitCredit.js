exports.getDebitCredit = async function (array) {
    try {
        let debit = 0;
        let credit = 0;
        await array.forEach((element, index) => {
            debit =  (Number(debit) + Number(element.debitAmount));
            credit = (Number(credit) + Number(element.creditAmount));
        });
        let data = Number(debit)-Number(credit);
        return data > 0?{credit:data, debit:0}:{credit:0, debit:data*-1}
    } catch (e) {
       console.log(e)
    }
}
