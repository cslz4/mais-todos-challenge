/* eslint-disable testing-library/prefer-screen-queries */
import { customRender } from "@/tests/utils"
import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { ProductForm } from "./ProductForm"


let onSubmit: jest.Mock<any>
let file: File;

beforeEach(() => {
  onSubmit = jest.fn()
  file = new File(["(⌐□_□)"], "example.png", { type: "image/png" });
});

test('submit values correctly', async () => {
  const utils = customRender(<ProductForm onSubmit={onSubmit} />)

  const name = utils.getByLabelText('Nome')
  const slug = utils.getByLabelText('Slug')
  const description = utils.getByLabelText('Descrição')
  const image = utils.getByLabelText('Imagem')
  const price = utils.getByLabelText('Valor')
  const submitButton = utils.getByRole('button', { name: "Enviar" })

  userEvent.type(name, "T-shirt black")
  userEvent.type(description, "Cheapest Black T-shirt")
  userEvent.upload(image, file)
  userEvent.type(price, "10")
  userEvent.click(submitButton)

  expect(slug).toHaveDisplayValue('t-shirt-black')
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({
      description: "Cheapest Black T-shirt",
      image: expect.anything(),
      slug: 't-shirt-black',
      price: 10,
      name: 'T-shirt black',
    }, expect.anything())
  })
})

test('generate product slug automatically', async () => {
  const utils = customRender(<ProductForm onSubmit={onSubmit} />)

  const name = utils.getByLabelText('Nome')
  const slug = utils.getByLabelText('Slug')

  userEvent.type(name, "T-shirt black")
  expect(slug).toHaveDisplayValue('t-shirt-black')

  userEvent.clear(name)
  userEvent.type(name, "T@-S@H$I^R*T")
  expect(slug).toHaveDisplayValue('t-shirt')

})

