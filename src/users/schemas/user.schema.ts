import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User{
    @Prop({trim: true, lowercase: true, unique: true, required: [true, "Email address is required"], match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']})
    email : string
    @Prop({required: true})
    password: string
    @Prop({required: true})
    username : string
}
export const UserSchema = SchemaFactory.createForClass(User);