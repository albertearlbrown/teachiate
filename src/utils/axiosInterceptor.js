import {Auth} from "aws-amplify"
import socketClient  from "socket.io-client";

const baseUrl = process.env.NODE_ENV === 'development'?"http://localhost:4000":"https://api.teachiate.com"

export async function addAuthorizationHeader(config){
  // add try catch for public routes
  try {
    const session = await Auth.currentSession(); // return the current token or refresh it if no longer valid

    if (session && session.idToken) {
      config.headers.Authorization = session.idToken.jwtToken;
    }
    return config
  } catch (e) {
    return config
  }
}

export async function configureSocket(baseURL = baseUrl){
  let socket = null;
  let extraHeaders = {}
  try {
    const session = await Auth.currentSession(); // return the current token or refresh it if no longer valid
    if (session && session.idToken) {
      extraHeaders = {
        transportOptions: {
          polling: {
            extraHeaders: {
              'Authorization': session.idToken.jwtToken
            }
          }
        }
      }
      socket = socketClient(baseURL, extraHeaders)
    }
    return socket
  } catch (e) {
    return socket
  }
}
