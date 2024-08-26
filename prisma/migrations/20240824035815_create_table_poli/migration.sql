-- CreateTable
CREATE TABLE "poli" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "resource_type" VARCHAR(100) NOT NULL,
    "identifier" JSONB NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "mode" VARCHAR(100) NOT NULL,
    "telecom" JSONB NOT NULL,
    "physical_type" JSONB NOT NULL,
    "position" JSONB NOT NULL,
    "managingOrganization" JSONB NOT NULL,

    CONSTRAINT "poli_pkey" PRIMARY KEY ("id")
);
