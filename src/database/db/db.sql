SELECT * FROM Transactions
INNER JOIN UserBets ON Transactions.id = UserBets.id;

SELECT * FROM Transactions; 
SELECT * FROM UserBets;
```
-- necesito insertar datos ala tabla UserBets
INSERT INTO UserBets (id, UserId,betId, amount,state) VALUES (1,1,1,1000,1);