-- CreateTable
CREATE TABLE "Treatment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientName" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "lastContact" DATETIME NOT NULL,
    "followUpDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
