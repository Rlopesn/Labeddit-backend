import { USER_ROLES } from '../../src/models/User'
import { TokenPayload } from '../../src/services/TokenManager'

export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      // signup de nova conta
      return "token-mock"

    } else if (payload.id === "id-mock-dev") {
      // login de dev (conta normal)
      return "token-mock-dev"

    } else if (payload.id === "id-mock-astrodev") {
      // login de astrodev (conta admin)
      return "token-mock-astrodev"
    } else if (payload.id === "id-mock-rafael") {
      return "token-rafael"
    }

    return ""
  }

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-dev") {
      return {
        id: "id-mock-dev",
        name: "Dev",
        role: USER_ROLES.NORMAL
      }

    } else if (token === "token-mock-astrodev") {
      return {
        id: "id-mock-astrodev",
        name: "Astrodev",
        role: USER_ROLES.ADMIN
      }
    } else if (token === "token-rafael") {
      return {
        id: "id-mock-rafael",
        name: "Rafael",
        role: USER_ROLES.NORMAL
      }
    }

    return null
  }
}