-- CreateTable
CREATE TABLE "RunnerProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "experienceLevel" TEXT NOT NULL,
    "weeklyRunCount" INTEGER NOT NULL,
    "comfortableDistanceKm" DOUBLE PRECISION NOT NULL,
    "goal" TEXT,
    "planStartDate" TIMESTAMP(3),
    "preferredTrainingDays" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RunnerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RunnerProfile_userId_key" ON "RunnerProfile"("userId");

-- AddForeignKey
ALTER TABLE "RunnerProfile" ADD CONSTRAINT "RunnerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
