/*
  Warnings:

  - Changed the type of `identifier` on the `poli` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `telecom` on the `poli` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `physical_type` on the `poli` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `position` on the `poli` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `managingOrganization` on the `poli` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "poli" DROP COLUMN "identifier",
ADD COLUMN     "identifier" JSONB NOT NULL,
DROP COLUMN "telecom",
ADD COLUMN     "telecom" JSONB NOT NULL,
DROP COLUMN "physical_type",
ADD COLUMN     "physical_type" JSONB NOT NULL,
DROP COLUMN "position",
ADD COLUMN     "position" JSONB NOT NULL,
DROP COLUMN "managingOrganization",
ADD COLUMN     "managingOrganization" JSONB NOT NULL;
