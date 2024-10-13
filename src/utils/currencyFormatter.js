const formatter = new Intl.NumberFormat('en-NG',{
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: "symbol",
    currencySign: "accounting",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})
export default formatter