export type User = {
  isAuthenticated: boolean;
  userData?: any;
  token?: string;
  expireTs?: Date;
};
