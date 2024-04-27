-- CreateTable
CREATE TABLE "Pog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Pog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pog" ADD CONSTRAINT "Pog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
