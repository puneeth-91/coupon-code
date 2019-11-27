import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpRequestResponseInterceptor } from './interceptors/http-request-response-interceptor';
import { ApiService } from './services/api.service';
import { MemberService } from './services/member.service';
import { MLIntermediatInsertUpdateService } from './services/MLIntermediateInsertUpdate.service';
import { VSPIntermediateInsertUpdateService } from './services/VSPIntermediateInsertUpdate.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestResponseInterceptor, multi: true },
    ApiService,
    MemberService,
    MLIntermediatInsertUpdateService,
    VSPIntermediateInsertUpdateService
  ]
})
export class CoreModule { }
