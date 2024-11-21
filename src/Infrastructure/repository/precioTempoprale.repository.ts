import { Repository } from "typeorm";
import { PreciosTemporalesEntity } from "../../domain/Entities/precios_temporales.Entity";
import { AppDataSourcePgs } from "../db/source.orm.pgs";
import { curd } from "./crud.interfaz";

export class PrecioTemporalesRepository implements curd {
  private repositoryPgs: Repository<PreciosTemporalesEntity>;

  constructor() {
    this.repositoryPgs = AppDataSourcePgs.getRepository(PreciosTemporalesEntity);
  }

  obtenerTodos() {
    return this.repositoryPgs.find();
  }

  async obtenerPorId(id: number) {
     const precios_temporada = await this.repositoryPgs.findOneBy({ id_temporada: id });
    return precios_temporada != null ? precios_temporada : null;
  }

  async crear(datos: PreciosTemporalesEntity) {
    const precios_temporada = this.repositoryPgs.create(datos);
    const precios_temporada_Existente = await this.repositoryPgs.findOneBy({
      id_temporada : datos.id_temporada,
    });
    if (precios_temporada_Existente) {
      return "Le precios_temporada ya existe"; // Retorna null si el código ya está en uso
    } else {
      return this.repositoryPgs.insert(precios_temporada);
      // return this.repositoryPgs.save(vuelo);
    }
  }


  async actualizar(datos: PreciosTemporalesEntity) {
    const result = await this.repositoryPgs.update( datos.id_temporada  , {
        temporada : datos.temporada,
        demanda : datos.demanda,
        disponibilidad : datos.disponibilidad,
        precio_final : datos.precio_final,  
      });
  
      if (result.affected && result.affected > 0) {
        return result;
      } else {
        return false;
      }
  }



  async eliminar(id: number) {
    const vuelo = await this.repositoryPgs.findOneBy({ id_temporada : id });
    if (vuelo) {
      await this.repositoryPgs.remove(vuelo);
      return vuelo;
    } else {
      console.log('Vuelo no encontrado');
      return null;
    }
  }
}
