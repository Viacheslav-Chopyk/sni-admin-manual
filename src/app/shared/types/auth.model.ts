export interface AuthModel {
  success: boolean,
  data: {
    token: string,
    verify: {
      phone: string,
      email: string
    }
  }
}
