// prettier-ignore
const headers = {
  "accept": "application/json",
  "content-type": "application/json",
  "access-control-allow-origin": "*"
};

function joinURL(baseUrl, url) {
  return `${baseUrl}/${url}`;
}

let API_URL = process.env.REACT_APP_API_URL;
class httpService {
  constructor() {
    this.domain = API_URL;
  }
  request(url, method = "POST", data = null, config) {
    url = joinURL("https://somosmas-server.herokuapp.com", url);
    let options = {
      headers,
      method,
    };
    if (data) {
      options.body = JSON.stringify({ ...data });
    }
    let jwtoken = localStorage.getItem("token");
    if (jwtoken) {
      options.headers = { ...options.headers, Authorization: `Bearer ${jwtoken}` };
    }
    /* Para intentar fetchear las imagenes con el servicio http, ya que tiene otro tipo de encabezado 
      if(config) {
        if(config.replace) {
          delete config.replace;
          options = {...config}
        } else {
          delete config.replace;
          for(const prop in config){
            if(options[prop]){
              options[prop] = {...options[prop], ...config[prop]}
            }
          }
        }
    } */
    return fetch(url, options);
  }
  get(url, id, config) {
    const method = "GET";
    if (id) {
      url = `${url}/${id}`;
    }
    //                               parámetro data no necesario
    return this.request(url, method, ...[,], config).then((res) => res.json());
  }
  post(url, data, config) {
    const method = "POST";
    return this.request(url, method, data, config).then((res) => res.json());
  }
  delete(url, id, config) {
    const method = "DELETE";
    if (id) {
      url = `${url}/${id}`;
    }
    //                               parámetro data no necesario
    return this.request(url, method, ...[,], config).then((res) => res.json());
  }
  patch(url, id, data, config) {
    const method = "PATCH";
    if (id) {
      url = `${url}/${id}`;
    }
    return this.request(url, method, data, config).then((res) => res.json());
  }
  put(url, id, data, config) {
    const method = "PUT";
    if (id) {
      url = `${url}/${id}`;
    }
    return this.request(url, method, data, config).then((res) => res.json());
  }
}

//  Example for implementation:
//  const service = new httpService();
//  useEffect(() => {
//    service.post("mails/johndoe@gmail.com", data, config);   --> config con la opcion replace: true para reemplazar el objeto
//                                                                 options ( options[headers] = config[headers], options[prop] = config[prop] ),
//                                                                 sin opcion replace o replace: false, para unir o sobreescribir a las
//                                                                 opciones del objeto options de la clase httpService
//                                                                 ( options[headers] = {...options[headers], ...config[headers]} ) .
//  });

export default httpService;
