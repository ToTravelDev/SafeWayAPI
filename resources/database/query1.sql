-- Active: 1713397736041@@ep-cold-bush-a4pylmfr-pooler.us-east-1.aws.neon.tech@5432
create table motorista(
    mot_id serial PRIMARY KEY,
    mot_nome character(70) not null,
    mot_cpf character(14) not null unique,
    mot_cidade character(30),
    mot_uf character(2)
);

/* relacionamento 1:1 com motorista */
create Table motorista_endereco(
    mot_end_id serial REFERENCES motorista(mot_id),
    mot_end_cep CHARACTER(8),
    mot_end_rua CHARACTER(50),
    mot_end_numero CHARACTER(6),
    mot_end_complemento CHARACTER(40)
);

create Table motorista_cnh(
    mot_end_id serial REFERENCES motorista(mot_id),
    mot_cnh_cat CHARACTER(2),
    mot_cnh_numero CHARACTER(20),
    mot_cnh_vencimento date
);