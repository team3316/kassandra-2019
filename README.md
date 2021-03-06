# Kassandra

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![docstring style](https://img.shields.io/badge/docstring%20style-jsdocs-brightgreen.svg)](http://usejsdoc.org/)
[![dependencies Status](https://img.shields.io/david/Team3316/kassandra.svg)](https://david-dm.org/team3316/kassandra-2019)
[![devDependencies Status](https://img.shields.io/david/dev/Team3316/kassandra.svg)](https://david-dm.org/team3316/kassandra-2019?type=dev)
>D-Bug's scouting system, built using React, Redux, Express and Sequelize

## Setup

Kassandra is built using **Node.js**, and uses a **PostgreSQL** server as its database.

If you want to use a different SQL-based database you need to install the corresponding node module and configure Sequelize accordingly.

### Configuration

Make a `.env` file at the root folder with the same fields as `template.env` and fill the fields according to your environment.

### Deployment

```Bash
# Clone the repository and change directory
git clone https://github.com/team3316/kassandra-2019.git && cd kassandra-2019
# Install the node dependencies
npm install
# Build the code
npm run build
# Start the server
npm run start
```

## Scripts

`npm run lint` - Lints the code using [ESLint](https://eslint.org/) in [Standard](https://standardjs.com/) style

`npm run build` - Builds the code using [Webpack](https://webpack.js.org/) with [Babel](https://babeljs.io/)

`npm run watch` - Builds the code in watch mode

`npm run start` - Serves using [Express](https://expressjs.com/)

`npm run dev` - Starts the server in [Nodemon](https://nodemon.io/)
