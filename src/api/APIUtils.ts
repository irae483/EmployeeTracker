
/// ENVIRONMENTS
export const url = 'http://localhost:5000/api/';

/// API CALLS
export const getData = async(url: string):
    Promise<any> => {
      console.log("about to send");
      const res = await fetch(url, {method: 'GET'});
      console.log(res);
      return res.status === 200 ? await res.json() : undefined;
    }

export const postData = async(url: string, jsonBody: string):
    Promise<Response> => {
      const res = await fetch(url, {
        method: 'POST',
        body: jsonBody
      });
      return await res;
    }

export const putData = async(url: string, jsonBody: string):
    Promise<Response> => {
      const res = await fetch(url, {
        method: 'PUT',
        body: jsonBody
      });
      
      return await res;
    }

/// MODEL CONVERSIONS
export const convertToModel = <T>(json: any, fromJson: Function):
    T[] => {
      const array: T[] = [];
      for (let j of json) {
        const obj = fromJson(j);
        array.push(obj);
      }

      return array;
    }

export const convertToSingularModel = <T>(json: any, fromJson: Function):
    T => {
      return fromJson(json);
    }

