<p align="center">
  <img width="560px" src="./assets/banner.png">
</p>
<p align="center">
  <img alt="React" src="https://img.shields.io/static/v1.svg?label=&message=React&style=flat-square&color=61daeb">
  <img alt="Typescript" src="https://img.shields.io/static/v1.svg?label=&message=Typescript&style=flat-square&color=007acc">
  <img src="https://img.shields.io/github/license/Karunika/cart-app?style=flat-square&logo=appveyor" />
</p>


# About
A basic web-based applicaition to keep track of your shopping list and estimate budget in advance. 

> The app is still in development yet sufficiently developed to be usable.

## Storage
It is not integerated with any database. The data is persisted temporarily in the localStorage.

## Drag & Drop
The app supports drag and drop allowing vertical sorting of your Carts and the Cart Articles.

<!-- TODO: ## Responsive -->

# Setup Development Environment
## Clone Repo
```bat
git clone https://github.com/Karunika/cart-app.git
cd cart-app
```
## Install Dependencies
```bat
npm i
```
## Spin up a Local Development Server
```bat
npm start
```
Go to [http://localhost:3000](http://localhost:3000) to view the app.

## Run Linter
```bat
npm lint
```
## Fix Linter errors
(only the corrigible ones)
```bat
npm lint:fix
```

# Built With
* [Redux ToolKit](https://redux-toolkit.js.org/)
* [Redux Router v6](https://reactrouter.com/)
* [TailwindCSS](https://tailwindcss.com/)
* [React Icons](https://react-icons.github.io/react-icons)
* [React Beautiful dnd](https://github.com/atlassian/react-beautiful-dnd)

...and many more.
For more details, see [package.json](package.json).

# Contribute
`cart-app` is an open source project, and any sort of contributions are welcome and appreciated. Feel free to open issues, report bugs, or make feature requests, I'll try my best to work on them.

# License
This project is open source and available under the [MIT License](LICENSE).