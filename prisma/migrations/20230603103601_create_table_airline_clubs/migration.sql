-- CreateTable
CREATE TABLE "airline_clubs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" VARCHAR(255),
    "phone" VARCHAR(30),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "airline_id" TEXT NOT NULL,

    CONSTRAINT "airline_clubs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "airline_clubs_airline_id_key" ON "airline_clubs"("airline_id");

-- AddForeignKey
ALTER TABLE "airline_clubs" ADD CONSTRAINT "airline_clubs_airline_id_fkey" FOREIGN KEY ("airline_id") REFERENCES "airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
