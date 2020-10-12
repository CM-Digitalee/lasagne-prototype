import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsMenuService {

  // URL which returns list of JSON items (API end-point URL)
  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';

  constructor(private http: HttpClient) { }

  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  resolveItems(): Observable<any> {
    console.log('Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    // Penser à rafraichir le token pour les test
    //@TODO : check if token is passed
    const options = {headers: 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzNFh1S1JvdHlERXhKcFQ5Y0pHeU45dFhFbFJMbERTLU9fR3JWZVdEU0dBIn0.eyJqdGkiOiI3MmJjNDJiMi05NjdmLTRjZWUtYjFhNy01MjIwMDhhODc3MDgiLCJleHAiOjE2MDIyNTg1NjAsIm5iZiI6MCwiaWF0IjoxNjAyMjU4MjYwLCJpc3MiOiJodHRwczovL29wZW5pZC54dGVjaC5pby9hdXRoL3JlYWxtcy9OZXclMjBTVFJFRVRTIiwiYXVkIjpbImljY3ViZS1wcm9kIiwiYWNjb3VudCIsImljY3ViZS11YXQiXSwic3ViIjoiNGI3MGJmNzUtNDY2Zi00MTdkLTk0NTgtZGFjMWQ2NDZmYjQxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaWNjdWJlLWRldiIsIm5vbmNlIjoiODI1ZDU3YTEtODFkMy00MDczLWE2NmUtZWMzNjlhZmUyYmYyIiwiYXV0aF90aW1lIjoxNjAyMjQzNTMxLCJzZXNzaW9uX3N0YXRlIjoiMTliYzdiOGItOTFiNy00ZjIwLTgyZTAtZmU3MDhlY2NiZDUzIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJJQzNfQUNUT1JfQ09NVU5VUyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJJQzNfQUNMX0RBU0hCT0FSRFNfU0VUXzAxIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiaWNjdWJlLWRldiI6eyJyb2xlcyI6WyJJQzNfREFUQV9ERVYiXX0sImljY3ViZS1wcm9kIjp7InJvbGVzIjpbIklDM19EQVRBX1BST0QiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfSwiaWNjdWJlLXVhdCI6eyJyb2xlcyI6WyJJQzNfREFUQV9VQVQiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJJQ0NVQkUgVEVTVCIsInByZWZlcnJlZF91c2VybmFtZSI6ImljY3ViZV90ZXN0IiwiZ2l2ZW5fbmFtZSI6IklDQ1VCRSIsImZhbWlseV9uYW1lIjoiVEVTVCJ9.c57Fy1dNuA1h3fwyyaPxjrprSt95CoNns1ZjEIWI3GT5vyTw2mLct7il1k2FZN7HkhYCWFrCqHgcHQzGls64szjzmRZf9KGYvPCS8Q4vfUA3dAO0QaTixWbNSS2Ua5FFpEMXvPFTfW3nDm8BMAHmowQBT-m7EO26b63WE4qL5hOgc8lsEduHdEXXjs6lCzkC0-0TT_hUaB7UFfVQFl1BcMu-1UUv0d2vQJbEGdqF1Kv6BVgXlSMvkhLKd3vbu0fsdKSuV2h2s_ozZUqEaCBPCXf8OOWNk2n8ZO4qORSadxKZcIV8Jdr2OCbXtolR_3e-DN1v0yAiFTC-2CSfutvPXw'};
    // @ts-ignore
    // return this.http.get(this.URL, options);
    return this.http.get(this.URL);
  }
}
