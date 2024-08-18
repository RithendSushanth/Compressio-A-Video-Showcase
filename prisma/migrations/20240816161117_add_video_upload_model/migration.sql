-- CreateTable
CREATE TABLE "VideoUpload" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "originalSize" TEXT NOT NULL,
    "totalChunks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoUpload_pkey" PRIMARY KEY ("id")
);
