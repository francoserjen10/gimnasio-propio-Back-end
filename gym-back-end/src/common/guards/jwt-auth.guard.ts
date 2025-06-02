import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // Obtenemos el objeto 'Request' de la ejecucion actual
      const request = context.switchToHttp().getRequest();
      // Intentamos recuperar el token de autenticacion desde las cookies
      const token = request.cookies?.accessToken;
      // Si no existe el token, denegamos el acceso
      if (!token || token === undefined) {
        this.logger.warn('Token ausente');
        return false;
      }
      const decodedToken = verify(token, process.env.JWT_SECRET_KEY);
      if (typeof decodedToken !== 'object' || !('rolId' in decodedToken)) {
        this.logger.warn('Token decodificado inválido');
        throw new UnauthorizedException('Token inválido');
      }
      request.user = decodedToken;
      return true;
    } catch (error) {
      // Si ocurre algun error inesperado, lanzamos una excepcion 401 (No autorizado)
      this.logger.error('Error al verificar token', error.message);
      throw new UnauthorizedException('Token no válido o expirado');
    }
  }
}
