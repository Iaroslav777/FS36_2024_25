-- Створення бази даних (якщо вона ще не існує)
-- Цю команду потрібно виконати окремо, якщо ви не підключаєтеся до існуючої бази даних
-- CREATE DATABASE table_tennis_tournaments;

-- Підключіться до бази даних table_tennis_tournaments перед виконанням наступних команд

-- Таблиця для гравців
CREATE TABLE IF NOT EXISTS players (
    player_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    rating INT DEFAULT 1500, -- Початковий рейтинг гравця
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця для турнірів
CREATE TABLE IF NOT EXISTS tournaments (
    tournament_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'upcoming' -- 'upcoming', 'in_progress', 'completed', 'cancelled'
);

-- Таблиця для реєстрації гравців на турніри (багато-до-багатьох зв'язок)
CREATE TABLE IF NOT EXISTS tournament_registrations (
    registration_id SERIAL PRIMARY KEY,
    tournament_id INT NOT NULL,
    player_id INT NOT NULL,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE,
    UNIQUE (tournament_id, player_id) -- Гарантує, що гравець може бути зареєстрований на турнір лише один раз
);

-- Таблиця для матчів
CREATE TABLE IF NOT EXISTS matches (
    match_id SERIAL PRIMARY KEY,
    tournament_id INT NOT NULL,
    player1_id INT NOT NULL,
    player2_id INT NOT NULL,
    winner_id INT, -- NULL, якщо матч ще не завершився або нічия (якщо дозволено)
    match_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    score_player1 INT,
    score_player2 INT,
    round_number INT, -- Наприклад, 1, 2, 3, або чвертьфінал, півфінал, фінал
    FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id) ON DELETE CASCADE,
    FOREIGN KEY (player1_id) REFERENCES players(player_id) ON DELETE CASCADE,
    FOREIGN KEY (player2_id) REFERENCES players(player_id) ON DELETE CASCADE,
    FOREIGN KEY (winner_id) REFERENCES players(player_id) ON DELETE SET NULL -- Якщо переможець видалений, встановити NULL
);

-- Додавання індексів для покращення продуктивності запитів
CREATE INDEX IF NOT EXISTS idx_players_last_name ON players (last_name);
CREATE INDEX IF NOT EXISTS idx_tournaments_start_date ON tournaments (start_date);
CREATE INDEX IF NOT EXISTS idx_tournament_registrations_tournament_id ON tournament_registrations (tournament_id);
CREATE INDEX IF NOT EXISTS idx_tournament_registrations_player_id ON tournament_registrations (player_id);
CREATE INDEX IF NOT EXISTS idx_matches_tournament_id ON matches (tournament_id);
CREATE INDEX IF NOT EXISTS idx_matches_player1_id ON matches (player1_id);
CREATE INDEX IF NOT EXISTS idx_matches_player2_id ON matches (player2_id);

-- НОВА ТАБЛИЦЯ ДЛЯ ПОВІДОМЛЕНЬ ЧАТУ
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY, -- Унікальний ідентифікатор повідомлення, автоінкремент
    message_text TEXT NOT NULL, -- Текст повідомлення
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Час створення повідомлення
);

-- Додавання індексу для прискорення запитів за часом створення
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages (created_at);
