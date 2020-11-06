insert into themes (name) values ('Игра “Ведьмак”');

insert into theme_parts (name, part, theme_id) values ('Часть 1', 1, 1);
insert into part_blocks (type, attachment, theme_parts_id) values ( 'text', '«Ведьма́к» (англ. The Witcher, польск. Wiedźmin,) — компьютерная ролевая игра, разработанная польской компанией CD Projekt RED по мотивам одноимённой серии романов польского писателя Анджея Сапковского. Релиз игры на платформе Windows состоялся 24 октября 2007 года — в России, 26 октября — в Европе и 30 октября 2007 года — в США[7]. В 2012 году вышла версия для OS X.

Игрок управляет главным героем литературного мира Сапковского — ведьмаком Геральтом из Ривии. Действие игры разворачивается после событий саги о ведьмаке — еле оставшись в живых, Геральт впадает в амнезию и вынужден заново учить своё ремесло. Игрок восстанавливает потерянный опыт главного героя, сражаясь с человеческими противниками и монстрами. В то же время перед ним ставится моральный выбор, от которого зависит дальнейшая судьба игрового мира. Игра достоверно отражает мрачную атмосферу вселенной романов, однако её сюжет не получил официальной поддержки Сапковского.', 1);

insert into theme_parts (name, part, theme_id) values ('Часть 2', 2, 1);
insert into part_blocks (type, attachment, theme_parts_id) values ( 'picture', 'uploads/5b7a5661-99a8-4a21-b978-14197fb504ae.jpg', 2);
insert into part_blocks (type, attachment, theme_parts_id) values ( 'text', 'Разработка «Ведьмака» продолжалась четыре года. В игре используется движок Aurora от BioWare. Релиз игры сопровождался рекламной кампанией, бюджет которой составил около 19 миллионов злотых[19]. Игра была положительно встречена критиками, которые высоко оценили её сюжетную линию, графику, звуковое сопровождение и боевую систему, но раскритиковали технические ошибки; большинство из них было исправлено в выпущенном в сентябре 2008 года «дополненном издании», в котором было также добавлено новое приключение для игрока. В 2011 году вышло продолжение игры под названием «Ведьмак 2: Убийцы королей». В мае 2015 года состоялся релиз третьей части серии — «Ведьмак 3: Дикая Охота».', 2);

insert into theme_parts (name, part, theme_id) values ('Часть 3', 3, 1);
insert into part_blocks (type, attachment, theme_parts_id) values ( 'video', 'https://www.youtube.com/watch?v=csauuPUI_Ng&ab_channel=CINEMATICGAMING%5BTRAILERS%5D', 3);
insert into part_blocks (type, attachment, theme_parts_id) values ( 'text', 'Идея о разработке игры по серии романов «Ведьмак» родилась ещё в 90-е, а разработкой игры....', 3);


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
