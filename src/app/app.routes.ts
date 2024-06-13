import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { BranchListComponent } from './features/branches/components/branch-list/branch-list.component';
import { DoctorListComponent } from './features/doctors/components/doctor-list/doctor-list.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutComponent } from './features/about/about.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { RegisterComponent } from './routes/auth/register/register.component';
import { loginGuard } from './core/auth/guards/login.guard';
import { AdminSidebarComponent } from './panels/admin/component/sidebar/adminSidebar.component';
import { PatientSidebarComponent } from './panels/patient/component/sidebar/psidebar/psidebar.component';
import { DoctorSidebarComponent } from './features/panels/doctor/components/sidebar/doctorSidebar.component';




export const routes: Routes =
 [
    {
        path: '', // Route belirtilen path ile eşleştiğinde
        component: HomePageComponent, // İlgili componenti AppComponent'ten başlayarak
        // ilk karşılaştığı <router-outlet></router-outlet> etiketine yerleştirir.
     },
      {
        path: 'branches', // Route belirtilen path ile eşleştiğinde
        component: BranchListComponent, // İlgili componenti AppComponent'ten başlayarak
        // ilk karşılaştığı <router-outlet></router-outlet> etiketine yerleştirir.
        // canActivate:[loginGuard] örnek guard bu şekilde yazılıcak
      },
      {
        path: 'doctors',
        component: DoctorListComponent,

      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path:'about',
        component:AboutComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },

      {
        path:'dsidebar',
        component:DoctorSidebarComponent
      },

      {
        path:'asidebar',
        component:AdminSidebarComponent
      },
      
      {
        path:'psidebar',
        component:PatientSidebarComponent
      }

];


