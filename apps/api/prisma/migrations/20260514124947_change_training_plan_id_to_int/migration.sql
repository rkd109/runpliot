/*
  Warnings:

  - The primary key for the `TrainingPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TrainingPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TrainingPlanItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TrainingPlanItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `trainingPlanId` on the `TrainingPlanItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "TrainingPlanItem" DROP CONSTRAINT "TrainingPlanItem_trainingPlanId_fkey";

-- AlterTable
ALTER TABLE "TrainingPlan" DROP CONSTRAINT "TrainingPlan_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TrainingPlan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TrainingPlanItem" DROP CONSTRAINT "TrainingPlanItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "trainingPlanId",
ADD COLUMN     "trainingPlanId" INTEGER NOT NULL,
ADD CONSTRAINT "TrainingPlanItem_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "TrainingPlanItem" ADD CONSTRAINT "TrainingPlanItem_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
