import axios, { AxiosRequestConfig } from 'axios'
import { parse as parseUrl, format as formatUrl } from 'url'
import qs from 'querystring'

// Types Dec.
type Variables = { [key: string]: unknown }

interface Headers { [key: string]: string }

type HttpMethod = 'get' | 'GET' | 'post' | 'POST'

interface Options extends AxiosRequestConfig {
  method?: HttpMethod
  headers?: Headers
  pureDataResponse?: boolean
}

interface GraphQLResponse {
  data?: unknown
  errors?: GraphQLError[]
  extensions?: unknown
  status: number
  [key: string]: unknown
}

interface GraphQLRequestContext {
  query: string,
  variables?: Variables
}

interface GraphQLError {
  message: string
  locations: { line: number, column: number }[]
  path: string[]
  [key: string]: unknown
}

// GraphQL Error Handler ..
class ClientError extends Error {

  response: GraphQLResponse
  request: GraphQLRequestContext

  constructor (response: GraphQLResponse, request: GraphQLRequestContext) {
    const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({ response, request })}`

    super(message)

    Object.setPrototypeOf(this, ClientError.prototype) // graphQL-request PR #101

    this.response = response
    this.request = request

    // this is needed as Safari doesn't support .captureStackTrace
    // if (typeof Error.captureStackTrace === 'function') {
    //   Error.captureStackTrace(this, ClientError)
    // }
  }

  private static extractMessage (response: GraphQLResponse): string {
    try {
      return response.errors![0].message
    } catch (e) {
      return `GraphQL Error (Code: ${response.status})`
    }
  }
}

// GraphQL Client ..
class GraphQLClient {
  private url: string
  private options: Options

  constructor(url: string, options?: Options) {
    this.url = url
    this.options = options || {}
    this.options.method = this.options.method || 'POST'
  }

  private getUrlForGetReq(query: string, variables?: Variables) {
    const parsedUrl = parseUrl(this.url)

    return formatUrl({
      ...parsedUrl,
      search: qs.stringify({
        ...qs.parse(parsedUrl.search || ''),
        query,
        variables: JSON.stringify(variables),
      })
    })
  }

  public async request<T extends any>(query: string, variables?: Variables): Promise<T> {
    try {
      const { headers, method, pureDataResponse, ...others } = this.options
      const isPostReq = method === 'POST'
      const response = await axios({
        url: isPostReq ? this.url : this.getUrlForGetReq(query, variables),
        method: method,
        headers: isPostReq ? Object.assign({ 'Content-Type': 'application/json' }, headers) : headers,
        data: isPostReq ? JSON.stringify({ query, variables: variables ? variables : undefined }) : '',
        ...others
      })

      return !pureDataResponse ? response : response.data
    } catch (error) {
      throw new ClientError(
          { ...error.response.data.errors, status: error.response.status },
          { query, variables }
        )
    }
  }

  public setHeaders(headersOrKey: Headers | string, value?: string): GraphQLClient {
    this.options.headers = (
      typeof headersOrKey === 'string'
      ?
      { ...this.options.headers, [headersOrKey]: value } as Headers
      :
      { ...this.options.headers, ...headersOrKey }
    )

    return this
  }
}

async function request(url: string, payload: GraphQLRequestContext) {
  return new GraphQLClient(url).request(payload.query, payload.variables)
}

// export ..
export { GraphQLClient, request }