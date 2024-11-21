
import config  from "config"
import { DataSource } from "typeorm";
import { VueloEntity } from "../../domain/Entities/vuelos.Entity";
import { PasajeroEntity } from "../../domain/Entities/pasajero.Entity";
import { AsientoEntity } from "../../domain/Entities/asientos.Entity";
import { UsuarioEntity } from "../../domain/Entities/usuarios.Entity";
import { PreciosTemporalesEntity } from "../../domain/Entities/precios_temporales.Entity";
import { CategoriaEntity } from "../../domain/Entities/categorias.Entity";

const dbSSL  = config.get<boolean>("SSL");

// console.log( "--------" +    config.get<string>("HOST"))
// console.log( "--------" +    config.get<number>("DB_PORT"))

// console.log( "--------" +    config.get<string>("USER"))
// console.log( "--------" +    config.get<string>("PASSWORD"))
// console.log( "--------" +    config.get<string>("DATABASE"))

export const AppDataSourcePgs = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST, // o utilizar `RAILWAY_PRIVATE_DOMAIN`
  port: Number(process.env.PGPORT), // Generalmente es 5432
  username: process.env.PGUSER, // Tu usuario de PostgreSQL
  password: process.env.PGPASSWORD, // Tu contraseña de PostgreSQL
  database: process.env.PGDATABASE, // Nombre de tu base de datos
  synchronize: true,

  ssl: dbSSL ? { rejectUnauthorized: false } : false,
  entities: [VueloEntity ,
     PasajeroEntity ,
     AsientoEntity ,
     UsuarioEntity , 
     PreciosTemporalesEntity, 
     CategoriaEntity,
    ],
  extra: {
    connectTimeoutMS: 30000, // Aumenta el timeout a 30 segundos
  },
});
