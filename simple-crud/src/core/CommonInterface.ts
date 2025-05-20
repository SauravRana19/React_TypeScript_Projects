export interface CommonState {
  role: "admin" | "user" | string;
  authToken: string;
  isLoader:boolean
}

export interface State {
  commonMethods: CommonState;
}
