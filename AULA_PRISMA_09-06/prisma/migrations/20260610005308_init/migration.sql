-- CreateTable
CREATE TABLE `Marcas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `ano_modelo` TEXT NULL,
    `ano_fabricacao` DATETIME(3) NULL,
    `data_cadastro` DATETIME(3) NULL,
    `data_atualizacao` DATETIME(3) NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
