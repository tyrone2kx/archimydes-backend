import * as mongoose from 'mongoose';
import { RolesEnum } from 'src/utils/enums';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: Object.values(RolesEnum) },
});
