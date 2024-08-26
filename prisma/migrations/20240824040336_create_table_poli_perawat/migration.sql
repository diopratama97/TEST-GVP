-- CreateTable
CREATE TABLE "poli_perawat" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "perawat_id" UUID NOT NULL,
    "poli_name" VARCHAR(255) NOT NULL,
    "poli_address" TEXT NOT NULL,

    CONSTRAINT "poli_perawat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "poli_perawat" ADD CONSTRAINT "poli_perawat_perawat_id_fkey" FOREIGN KEY ("perawat_id") REFERENCES "perawat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
