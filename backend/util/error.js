//Custom error allows me to attage a message and a status code and a custome message for the front end in case it needs it 
export default class HTTPError extends Error(){
    constructor(errCode,message,customFrontEndMessage){
      super(message); // Passes the message to the parent Error class
      this.name = "HttpError"; // Sets the error type name
      this.customFrontEndMessage = customFrontEndMessage; //custome message to be used by the frontEnd
      this.statusCode = statusCode; // Attaches your custom HTTP code
    }
}

