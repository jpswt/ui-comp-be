insert into questions (userID, category,qtype,question,author, createdon) 
values (10,'general', 'radio', 'Who shot first?', 'JP', CURRENT_TIMESTAMP  );


create table questions(
    ID SERIAL PRIMARY KEY,
    userID INTEGER,
    category VARCHAR(255),
    qType VARCHAR(255),
    question VARCHAR(1000),
    author VARCHAR(255),
    createdOn date

)

create table users(
    ID SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    pw_hash VARCHAR(1000)
)

insert into users (username,email,pw_hash)values('','john@gmail.com','letmein')