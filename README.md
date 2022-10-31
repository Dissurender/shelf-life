[![](https://img.shields.io/github/issues/dissurender/shelf-life)](https://github.com/Dissurender/shelf-life/issues) [![](https://img.shields.io/github/license/dissurender/shelf-life)](https://github.com/Dissurender/shelf-life/blob/main/LICENSE) ![](https://img.shields.io/github/languages/top/dissurender/shelf-life)

# Shelf Life

## Description

ShelfLife looks to create a space for friends to gather and discuss books that they have read or are currently reading:

- I built this project to have a place to host read-alongs
- Using ShelfLife, discussions are created with page position spoilers
- Learned concepts: Nested DB objects, state filtering

<!-- ## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#how-to-contribute) -->

## Features

* Timeline style posting board
* Personal favorites list
* Ability to react to others' comments

## Installation

Standard Node install behavior

* `npm install`

## Usage

To run locally use `npm run dev` in your terminal, `npm build` to deploy as service

### Things to add

- `set up prettier/eslint to personal preference`
- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 8000 (can be any port example: 3000)
  - DB_STRING = `your database URI` (Don't forget the specify database other than default)
  - CLOUD_NAME = `cloudinary cloud name`
  - API_KEY = `cloudinary api key`
  - API_SECRET = `cloudinary api secret`

## How to Contribute

Please veiw the issues tab or open a discussion for non-listed issues.
Adhere to the [Contributor Covenant](https://www.contributor-covenant.org/)
