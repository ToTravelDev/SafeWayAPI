/* banco de dados criado no SGBD PostgreSQL */

create table tipo_usuario(
    tp_id integer primary key,
    tp_desc character varying(30) unique
);

INSERT INTO tipo_usuario VALUES ('1', 'Aluno');
INSERT INTO tipo_usuario VALUES ('2', 'Motorista');
INSERT INTO tipo_usuario VALUES ('3', 'Escola');

create table usuario (
    usu_id serial primary key,
    usu_nome character varying(100) not null,
    usu_cpf character varying(14) not null unique,
    usu_cidade character varying(30),
    usu_uf character varying(2),
    tp_usu integer,

    CONSTRAINT tipo_usuario_fk FOREIGN KEY (tp_usu) REFERENCES tipo_usuario(tp_id)
);

create table usuario_login(
    usu_log_email character varying(100) primary key,
    usu_log_senha character varying(20) not null,
    usu_log_sso boolean default(TRUE),
    usu_id integer,

    CONSTRAINT identificacao_usuario_login_fk FOREIGN KEY (usu_id) REFERENCES usuario(usu_id)
);

create table usuario_endereco(
    usu_end_id serial primary key,
    usu_id integer,
    usu_end_rua character varying(100),
    usu_end_numero character varying(6),
    usu_end_complemento character varying(40),
    usu_end_cep character varying(8),

    CONSTRAINT identificacao_usuario_endereco_fk FOREIGN KEY (usu_id) references usuario(usu_id)
);

create table escola(
    es_id serial primary key,
    es_desc character varying(100),
    es_ativo boolean default(TRUE),
    es_cep character varying(8),
    es_rua character varying(100),
    es_numero character varying(6),
    es_complemento character varying(50)
);

create table grupo_viagem(
    vg_id serial primary key,
    vg_ativo boolean default(TRUE),
    vg_motorista_id integer,
    vg_recorrente boolean default(FALSE),
    vg_data_inicio date,
    es_id integer,

    CONSTRAINT motorista_viagem_id_fk FOREIGN KEY (vg_motorista_id) REFERENCES usuario(usu_id),
    CONSTRAINT escola_viagem_id_fk FOREIGN KEY (es_id) REFERENCES escola(es_id)
);

create table grupo_viagem_integrantes(
    vg_int_id serial primary key,
    vg_id integer,
    vg_int_usu_id integer,
    vg_int_ativo boolean,

    CONSTRAINT identificacao_viagem_fk FOREIGN KEY (vg_id) REFERENCES grupo_viagem(vg_id),
    CONSTRAINT identificacao_aluno_fk FOREIGN KEY (vg_int_usu_id) REFERENCES usuario(usu_id)
);