/*
  Warnings:

  - The `identifier` column on the `poli` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `telecom` column on the `poli` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `physical_type` column on the `poli` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `position` column on the `poli` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `managingOrganization` column on the `poli` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "poli" DROP COLUMN "identifier",
ADD COLUMN     "identifier" JSONB[],
DROP COLUMN "telecom",
ADD COLUMN     "telecom" JSONB[],
DROP COLUMN "physical_type",
ADD COLUMN     "physical_type" JSONB[],
DROP COLUMN "position",
ADD COLUMN     "position" JSONB[],
DROP COLUMN "managingOrganization",
ADD COLUMN     "managingOrganization" JSONB[];
