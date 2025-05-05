import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      this.logger.log('Estoy en el JWTAuthGuard');
      // Obtenemos el objeto 'Request' de la ejecucion actual
      const request = context.switchToHttp().getRequest();
      // Intentamos recuperar el token de autenticacion desde las cookies
      const token = request.cookies?.accessToken;
      // Si no existe el token, denegamos el acceso
      if (token === undefined) {
        return false;
      }
    } catch (error) {
      // Si ocurre algun error inesperado, lanzamos una excepcion 401 (No autorizado)
      console.error("No hay token");
      throw new HttpException("No existe token", HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
