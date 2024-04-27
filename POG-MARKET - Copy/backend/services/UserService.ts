// UserService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserService = {
  async getUserInfo(userId: number) {
    return await prisma.user.findUnique({ where: { id: userId } });
  },

  async getUserPogs(userId: number) {
    return await prisma.pog.findMany({ where: { ownerId: userId } });
  },

  async buyPogs(userId: number, pogsToBuy: any[]) {
    try {
      const createdPogs = await prisma.pog.createMany({
        data: pogsToBuy.map(pog => ({ ...pog, ownerId: userId }))
      });

      return { success: true, message: 'Pogs bought successfully', createdPogs };
    } catch (error) {
      console.error('Error buying pogs:', error);
      return { success: false, message: 'Failed to buy pogs' };
    }
  },

  async sellPogs(userId: number, pogsToSell: any[]) {
    try {
      const deletedPogs = await prisma.pog.deleteMany({
        where: { id: { in: pogsToSell.map(pog => pog.id) } }
      });

      return { success: true, message: 'Pogs sold successfully', deletedPogs };
    } catch (error) {
      console.error('Error selling pogs:', error);
      return { success: false, message: 'Failed to sell pogs' };
    }
  },

  async getAllPogs() {
    return await prisma.pog.findMany();
  }
};

export default UserService;
