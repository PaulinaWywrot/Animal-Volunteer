create table sessions (id SERIAL PRIMARY KEY, date DATE NOT NULL, morning VARCHAR(50) NOT NULL, evening VARCHAR(50) NOT NULL);
insert into sessions (date, morning, evening) values ('2023-10-02','Available','Available')
