-- CreateTable
CREATE TABLE "perawat" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,

    CONSTRAINT "perawat_pkey" PRIMARY KEY ("id")
);
