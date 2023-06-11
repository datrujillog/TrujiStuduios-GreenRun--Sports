// buscarlos campos deleted de la base de datos user
SELECT * FROM user WHERE deleted = 0; 

// que solamente me muestre los campos de firstname y lastname
SELECT firstname, lastname FROM user WHERE deleted = 0;