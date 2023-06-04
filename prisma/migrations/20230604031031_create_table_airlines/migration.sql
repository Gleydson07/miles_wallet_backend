-- CreateTable
CREATE TABLE "airlines" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "website" VARCHAR(255),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "airlines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "airlines_name_key" ON "airlines"("name");
