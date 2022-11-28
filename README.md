# urutan bikin project
ng new web-hotel-mandirian --directory . --style=scss --routing=true --skip-tests

ng g m guest-book
ng g c guest-book --skip-tests
ng g c guest-book/components/booked-list --skip-tests
ng g c guest-book/components/booked-form --skip-tests
ng g i guest-book/model/book
ng g i guest-book/model/guest
ng g s guest-book/service/hotel-service --skip-tests
ng g i guest-book/interface/ibook-form
ng g i guest-book/interface/ibook-list

1. ngatur routing
di app-routing
```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mahasiswa',
    loadChildren: () => import('./mahasiswa/mahasiswa.module').then(m => m.MahasiswaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

di app-module
```
imports: [
    BrowserModule,
    AppRoutingModule,
    MahasiswaModule
],
```

di mahasiswa-routing
```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MahasiswaComponent } from './mahasiswa.component';

const routes: Routes = [
  {
    path: '',
    component: MahasiswaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MahasiswaRoutingModule { }
```

di mahasiswa.module
```
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MahasiswaRoutingModule
  ],
  providers:[MahasiswaService],
  exports: [MahasiswaComponent]
})
```

2. bikin model
```
export interface Mahasiswa {
    id: number;
    nim: string;
    nama: string;
    fakultas: string;
    prodi: string;
}
```

3. bikin mahasiswa-component.html
```
<div class="container">
    <h1 class="text-center">Mahasiswa</h1>
    <!-- <h5 class="text-center">{{ today | dateCustom: 'eeee, dd MMMM yyyy' }}</h5> -->

    <div class="row mt-4">
        <div class="col-6">
            <h2>List</h2>
            <app-list></app-list>
        </div>
        <div class="col-6">
            <h2>Form</h2>
            <app-form></app-form>
        </div>
    </div>
</div>
```

4. bikin di list dan form
- list
```
<!-- <div class="spinner-border" role="status">
  <span class="sr-only"></span>
</div> -->
<ul class="list-group">
  <li class="list-group-item">
    <div class="form-check">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>
                    <button
                        class="btn btn-link btn-sm float-center"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-link btn-sm float-center">
                        <i
                        class="bi bi-pencil-square"
                        ></i>
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
    </div>
  </li>
</ul>
```

- form
```
<div class="shadow-sm p-3 mb-5 bg-body rounded">
  <div class="card-body">
    <form>
      <div class="mb-3">
        <label for="nim" class="form-label">NIM</label>
        <input type="text" class="form-control" id="nim" />
      </div>
      <div class="mb-3">
        <label for="nama" class="form-label">Nama Lengkap</label>
        <input type="text" class="form-control" id="nama" />
      </div>
      <div class="mb-3">
        <label for="fakultas" class="form-label">Fakultas</label>
        <input type="text" class="form-control" id="fakultas" />
      </div>
      <div class="mb-3">
        <label for="prodi" class="form-label">Prodi</label>
        <input type="text" class="form-control" id="prodi" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
```

5. bikin service
di mahsiswa.service.ts
```
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MAHASISWA, Mahasiswa } from '../model/mahasiswa';

@Injectable({
  providedIn: 'root'
})
export class MahasiswaService {

  private mahasiswas!: Mahasiswa[]
  private storage: Storage = sessionStorage

  constructor() { }

  getAll(): Observable<Mahasiswa[]>{
    return new Observable<Mahasiswa[]>((observer: Observer<Mahasiswa[]>) => {
      const sessionMahasiswas = this.storage.getItem(MAHASISWA) as string
      try {
        if(!sessionMahasiswas){
          this.mahasiswas = []
          observer.next(this.mahasiswas)
        }
        this.mahasiswas = JSON.parse(sessionMahasiswas)
        observer.next(this.mahasiswas)
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  save(mahasiswa: Mahasiswa): Observable<void>{
    return new Observable<void>((observer: Observer<void>): void => {
      try {
        if(mahasiswa.id){
          this.mahasiswas = this.mahasiswas.map((m) => {
            if(m.id === mahasiswa.id) m = mahasiswa
              return mahasiswa
            }         
          )
        }
        else{
          mahasiswa.id = this.mahasiswas.length + 1
          this.mahasiswas.push(mahasiswa)
        }
        this.setToStorage()
        observer.next()
      } catch (error: any) {
        observer.error(error.message)      
      }
    })
  }

  delete(mahasiswa: Mahasiswa): Observable<void>{
    return new Observable<void>((observer: Observer<void>): void => {
      try {
        for(let i = 0; i < this.mahasiswas.length; i++) {
          if(this.mahasiswas[i].id === mahasiswa.id) {
            this.mahasiswas.splice(i, 1)
            this.setToStorage()
            observer.next()
          }
      } 
    }
    catch (error: any) {
      observer.error(error.message)
    }
  })
}

  setToStorage(): void{
    this.storage.setItem(MAHASISWA, JSON.stringify(this.mahasiswas))
  }
}
```

# EDIT FEATURES
1. tambah di mahasiswa-routing
```
{
  path:':id',
  component: MahasiswaComponent
}
```

2. ke form
```
constructor(
  private mahasiswaService: MahasiswaService,
  private readonly route: ActivatedRoute
) {}


