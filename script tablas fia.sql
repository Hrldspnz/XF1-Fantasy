CREATE TABLE Campeonato(
	ID_campeonato char(6),
	Nombre varchar(30) not null,
	fecha_inicio date not null,
	hora_inicio date not null,
	fecha_fin date not null,
	hora_fin date not null,
	Descripcion_reglas varchar(1000)

	PRIMARY KEY(ID_campeonato)
);

CREATE TABLE Carrera(
	ID_carrera varchar(6) not null,
	Nombre_carrera varchar(30) not null,
	Nombre_pista varchar(30) not null,
	pais varchar(30) not null,
	fecha_inicio date not null,
	hora_inicio date not null,
	fecha_fin date not null,
	hora_fin date not null,
	estado varchar(20) not null,
	Campeonato_id char(6) not null

	PRIMARY KEY(ID_carrera)

);

ALTER TABLE carrera
ADD CONSTRAINT carrera_campeonato FOREIGN KEY (Campeonato_id)
REFERENCES Campeonato(ID_campeonato);