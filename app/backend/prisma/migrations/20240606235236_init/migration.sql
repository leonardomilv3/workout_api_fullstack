-- CreateTable
CREATE TABLE "CT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "proprietario" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Atleta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL,
    "sexo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ctId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    CONSTRAINT "Atleta_ctId_fkey" FOREIGN KEY ("ctId") REFERENCES "CT" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Atleta_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CT_nome_key" ON "CT"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Atleta_cpf_key" ON "Atleta"("cpf");
