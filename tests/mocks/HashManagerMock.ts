export class HashManagerMock {
    public hash = async (
      plaintext: string
    ): Promise<string> => {
      return "hash-mock"
    }

    public compare = async (
      plaintext: string,
      hash: string
    ): Promise<boolean> => {
      switch(plaintext) {
        case "dev123":
          return hash === "hash-mock-dev"

        case "astrodev21":
          return hash === "hash-mock-astrodev"
          
        default:
          return false
      }
    }
}