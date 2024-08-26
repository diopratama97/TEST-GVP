-- CreateTable
CREATE TABLE "logs" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "status_code" INTEGER NOT NULL,
    "full_response" JSONB NOT NULL,
    "request" JSONB,
    "url" TEXT NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);
