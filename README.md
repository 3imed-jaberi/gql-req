# gql-req

[![Build Status][travis-badge]][travis-url] &nbsp;&nbsp;
[![Coverage Status][coveralls-badge]][coveralls-url] &nbsp;&nbsp;
[![NPM version][npm-badge]][npm-url] &nbsp;&nbsp;
[![License][license-badge]][license-url] &nbsp;&nbsp;
![Top Language][top-language-badge] &nbsp;&nbsp;
![Code Size][code-size-badge] &nbsp;&nbsp;
[![Code of Conduct][coc-badge]][coc-url]
[![PRs Welcome][pr-badge]][pr-url] &nbsp;&nbsp;


[travis-badge]: https://travis-ci.org/3imed-jaberi/gql-req.svg?branch=master
[travis-url]: https://travis-ci.org/3imed-jaberi/gql-req

[coveralls-badge]: https://coveralls.io/repos/github/3imed-jaberi/gql-req/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/3imed-jaberi/gql-req?branch=master

[npm-badge]: https://img.shields.io/npm/v/gql-req.svg?style=flat
[npm-url]: https://www.npmjs.com/package/gql-req

[license-badge]: https://img.shields.io/badge/license-MIT-green.svg
[license-url]: https://github.com/3imed-jaberi/gql-req/blob/master/LICENSE

[top-language-badge]: https://img.shields.io/github/languages/top/3imed-jaberi/gql-req

[code-size-badge]: https://img.shields.io/github/languages/code-size/3imed-jaberi/gql-req

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg
[coc-url]: https://github.com/3imed-jaberi/gql-req/blob/master/CODE_OF_CONDUCT.md

[pr-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: https://github.com/3imed-jaberi/gql-req


✨ Minimal and ultra Lightweight GraphQL client <small>(lighter then `graphql-request` ⚡️)<small> that supports Node and browsers for scripts or simple apps 🚀. 

**This is an attempt to revive [`graphql-request`](https://github.com/prisma-labs/graphql-request) ❤️.**

## `Features`

- 🦄 Inspired from `graphql-request` (with almost identical interface).
- 🔥 Most **simple and lightweight** GraphQL client <small>(Lighter then `graphql-request`)<small>.
- ⚖️ Tiny Bundle: 1.515 kB (gzip)
- 📌 Promise-based API (works with `async` / `await`).
- ✨ Isomorphic through `Axios`.
- 🎯 Supports queries through `POST` and `GET`.
- 🎉 Typescript support.


## `Limitation`

- 🚧 No front-end integration.
- 🚧 No Cache System.
- 🚧 No Subscription aka WS <small>(WebSocket)</small> support.


## `Installation`

```bash
# npm
npm install gql-req

## yarn 
yarn add gql-req
```


### `API`

  - `GraphQLClient` &mdash; class for create re-useable client.
  - `request` &mdash; funcs for plain request. 
 
#### Options

The [Options type](https://github.com/3imed-jaberi/gql-req/blob/master/src/index.ts#L12-L16) adopts the [AxiosRequestConfig type](https://github.com/axios/axios/blob/master/index.d.ts#L44-L74) but with few additions and changes.

  - `method` &mdash; http method used to connect with graphql server <small>('GET'/'POST', 'POST' as default)</small>.         
  - `headers` &mdash; key-value object that definite the headers. 
  - `pureDataResponse` &mdash; Unlike graphql-request, I have found __*rawRequest*__ method and __*Request*__ <br/> method are same, for that this option was created. if this option is `true`, the result is equal <br/> to `Request` result <small>(`false` as default)</small>.


## `Usage`

```js
const { request, GraphQLClient } = require('gql-req');

// Run GraphQL queries/mutations using a static function (plain request)
request(endpoint, { query, variables }).then(data => console.log(data));

// ... or create a GraphQL client instance to send requests (re-useable client)
// ... you can also update the header by use `setHeaders` method
// setHeaders(key: string, value: string)
// setHeaders(headers: Headers) with Headers = { [key:string]: string }
const client = new GraphQLClient(endpoint, { headers: {} });
client.request(query, variables).then(data => console.log(data));
```

<!-- > You can play around with it on this sandbox [codesandbox.io/gql-req](link). -->


## `FAQ`

### Why `gql-req` over graphql-request?

Lighter by more then 2 kB, support queries under 'GET' request.

### What's the difference between `gql-req`, Apollo and Relay?

like `graphql-request`, `gql-req` is perfect for small scripts or simple apps.

Compared to GraphQL clients like Apollo or Relay, `gql-req` doesn't have a built-in cache and has no integrations for frontend frameworks. The goal is to keep the package and API as minimal as possible.

### So what about Lokka?

Lokka is great but it still requires [a lot of setup code](https://github.com/kadirahq/lokka-transport-http) to be able to send a simple GraphQL query. `gql-req` does less work compared to Lokka but is a lot simpler to use.


#### License
---

[MIT](LICENSE)