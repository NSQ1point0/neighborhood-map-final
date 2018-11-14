class Helper{
  static baseURL(){
    return "https://api.foursquare.com/v2"
  }

  static auth(){
    const keys = {
      client_id: "ZNIMKFURUTGVO4IW2RV2HAZDPOEN2IUADX3JQW2DOECUB5R2",
      client_secret: "RFSY3OZTP4MTXB3MLSBF5JK1GDFZ1EFITGWHIOS45RU5MAV3",
      v: "20181104"
    }
    return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&")
  }

  static urlBuilder(urlPrams){
    if(!urlPrams){
      return ""
    }
    return Object.keys(urlPrams).map(key => `${key}=${urlPrams[key]}`).join("&")
  }

  static headers(){
    return {
      Accept: "application/json"
    }
  }

  static simpleFetch(endPoint, method, urlPrams){
    let requestData = {
      method,
      headers: Helper.headers()
    }
    return fetch(
      `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
        urlPrams
      )}`, requestData
    ).then(request => request.json());
  }
}

export default class FoursquareAPI{
  static search(urlPrams){
    return Helper.simpleFetch("/venues/search", "GET", urlPrams)
  }
  static getVenueDetails(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET")
  }
  static getVenuePhotos(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET")
  }
}
