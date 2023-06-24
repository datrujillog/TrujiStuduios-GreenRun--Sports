-- mysql

-- crear base de datos
CREATE DATABASE `Enyoi`
    CHARACTER SET utf8
    COLLATE utf8_general_ci;

-- mysql

-- crear base de datos


-- hacer las siquientes tablas y su respetiva relacion alumnos notas, asignaturas, profesor y cohorte

-- Relaciones de las tablas

-- alumnos y notas 1 a muchos porque un alumno puede tener muchas notas
-- asignaturas y notas 1 a muchos porque una asignatura puede tener muchas notas
-- profesor y asignaturas 1 a muchos porque un profesor puede tener muchas asignaturas
-- profesor y cohorte mucho a muchos porque un profesor puede tener muchos alumnos y un alumno puede tener muchos profesores
-- alumnos y cohorte 1 a muchos porque un alumno puede tener muchos profesores

-- CREAR TABLA DE COHORTE CON RELACION DE MUCHOS A MUCHOS CON PROFESOR
-- Crear tabla cohorte
CREATE TABLE `cohorte` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear tabla profesor
CREATE TABLE `profesor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `curso` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear tabla intermedia cohorte_profesor
CREATE TABLE `cohorte_profesor` (
  `idCohorteProfesor` INT NOT NULL AUTO_INCREMENT,
  `idCohorte` INT NOT NULL,
  `idProfesor` INT NOT NULL,
  PRIMARY KEY (`idCohorteProfesor`),
  INDEX `fk_cohorte_profesor_cohorte_idx` (`idCohorte` ASC) VISIBLE,
  INDEX `fk_cohorte_profesor_profesor_idx` (`idProfesor` ASC) VISIBLE,
  CONSTRAINT `fk_cohorte_profesor_cohorte`
    FOREIGN KEY (`idCohorte`)
    REFERENCES `cohorte` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cohorte_profesor_profesor`
    FOREIGN KEY (`idProfesor`)
    REFERENCES `profesor` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- crear tabla alumno
CREATE TABLE `alumno` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `idCohorte` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_alumno_cohorte_idx` (`idCohorte` ASC) VISIBLE,
  CONSTRAINT `fk_alumno_cohorte`
    FOREIGN KEY (`idCohorte`)
    REFERENCES `cohorte` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- crear tabla asignatura
CREATE TABLE `asignatura` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idProfesor` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_asignatura_profesor_idx` (`idProfesor` ASC) VISIBLE,
  CONSTRAINT `fk_asignatura_profesor`
    FOREIGN KEY (`idProfesor`)
    REFERENCES `profesor` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- crear tabla notas
CREATE TABLE `notas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nota` INT NOT NULL,
  `idAlumno` INT NOT NULL,
  `idAsignatura` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_notas_alumno_idx` (`idAlumno` ASC) VISIBLE,
  INDEX `fk_notas_asignatura_idx` (`idAsignatura` ASC) VISIBLE,
  CONSTRAINT `fk_notas_alumno`
    FOREIGN KEY (`idAlumno`)
    REFERENCES `alumno` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_notas_asignatura`
    FOREIGN KEY (`idAsignatura`)
    REFERENCES `asignatura` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- insertar datos en la tabla cohorte 
INSERT INTO `cohorte` (`id`, `nombre`, `fecha_inicio`, `fecha_fin`) VALUES ('1', 'Cohorte 1', '2020-01-01', '2020-06-01');
INSERT INTO `cohorte` (`id`, `nombre`, `fecha_inicio`, `fecha_fin`) VALUES ('2', 'Cohorte 2', '2020-07-01', '2020-12-01');

-- insertar datos en la tabla profesor
INSERT INTO `profesor`( `nombre`, `apellido`, `email`, `curso`, `password`) VALUES ('Juan', 'Perez', 'profe@gmail.com', 'programacion', '123456');
INSERT INTO `profesor`( `nombre`, `apellido`, `email`, `curso`, `password`) VALUES ('diego', 'Trujillo', 'diego@gmail.com', 'Ciencia de Datos','123456');
INSERT INTO `profesor`( `nombre`, `apellido`, `email`, `curso`, `password`) VALUES ('Sara', 'Orrego', 'sara@gmail.com', 'javascript','123456');

-- insertar datos en la tabla cohorte_profesor
INSERT INTO `cohorte_profesor`(`idCohorte`, `idProfesor`) VALUES ('1','1');
INSERT INTO `cohorte_profesor`(`idCohorte`, `idProfesor`) VALUES ('2','2');


-- insertar datos en la tabla alumno
INSERT INTO `alumno`(`nombre`, `apellido`, `email`, `password`, `idCohorte`) VALUES ('Juan', 'Perez', 'jua@juan.com', '123456', '1');
INSERT INTO `alumno`(`nombre`, `apellido`, `email`, `password`, `idCohorte`) VALUES ('Pedro', 'Perez', 'pedro@pedro.com','123456', '2');

-- insertar datos en la tabla asignatura
INSERT INTO `asignatura`(`nombre`, `idProfesor`) VALUES ('Matematicas', '1');
INSERT INTO `asignatura`(`nombre`, `idProfesor`) VALUES ('Ciencias', '2');

-- insertar datos en la tabla notas
INSERT INTO `notas`(`nota`, `idAlumno`, `idAsignatura`) VALUES ('5', '1', '1');
INSERT INTO `notas`(`nota`, `idAlumno`, `idAsignatura`) VALUES ('4', '1', '2');
INSERT INTO `notas`(`nota`, `idAlumno`, `idAsignatura`) VALUES ('3', '2', '1');
INSERT INTO `notas`(`nota`, `idAlumno`, `idAsignatura`) VALUES ('2', '2', '2');

