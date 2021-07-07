insert into conversations (user1_id, user2_id) values (1, 2);
insert into conversations (user1_id, user2_id) values (2, 4);
insert into conversations (user1_id, user2_id) values (3, 4);
insert into conversations (user1_id, user2_id) values (1, 5);

-- SELECT conversation_id, user1_id, user2_id, text, first_name 
-- FROM conversations
-- JOIN messages
-- ON conversation_id = conversations.id
-- RIGHT JOIN users
-- ON user1_id = users.id
-- WHERE user1_id = 1 OR user2_id = 1;


--   CASE WHEN user1_id = users.id THEN value1 
--        WHEN condition2 THEN value2  
--        ELSE def_value 
--   END 