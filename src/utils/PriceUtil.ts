export const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
}