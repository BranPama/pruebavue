CREATE TABLE public.clientes (
	fecha_creacion timestamp DEFAULT now() NULL,
	nit text NOT NULL,
	razon_social text NOT NULL,
	correo text NOT NULL,
	telefono text NOT NULL,
	usuario_creador text NOT NULL,
	estado bool NULL,
	id_cliente serial4 NOT NULL,
	CONSTRAINT clientes_pk PRIMARY KEY (id_cliente)
);