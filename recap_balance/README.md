CREATE TABLE `exchanges_wallets` (
`id` int NOT NULL,
`exchange` text NOT NULL,
`datetime` date NOT NULL,
`wallet` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;