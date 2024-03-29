import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({
  collection: 'User',
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ unique: true, required: true, type: String })
  email: string;

  @Prop({ required: true, enum: Object.values(RolesEnum), type: String })
  role: RolesEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
