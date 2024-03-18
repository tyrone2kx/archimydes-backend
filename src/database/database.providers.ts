import * as mongoose from 'mongoose';
import { InjectionKeys } from 'src/utils/enums';

export const databaseProviders = [
  {
    provide: InjectionKeys.utils.database,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        'mongodb+srv://navihealth_dev:g2VrniNbRFZJ6wbQ@dev-staging.twpodek.mongodb.net/navihealth_dev',
      ),
  },
];
