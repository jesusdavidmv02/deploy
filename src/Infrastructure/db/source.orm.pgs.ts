
import config  from "config"
import { DataSource } from "typeorm";
import { VueloEntity } from "../../domain/Entities/vuelos.Entity";
import { PasajeroEntity } from "../../domain/Entities/pasajero.Entity";
import { AsientoEntity } from "../../domain/Entities/asientos.Entity";
import { UsuarioEntity } from "../../domain/Entities/usuarios.Entity";
import { PreciosTemporalesEntity } from "../../domain/Entities/precios_temporales.Entity";
import { CategoriaEntity } from "../../domain/Entities/categorias.Entity";

const dbSSL  = config.get<boolean>("SSL");

console.log( "--------" +    config.get<string>("HOST"))
console.log( "--------" +    config.get<number>("DB_PORT"))
console.log( "--------" +    config.get<string>("USER"))
console.log( "--------" +    config.get<string>("PASSWORD"))
console.log( "--------" +    config.get<string>("DATABASE"))

export const AppDataSourcePgs = new DataSource({
  type: "postgres",
  host: config.get<string>("HOST"),
  port: config.get<number>("DB_PORT"),
  username: config.get<string>("USER"),
  password: config.get<string>("PASSWORD"),
  database: config.get<string>("DATABASE"),
  ssl: dbSSL ? { rejectUnauthorized: false } : false,
  entities: [VueloEntity ,
     PasajeroEntity ,
     AsientoEntity ,
     UsuarioEntity , 
     PreciosTemporalesEntity, 
     CategoriaEntity,
    ],
  synchronize: true,
  connectTimeoutMS: 10000, // 10 segundos
});
