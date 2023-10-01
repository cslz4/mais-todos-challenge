export function formatCurrency(number: number) {
  const float = number.toFixed(2).replace('.', ',')

  return `R$ ${float}`
}
