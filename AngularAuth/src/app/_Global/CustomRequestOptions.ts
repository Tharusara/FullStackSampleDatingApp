// import { Injectable } from '@angular/core';
// import { BaseRequestOptions, RequestOptions, Headers } from '@angular/common/http';
// // import { BaseRequestOptions } from '@angular/common/bundles/BaseRequestOptions';

// @Injectable()
// export class DefaultRequestOptions extends BaseRequestOptions {

//     private superHeaders: Headers;

//     get headers() {
//         // Set the default 'Content-Type' header
//         this.superHeaders.set('Content-Type', 'application/json');

//         const token = localStorage.getItem('token');
//         if (token) {
//             this.superHeaders.set('Authorization', `Bearer ${token}`);
//         } else {
//             this.superHeaders.delete('Authorization');
//         }
//         return this.superHeaders;
//     }

//     set headers(headers: Headers) {
//         this.superHeaders = headers;
//     }

//     constructor() {
//         super();
//     }
// }

// export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };
