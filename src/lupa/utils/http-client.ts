export class HttpClient {
  private static instance: HttpClient;

  static getInstance(): HttpClient {
    if (!this.instance) {
      this.instance = new HttpClient();
    }
    return this.instance;
  }

  fetch(url: string, queryParams?: any): Promise<any> {
    let fetchUrl = url;
    if (queryParams) {
      const encodeParams = this.obj2UrlParams(queryParams);
      fetchUrl = `${url}?${encodeParams}`;
    }

    return fetch(fetchUrl)
      .then(response => response.json())
      .catch(error => error);
  }

  obj2UrlParams(obj: any) {
    const pairs = [];

    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        const k = prop;
        const v = encodeURIComponent(obj[prop]);
        if (obj[prop] !== undefined) {
          pairs.push(k + '=' + v);
        }
      }
    }

    return pairs.join('&');
  }
}
