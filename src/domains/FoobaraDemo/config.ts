let _urlBase = process.env.REACT_APP_FOOBARA_GLOBAL_URL_BASE

const config = {
  get urlBase (): string {
    if (_urlBase === undefined) {
      throw new Error('urlBase is not set and REACT_APP_FOOBARA_GLOBAL_URL_BASE is undefined')
    }

    return _urlBase
  },
  set urlBase (urlBase: string) {
    _urlBase = urlBase
  }
}

export default config
