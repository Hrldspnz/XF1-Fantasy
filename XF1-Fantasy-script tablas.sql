CREATE TABLE Tournament(
	ID_tournament char(6),
	TName varchar(30) not null,
	Date_begin date not null,
	Hour_begin date not null,
	Date_end date not null,
	Hour_end date not null,
	Rules_desc varchar(1000),
	Budget INTEGER

	PRIMARY KEY(ID_tournament)
);

CREATE TABLE Race(
	ID_Race varchar(6) not null,
	Race_name varchar(30) not null,
	Race_track varchar(30) not null,
	Country varchar(30) not null,
	Date_begin date not null,
	Hour_begin date not null,
	Date_end date not null,
	Hour_end date not null,
	Race_state varchar(20) not null,
	Tournament_id char(6) not null

	PRIMARY KEY(ID_Race)

);

ALTER TABLE Race
ADD CONSTRAINT Race_tournament FOREIGN KEY (Tournament_id)
REFERENCES Tournament(ID_tournament);