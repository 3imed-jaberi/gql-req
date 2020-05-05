import 'mocha';
import { expect } from 'chai';
import { request, GraphQLClient } from '../src';
import { getUrlForGetReq, axiosService } from './utils';

// Global Vars. ..
const BaseGraphQlUrl = 'https://json-placeholder-graphql.herokuapp.com/graphql';
const headers = { 'Content-Type': 'application/json' };
const pureQuery = `{ posts { id title } }`;
const queryWithVars = `query ($userId: Int!) { posts(userId: $userId) { user { name } title } }`;
const invalidQuery = `{ posts { idss title } }`;

describe('', () => {

  it('GraphQL Client: query under POST', async () => {
    const responseAxios = await axiosService({ url: BaseGraphQlUrl, data: { query: pureQuery }, headers });
    const client = new GraphQLClient(BaseGraphQlUrl, { method: 'POST' });
    const response = await client.request(pureQuery).then(response => response.data);
      
    expect(response.data).to.deep.equal(responseAxios.data);
  });
    
  it('GraphQL Client: query under GET', async () => {
    const url = getUrlForGetReq(BaseGraphQlUrl, pureQuery);
    const responseAxios = await axiosService({ url });
    const client = new GraphQLClient(BaseGraphQlUrl, { method: 'GET' });
    const response = await client.request(pureQuery).then(response => response.data);

    expect(response.data).to.deep.equal(responseAxios.data);
  });

  it('GraphQL Client: query with variables under POST', async () => {
    const responseAxios = await axiosService({ url: BaseGraphQlUrl, data: { query: queryWithVars, variables: { userId: 1 } }, headers });
    const client = new GraphQLClient(BaseGraphQlUrl, { method: 'POST' });
    const response = await client.request(queryWithVars, { userId: 1 }).then(response => response.data);
    
    expect(response.data).to.deep.equal(responseAxios.data);
  });

  it('GraphQL Client: query using GET with URL query params', async () => {
    const url = getUrlForGetReq(`${BaseGraphQlUrl}?q=omda&page=1`, pureQuery);
    const responseAxios = await axiosService({ url });
    const client = new GraphQLClient(BaseGraphQlUrl, { method: 'GET' });
    const response = await client.request(pureQuery).then(response => response.data);

    expect(response.data).to.deep.equal(responseAxios.data);
  });

  it('GraphQL Client: pureDataResponse Option [solution for response.data.data]', async () => {
    const responseAxios = await axiosService({ url: BaseGraphQlUrl, data: { query: pureQuery }, headers });
    const client = new GraphQLClient(BaseGraphQlUrl, { method: 'POST', pureDataResponse: true });
    const responseData = await client.request(pureQuery).then(response => response.data);
    
    expect(responseData).to.deep.equal(responseAxios.data);
  });

  it('Request Hooks: minimal query using POST', async () => {
    const responseAxios = await axiosService({ url: BaseGraphQlUrl, data: { query: pureQuery }, headers });
    const response = await request(BaseGraphQlUrl, { query: pureQuery }).then(response => response.data);
    
    expect(response.data).to.deep.equal(responseAxios.data);
  });

  it('GraphQL Client: setHeaders method using key and value as string', async () => {
    const responseAxios = await axiosService({ url: BaseGraphQlUrl, data: { query: pureQuery }, headers: { ...headers, 'SOME-HEADER-KEY': 'SOME-HEADER-VALUE' } });
    const client = new GraphQLClient(BaseGraphQlUrl, { method: 'POST' });
    const response = await client.setHeaders('SOME-HEADER-KEY', 'SOME-HEADER-VALUE').request(pureQuery).then(response => response.data);
      
    expect(response.data).to.deep.equal(responseAxios.data);
  });

  it('GraphQL Client: setHeaders method using key and value as object', async () => {
    const responseAxios = await axiosService({ url: BaseGraphQlUrl, data: { query: pureQuery }, headers: { ...headers, 'SOME-HEADER-KEY': 'SOME-HEADER-VALUE' } });
    const client = new GraphQLClient(BaseGraphQlUrl, { method: 'POST' });
    const response = await client.setHeaders({ 'SOME-HEADER-KEY': 'SOME-HEADER-VALUE' }).request(pureQuery).then(response => response.data);
      
    expect(response.data).to.deep.equal(responseAxios.data);
  });

  it('GraphQL Error: invalid query', () => {
    expect((async () => await request(BaseGraphQlUrl, { query: invalidQuery }))()).to.Throw;
  });

  it('GraphQL Error: invalid url/uri/path/link', () => {
    expect((async () => await request(`${BaseGraphQlUrl}sdsqfds`, { query: pureQuery }))()).to.Throw;
  });

});