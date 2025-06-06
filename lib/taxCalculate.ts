export function taxCalculate(price: number) {
  return Number((price * 0.05).toFixed(0));
}
