-- CreateTable
CREATE TABLE "bank_clubs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" VARCHAR(255),
    "phone" VARCHAR(30),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bank_clubs_pkey" PRIMARY KEY ("id")
);
