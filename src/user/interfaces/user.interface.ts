import { Document } from 'mongoose';
import { RolesEnum } from 'src/utils/enums';

export interface User extends Document {
  readonly name: string;
  readonly role: RolesEnum;
  readonly email: string;
}
