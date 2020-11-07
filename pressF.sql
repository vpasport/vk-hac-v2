insert into users (login, password, role, score) 
values ('admin', 'c75a234677eaf75182a0d8c1bdd6f1c8123709a47b9ea2f31a07d8cab6eccd20a788823c279fab95f2f2a7f910f40a1c1b6f9121be33bb37a30c478e9e09d20e;05638640078d8e341201', 'user', null);

insert into questions (type, description) values ('single', 'На улице есть снег?');
insert into answer_options(question_id, description, is_correct) values (1, 'Да', true);
insert into answer_options(question_id, description, is_correct) values (1, 'Нет', false);

insert into questions (type, description) values ('mulpitle', 'Какие факторы есть на улице?');
insert into answer_options(question_id, description, is_correct) values (2, 'Снег', true);
insert into answer_options(question_id, description, is_correct) values (2, 'Солнце', false);
insert into answer_options(question_id, description, is_correct) values (2, 'Лед', true);

insert into questions (type, description) values ('free', 'Опишите погоду на улице.')

insert into tests (name, description, author) values ('Тест о погоде', 'Ответьте на несколько вопросов о погоде, но учтите, что вопросы могли быть составлины при другой погоде', '<1>');

insert into tests_questions (question_id, test_id) values (1, 1), (2, 1), (3, 1);