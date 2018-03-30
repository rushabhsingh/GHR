
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule,Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ModeselectComponent } from './modeselect/modeselect.component';
import { RegisterComponent } from './register/register.component';
import { DataService } from './data-service.service';
import { ChatService } from './chat.service';
import { RemediesService } from './remedies.service';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { CanActivateViaAuthGuard } from '../app/guards/authGuard';
import { ChatComponent } from './chat/chat.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AcceptRejectComponent } from './accept-reject/accept-reject.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import { ProfileComponent } from './profile/profile.component';
import { AmbulanceRequestsComponent } from './ambulance-requests/ambulance-requests.component';
import { HelpComponent } from './help/help.component';
import { NotifyComponent } from './notify/notify.component';
import { DocsComponent } from './docs/docs.component';
import { NearbyComponent } from './nearby/nearby.component';
import { NhospitalComponent } from './nearby/nhospital/nhospital.component';
import { NclinicsComponent } from './nearby/nclinics/nclinics.component';
import { NpharmacyComponent } from './nearby/npharmacy/npharmacy.component';
import { NpoliceComponent } from './nearby/npolice/npolice.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'modeselect', component: ModeselectComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerDoctor', component: RegisterDoctorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashBoardComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'chat/:id' , component: ChatComponent},
  { path: 'acceptReject/:number' , component: AcceptRejectComponent},
  { path: 'registration' , component: RegistrationComponent},
  { path: 'chatRooms' , component: ChatRoomsComponent},
  { path: 'profile/:number' , component: ProfileComponent},
  { path: 'ambulance-requests' , component: AmbulanceRequestsComponent},
  { path: 'help/:number' , component: HelpComponent},
  { path: 'notify' , component: NotifyComponent},
  { path: 'docs' , component: DocsComponent},
  { path: 'nearby' , component: NearbyComponent},
  { path: 'nearby/npolice' , component: NpoliceComponent},
  { path: 'nearby/nhospital' , component: NhospitalComponent},
  { path: 'nearby/nclinics' , component: NclinicsComponent},
  { path: 'nearby/npharmacy' , component: NpharmacyComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ModeselectComponent,
	RegisterComponent,
	RegisterDoctorComponent,
	LoginComponent,
	DashBoardComponent,
	ChatComponent,
	AcceptRejectComponent,
	RegistrationComponent,
	ChatRoomsComponent,
	ProfileComponent,
	AmbulanceRequestsComponent,
	HelpComponent,
	NotifyComponent,
	NearbyComponent,
	NhospitalComponent,
	NpoliceComponent,
	NpharmacyComponent,
	NclinicsComponent,
	DocsComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
	FormsModule,
	ReactiveFormsModule,
	RouterModule.forRoot(routes),
	AngularFireModule.initializeApp(environment.firebase),
	AngularFirestoreModule.enablePersistence(),
	AngularFireDatabaseModule,
	AngularFireAuthModule,
	AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBg_lKOLRJvR43krGz6ufB3dekGlsACRDI'
    })
	],
  providers: [DataService,CanActivateViaAuthGuard,ChatService,RemediesService],
  bootstrap: [AppComponent]
})

export class AppModule { }
