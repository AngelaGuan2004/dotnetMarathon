CREATE TABLE player (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    gender VARCHAR(2) ,
    age INT ,
    id_number CHAR(18) NOT NULL,
    region VARCHAR(20),
    telephone_number VARCHAR(20),
    password VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE event (
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(20) NOT NULL,
    name VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    event_date DATE NOT NULL,
    scale INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE result (
    id INT NOT NULL AUTO_INCREMENT,
    gun_result INT,
    net_result INT,
    player_id INT,
    event_id INT,
    player_rank INT,
    gender_rank INT,
    PRIMARY KEY (id),
    FOREIGN KEY (player_id) REFERENCES player(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE weather (
    id INT NOT NULL AUTO_INCREMENT,
    time INT NOT NULL,
    temperature INT,
    weather_condition VARCHAR(20),
    whether_to_proceed INT,
    PRIMARY KEY (id, time),
    FOREIGN KEY (id) REFERENCES event(id)
);

CREATE TABLE participate (
    role VARCHAR(20) NOT NULL,
    number VARCHAR(10) NOT NULL,
    player_id INT,
    event_id INT,
    PRIMARY KEY (number),
    FOREIGN KEY (player_id) REFERENCES player(id),
    FOREIGN KEY (event_id) REFERENCES event(id)
);
