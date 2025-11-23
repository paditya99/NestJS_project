import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request=context.switchToHttp().getRequest();
    const header=request.headers['authorization']
    if(header==='secret-token'){
      return true;
    }
    else{
      return false;
    }
  }
}
