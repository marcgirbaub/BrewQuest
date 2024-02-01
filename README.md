# **Instructions**

The application is deployed and available on Vercel. You can access the production version at the following URL:
https://brewquest.vercel.app/

If you prefer to run the application locally, please follow the below instructions.

You will also find additional information and comments below.

## **Getting started**

Node version: **18.15.0**

To start the project, first you need to **install** the dependencies with npm. Run the following command in the project root:

```
npm install
```

To start the app in **development mode**, run:

```
npm run dev
```

To start the app in **production mode**, first you need to run the build and then start the app by running the following commands:

```
npm run build

npm run preview
```

You will be able to access the application at **http://localhost:5173**.

## **Running tests**

To run the **test** suite, use the following command:

```
npm run test // npm run test:coverage
```

To run **e2e tests**, run the following command and run all specs on cypress. _Please note that you need to have the app running in development mode to run the e2e tests._

```
npm run cypress:open
```

## Development Approach

This project was developed through small, iterative deliveries, which allows for rapid adjustments to changing requirements and feedback in a real-world project. My approach was mainly to break down the larger project into smaller, manageable problems, addressing them one at a time. This strategy facilitates a smoother development process and enables me to maintain a high level of focus and efficiency.

## **Additional information and comments**

- Developed following **SOLID** and **Clean Code** principles.

- The **Adapter Pattern** was utilized in a manner where a custom hook is tasked with data fetching and processing. The `useGetBeers` reusable hook acts as a bridge between the **data model returned by the API** and the **data model required by the developed React components**.

- The **Container Component Pattern** was also implemented to achieve **separation of concerns**. Container components were used to handle state management and logic, while presentational components render the UI based on the data provided by the containers. This approach enhances **code organization**, **maintainability** and **testability**.

- `useQuery` was employed to handle **data fetching and caching**. The application was designed with consideration for the Punk API's rate limiting, achieving a **lower** number of requests and consequently providing a **better user experience**.

- **Testing:**

  [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=marcgirbaub_BrewQuest&metric=coverage)](https://sonarcloud.io/summary/new_code?id=marcgirbaub_BrewQuest)

  - **Unit and integration tests** at component and function level were implemented to ensure that the app is **robust** and **reliable**. Using **Vitest** and **React Testing Library**, the app has a **testing coverage** up to **90%**. **MSW** (mock service worker) was used to mock API calls in the test environment, so that the tests are **isolated** from the API.
  - **E2E testing** at page and user interaction level were performed using **Cypress**. API requests were also mocked for e2e testing.
  - **Behaviour Driven Development** was used to write the tests, using **Gherkin** syntax and **Given-When-Then** structure to make them more **readable** and **maintainable**.

- **Data Persistance**: favourite beers and theme mode persist in the client using **zustand** and **local storage**.

- **CI/CD** tools such as **Commitlint**, **Husky**, **Lint-staged**, **Github Actions** and **SonarCloud** were implemented to ensure that the code is **consistent** and **error-free**.
- A clean **GIT** branching strategy was followed to keep the project **organized** and **clean**.

- **UI Enhancement**: UI was built with a mobile first approach and using Material UI to style an **intuitive user interface** that ensures a **seamless** and **accessible experience**.

## **Next Steps**

I would mainly focus on implementing small features that provide the highest value to the user:

- Creating a 'My Beers' page for users to see their favourite beers. Since the components are reusable, it would be easily implemented.
- Adding a button to reset the search.
- Adding pagination to the search results.
- Creating a beer detail page.
- Prefetching the next set of random beers one click in advance to prevent making the user wait for the request to succeed.

From a technical perspective, I would aim to make my software more robust and reliable by:

- Identifying and addressing rare corner cases and implementing unit and end-to-end tests for those cases.
- Encapsulating logic in reusable custom hooks as the application grows larger, enhancing maintainability and code reuse.
