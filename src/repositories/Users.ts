import { prismaClient } from "../database/prismaClient";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export class UserRepository {
  async createUserService({ name, email, password }: IUserCreate) {
    try {
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      });

      return { user };
    } catch (error) {
      return error;
    }
  }

  async enableUserService({id}: Partial<IUser>) {
    try {
      const user = await prismaClient.user.findUnique({ where: { id } });

      if (!user) {
        return { error: "User not found" };
      }

      await prismaClient.user.update({
        where: { id: user?.id },
        data: { disabled: false }
      });

      return { message: "User enabled" };
    } catch ( error: any) {
      return { error: error.message };
    }
  }
  
  async disableUserService({id}: Partial<IUser>) {
    try {
      const user = await prismaClient.user.findUnique({ where: { id } });

      if (!user) {
        return { error: "User not found" };
      }

      await prismaClient.user.update({
        where: { id: user.id },
        data: { disabled: true }
      });

      return { message: "User disabled" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async findByEmailUserService({ email }: Partial<IUser>) {
    try {
      const [user] = await prismaClient.user.findMany({
        where: {
          email,
          AND: {
            disabled: false
          }
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      });

      if (!user) {
        return { error: "User not found" };
      }

      return { user };
    } catch (error) {
      return error;
    }
  }

  async updatePasswordUserService({ email, password }: Partial<IUser>) {
    try {
      const user = await this.findByEmailUserService({ email });

      if (!user) {
        return { error: "User not found" };
      }

      await prismaClient.user.update({
        where: { email },
        data: { password }
      });

      return user;
    } catch (error) {
      return error;
    }
  }
}