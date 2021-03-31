import * as argon2 from 'argon2';
import { User } from '../entities/User';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";

@InputType()
class RegisterInput {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [String], { nullable: true })
  errors?: string[];

  @Field(() => User, { nullable: true })
  user?: User;
}

const validateInput = (input: RegisterInput) => {
  if (input.password.length < 6) {
    return [
      "Password length must be greater than or equal to",
    ];
  }

  return null;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const result = await User.find({});
    return result;
  }
  @Mutation(() => UserResponse)
  async register(@Arg("input") input: RegisterInput): Promise<UserResponse> {
    const validationErrors = validateInput(input);

    if (validationErrors) {
      return {
        errors: validationErrors,
      };
    }

    const hashed = await argon2.hash(input.password);
    try {
      const user = await User.create({
        email: input.email,
        username: input.username,
        password: hashed,
      }).save();

      return { user };
    } catch (error) {
      return {
        errors: [
          "Cannot register"
        ],
      };
    }
  }
}