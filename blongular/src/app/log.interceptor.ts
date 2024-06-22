import { HttpInterceptorFn } from '@angular/common/http';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url);
  return next(req).pipe((response) => {
    response.subscribe((data: any) => {
      if(!data || !data.body || !data.body.data)
        return data;
      data.body.data.forEach((element: any) => {
        console.log(element.title);
      });
      return data;
    });
    return response;
  } );
};
