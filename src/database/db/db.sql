// buscarlos campos deleted de la base de datos user
SELECT * FROM user WHERE deleted = 0; 

// que solamente me muestre los campos de firstname y lastname
SELECT firstname, lastname FROM user WHERE deleted = 0;


// listar las dos tablas de transacciones y User conun iner join
SELECT * FROM transaction INNER JOIN user ON transaction.user_id = user.id;