export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export const InjectionKeys = {
  utils: { database: 'DATABASE_CONNECTION' },
  models: {
    User: 'user_model',
  },
};
