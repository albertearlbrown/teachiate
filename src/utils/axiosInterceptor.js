import {Auth} from "aws-amplify"

export default async function addAuthorizationHeader(config){
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
