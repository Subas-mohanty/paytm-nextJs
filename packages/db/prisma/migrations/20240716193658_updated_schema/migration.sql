/*
  Warnings:

  - The primary key for the `p2pTransfer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "p2pTransfer" DROP CONSTRAINT "p2pTransfer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "p2pTransfer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "p2pTransfer_id_seq";
