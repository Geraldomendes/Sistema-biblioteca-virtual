-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LendBook" (
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "loanDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "bookId"),
    CONSTRAINT "LendBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LendBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LendBook" ("bookId", "createdAt", "loanDate", "returnDate", "userId") SELECT "bookId", "createdAt", "loanDate", "returnDate", "userId" FROM "LendBook";
DROP TABLE "LendBook";
ALTER TABLE "new_LendBook" RENAME TO "LendBook";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
