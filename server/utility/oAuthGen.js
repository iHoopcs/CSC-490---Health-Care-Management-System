const crypto = require('crypto');
//import { FS_ID, FS_OA1_API_KEY } from '$env/static/private';
const { v4: uuidv4 } = require('uuid');
const FS_ID = process.env.FS_ID;
const FS_OA1_API_KEY = process.env.FS_AUTH_KEY;

class oAuthGen {
  constructor(httpMethod, url, inputParameters) {
    this.requestUrl = url;
    this.httpMethod = httpMethod.toUpperCase();
    this.inputParameters = {
      ...inputParameters,
      format: 'json',
      oauth_consumer_key: FS_ID,
      oauth_nonce: uuidv4(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(new Date().getTime()),
      oauth_version: '1.0'
    };
    this.paramString = this.buildRequestParameterString();
    this.signature = this.buildSignature();
    return { paramString: this.paramString, signature: this.signature };
  }

  buildSignature() {
    let method = encodeURIComponent(this.httpMethod);
    let url = encodeURIComponent(this.requestUrl);
    let params = encodeURIComponent(this.paramString);
    let signature = crypto
      .createHmac('sha1', `${FS_OA1_API_KEY}&`) //This "&" at the end cost me hours.
      .update(`${method}&${url}&${params}`)
      .digest()
      .toString('base64');
    return encodeURIComponent(signature);
  }

  buildRequestParameterString() {
    let params = '';
    Object.entries(this.inputParameters)
      .sort()
      .forEach((cur) => (params += `&${encodeURI(cur[0])}=${encodeURI(cur[1])}`));
    params = params.substring(1);
    return params;
  }
}

module.exports = oAuthGen;
