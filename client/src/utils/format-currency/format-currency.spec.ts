import { formatCurrency } from "./format-currency"

test('format currency', () => {
  const numbers = [20, 12.99998, 1.2, 0.1, 41]

  const sut = numbers.map(formatCurrency)

  expect(sut).toEqual([
    "R$ 20,00",
    "R$ 13,00",
    "R$ 1,20",
    "R$ 0,10",
    "R$ 41,00",
  ])
})
