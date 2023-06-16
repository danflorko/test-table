# Table-based e-shop

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and provided by [TypeScript](https://github.com/microsoft/TypeScript).

## Contents

- [**Prerequisites**](#prerequisites) - _requirement technologies for the project starting_
- [**Getting Started**](#getting-started) - _instructions for the project starting_
- [**Notable Things**](#notable-things) - _aspects of the work that I would particularly want to highlight_
- [**Task Requirements**](#task-requirements) - _what was done_
  - [**Necessary**](#necessary) - _initial necessary requirements of the task_
  - [**Unnecessary**](#unnecessary) - _unnecessary recommendation for the work_
  - [**Additionally**](#additionally) - _additional new functionality and mechanisms implemented by me for the project_
- [**Used technologies**](#used-technologies) - _technologies that I used (upon requirements and personal choice)_

----

## Prerequisites

To get started with this project, you need to have the following prerequisites installed on your machine:

- `Node.JS`
- `npm` or `yarn`

## Getting Started

Follow these steps to set up and run the project on your local machine:

1. **Open the project directory in your cmd.**
2. **Install all necessary dependencies:**

```bash
npm i
# or
yarn
```

3. **Start the project:**

```bash
npm start
# or
yarn start
```

4. **Open the project:**
The client will be accessible at <http://localhost:3000>.

## Notable Things

- :mortar_board: **decomposition** of components and project structure
- :memo: `memoization`, `lazy-loading`, and `<Suspense />` component usage
- :computer: **react-router** `<Outline />` component usage
- :new: the **latest versions** of all packages
- <details>
    <summary><b>&#10071;&#10071; Generic function for parsing props from an object&#10071;&#10071;</b></summary>

  - [Function](https://github.com/danflorko/test-table/blob/24631698bfe6007cb801db1bd0d5cd40ec89cf8f/src/controller/utils/helpers/index.ts#L16):

    ```typescript
        export const parseProps = <T extends object, C = PropType<T>>(
            items: T[],
            props: (keyof T)[]
        ) =>
            items.reduce(
                (acc: TransposedValues<T, C>, item: T) => ({
                    ...acc,
                    ...props.reduce(
                        (props, prop) => ({
                            ...props,
                            [prop]: [...(props[prop] as C[]), item[prop]],
                        }),
                        acc
                    ),
                }),
                Object.fromEntries(
                    props.map((prop) => [prop, [] as C[]])
                ) as TransposedValues<T, C>
            );
    ```

  - [Additional types](https://github.com/danflorko/test-table/blob/24631698bfe6007cb801db1bd0d5cd40ec89cf8f/src/controller/types/index.ts#L3):

    ```typescript
        export type PropType<T extends object> = T[keyof T];

        export type TransposedValues<T extends object, C = PropType<T>> = {
            [key in keyof T]?: C[];
        };

        export type NumericKeys<T> = {
            [K in keyof T]: T[K] extends number ? K : never;
        }[keyof T];
    ```

  - [Usage example](https://github.com/danflorko/test-table/blob/24631698bfe6007cb801db1bd0d5cd40ec89cf8f/src/view/components/ProductsTable/index.tsx#L53):

    ```typescript
        useEffect(() => {
            const { prices, stocks, ratings } = products.reduce(
                (acc, product) => ({
                    prices: [...acc.prices, product.price],
                    stocks: [...acc.stocks, product.stock],
                    ratings: [...acc.ratings, product.rating],
                }),
                {
                    prices: [] as number[],
                    stocks: [] as number[],
                    ratings: [] as number[],
                }
            );

            setMarginProductsValues({
                minPrice: Math.min(...prices),
                maxPrice: Math.max(...prices),
                minStock: Math.min(...stocks),
                maxStock: Math.max(...stocks),
                minRating: Math.min(...ratings),
                maxRating: Math.max(...ratings),
            });
        }, [products]);
    ```

</details>

- <details>
    <summary><b>Yup-validation builder</b></summary>

  - [Function](https://github.com/danflorko/test-table/blob/24631698bfe6007cb801db1bd0d5cd40ec89cf8f/src/controller/utils/helpers/index.ts#L55):

    ```typescript
        export const validationSchema = Yup.object().shape({
            title: Yup.string().required('Name is required'),
            description: Yup.string(),
            price: Yup.number()
                .positive('Price should be positive number')
                .typeError('Must be a number')
                .required('Price is required'),
            thumbnail: Yup.string().matches(
                new RegExp(
                    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
                    'i'
                ),
                'Enter valid URL for photo!'
            ),
            rating: Yup.number()
                .positive()
                .min(0, 'Min rating 0')
                .max(5, 'Max rating 5')
                .typeError('Must be a number')
                .required('Rating is required'),
            stock: Yup.number()
                .positive('Must be a positive number')
                .integer('Must be an integer number')
                .required('Stock is required'),
            category: Yup.string().required('Category is required'),
        });
    ```

  - [Usage example](https://github.com/danflorko/test-table/blob/24631698bfe6007cb801db1bd0d5cd40ec89cf8f/src/view/components/AddModal/index.tsx#L32):

    ```typescript
        const formik = useFormik<Partial<IProduct>>({
            initialValues: savedLocalStorageValues,
            validationSchema,
            onSubmit: (values, { resetForm }) => {
                dispatch(
                    addProduct({
                        ...values,
                        id: Math.max(...products.map((product) => product.id)) + 1,
                        price: +values.price!,
                        rating: +values.rating!,
                        stock: +values.stock!,
                    })
                );
                resetForm();
                handleClose();
            },
        });
    ```

</details>

----

## Task Requirements

### Necessary

- :white_check_mark: Create an application that consists of several components: a header, a search field, a list of products, and a form for adding a new product. Use **React Router** to create application routes that allow users to navigate between pages.
- :white_check_mark: Use **Redux** to manage the application state. Create a reducer and actions that allow adding, deleting, and updating products.
- :white_check_mark: Create a product list component that receives data from the Redux store and displays it in a table with columns: `ID`, `name`, `description`, `price`, `photo`, `rating`, `stock`, and `category`. Add the ability to sort and filter products by each column.
- :white_check_mark: Add a search field that allows users to search for products by name or category. The product list component should update automatically when the user enters a query in the search field.
- :white_check_mark: Create a form for adding a new product. Use **Formik** and **Yup** to validate the entered data. The form should contain fields for each column.
- :white_check_mark: Add the ability to delete an item from the list and from the Redux store.

### Unnecessary

- :lock_with_ink_pen: **TypeScript**
- :gem: **A try** to beautiful styling
  - :sunrise: simple and friendly colors
  - :rotating_light: css-based animations
  - :rainbow: css-based gradients
  - `:hover`-effects
  - `:active`-effects
  - `position: sticky` usage for **page-** and **table-** headers.
  - :page_facing_up: modals usage
- :rocket: **A try** to use functional paradigm and inline code styling
- :bulb: Additional features (_furthery..._)

### Additionally

- :pushpin: Saving additions/edits state based on `localStorage` (**resistant to page refresh**)
- :pencil: different kinds of filtering (based on field data-type)
  - **text-search** filter
  - **min-max** numeric filter
  - **unique-values-based** select filter for category column
- :mag: **multiple** column filtering
- :tv: **image-slider** for a single _/products/id_
- :books: additional fields for a single _/product/id_
- :rotating_light: **notifications** (`add`, `delete`, `edit`)

## Used technologies

- [**DummyDB**](https://dummyjson.com)
- [**Formik**](https://formik.org)
- [**Yup**](https://github.com/jquense/yup)
- [**Router v6**](https://reactrouter.com/en/main)
- [**Redux Toolkit**](https://redux-toolkit.js.org)
- [Axios](https://github.com/axios/axios)
- [SASS](https://github.com/sass/sass)
- [ClassNames](https://github.com/JedWatson/classnames)

----
Feel free to explore these directories and customize them according to your project requirements.
