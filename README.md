# Mais Todos - Challenge React

Projeto desenvolvido em React para o Challenge da Mais Todos (https://github.com/MaisTodos/challenge-frontend-react)

![mais todos store](https://github.com/cslz4/mais-todos-challenge/blob/main/assets/store.png?raw=true)

## Bibliotecas utilizadas

- **axios** (^1.5.1): Uma biblioteca JavaScript para fazer requisições HTTP no navegador e no Node.js. É amplamente utilizada para realizar solicitações de API de forma eficiente.

- **react-hook-form** (^7.47.0): Uma biblioteca popular para lidar com formulários em aplicativos React. Ela oferece uma maneira eficaz de gerenciar o estado do formulário e validação.

- **react-router-dom** (^6.16.0): Uma biblioteca para roteamento de páginas em aplicativos React. Ela permite criar aplicativos de página única (SPA) com navegação suave entre diferentes componentes e URLs.

- **typescript** (^4.4.2): Uma linguagem de programação superset do JavaScript que adiciona tipagem estática ao JavaScript. É amplamente utilizado para desenvolvimento em larga escala e melhoria da segurança e manutenção do código.

- **zod** (^3.22.2): Uma biblioteca para validação de esquema de dados em TypeScript. Ela ajuda a definir e validar estruturas de dados de forma segura e eficiente.

- **zustand** (^4.4.1): Uma biblioteca de gerenciamento de estado para React baseada em hooks. Ela fornece uma maneira simples e eficaz de gerenciar o estado do aplicativo com o mínimo de boilerplate.

- **stripe** (^13.8.0): Uma biblioteca para integrar a funcionalidade de pagamento da plataforma Stripe

## Executando o projeto localmente

```
npm run prepare
npm run start
```

# Executando os testes
```
npm run test
```

## Adicionando um produto
```
Clicar em "+" no header
```
![adicionar produto](https://github.com/cslz4/mais-todos-challenge/blob/main/assets/add-product.png?raw=true)
## Editando um produto
```
Acessar qualquer produto da lista e clicar em "Editar produto"
```
![editar produto](https://github.com/cslz4/mais-todos-challenge/blob/main/assets/edit-product.png?raw=true)

## Deletando um produto
```
Acessar qualquer produto da lista, clicar em "Editar produto" e depois em "Deletar produto"
```

## Alguns padrões utilizados
Em projetos que não utilizam 100% clean arch procuro sempre utilizar padrões dessa arquitetura para facilitar a manutenção, testes, reaproveitamento, etc.

### Inversão de dependência
No exemplo abaixo a funcão de submissão é recebida como prop o que pode ser considerado uma inversão de dependência. Isso torna possível reutlizar o mesmo formulário para edição e adição do produto, apenas trocando a função de submissão.
```tsx
function FormWrapper() {
  const handleSubmit = (values) => {
    ...
  }

  return (
    <ProductForm onSubmit={handleSubmit} />
  )
}
```
### Expondo nós da DOM
Em certos componentes se faz necessário utilizar a função ``forwardRef`` para expor um nó da DOM para um componente pai. Útil em casos que um componente, seja interno ou de biblioteca, adiciona event handlers ao componente filho.

```tsx
import { forwardRef } from "react";

type ButtonIconProps = {
  as?: React.ElementType | keyof JSX.IntrinsicElements
} & React.ComponentProps<any>

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(({ children, as = "button", ...props }, ref) => {
  const Component = as

  return  (
    <Component ref={ref} type="button" {...props}>
      {children}
    </Component>
  )     
})
```

### Polimorfismo
Utilizando o mesmo exemplo acima, a prop ``as`` permite alterar a tag renderizada, evitando a duplicação de código em casos que precisamos renderizar um botão como uma âncora por exemplo.

### Optimistic Updates
Com React Query podemos atualizar de forma Otimista nossa UI, ou seja, refletir de forma imediata uma alteração que ainda está ocorrendo e assim melhorar a experiência do usuário.
```tsx
const { mutate: updateCart } = useMutation({
  mutationFn: updateCartService,
  onMutate: async (newCart) => {
    await queryClient.cancelQueries({ queryKey: queryKey })
    const previousValue = queryClient.getQueryData(queryKey)
    queryClient.setQueryData<Cart>(queryKey, (old) => ({...old!, products: newCart.products}))

    return { previousValue }
  },
  onError: (_err, _newCart, context) => {
    queryClient.setQueryData(getCartQueryKey(cartId), context?.previousValue)
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: queryKey })
  },
})
```
