-- CreateTable
CREATE TABLE "test_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_test_data_1" ON "test_data"("id");
Pragma writable_schema=0;

