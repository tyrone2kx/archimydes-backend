import * as mongoose from 'mongoose';
import { InjectionKeys } from 'src/utils/enums';
import { UserSchema } from './schemas/user.schema';

export const userProviders = [
  {
    provide: InjectionKeys.models.User,
    useFactory: async (mongoose: mongoose.Mongoose) =>
      mongoose.model('User', UserSchema),
    inject: [InjectionKeys.utils.database],
  },
];
