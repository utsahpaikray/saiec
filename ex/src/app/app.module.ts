import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader'

import { BottomSheetModule } from '@components/bottom-sheet/bottom-sheet.module'
import { ComponentsModule } from '@components/components.module'
import { ConfirmationModalModule } from '@components/confirmation-modal/confirmation-modal.module'
import { FileUploadListModule } from '@components/file-upload-list/file-upload-list.module'
import { AuthConfigModule } from '@core/auth/auth-config.module'
import { AzureBlobStorageService } from '@core/azure/azure-blob-storage.service'
import { GraphQLModule } from '@core/graphql/graphql.module'
import { httpInterceptorProviders } from '@core/http-interceptors'
import { preLoadLang } from '@core/locale/locale.initializer'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

import { icons } from '@assets/icons'
import { environment } from '@environments/environment'
import { HeaderComponent } from '@features/header/header.component'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { ToastModule } from '@shared/components/toasts/toast.module'
import { DragAndDropModule } from '@shared/directives/drag-and-drop/drag-and-drop.module'
import '@vanderlande-gravity/components'
import { IconProvider } from '@vanderlande-gravity/components'
import gravityIcons from '@vanderlande-gravity/core/dist/icons/icons.json'
import { ApolloModule } from 'apollo-angular'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CurrentUserStoreModule } from './stores/current-user/current-user.module'

// We have to filter out duplicated icons
const allIcons = [...icons, ...gravityIcons].filter(
  (icon, index, self) => self.findIndex((i) => i.name === icon.name) === index
)

IconProvider.registerIcons([...allIcons])

@NgModule({
  declarations: [AppComponent],
  providers: [httpInterceptorProviders, AzureBlobStorageService, preLoadLang],
  imports: [
    ApolloModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AngularSvgIconModule.forRoot(),
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: './assets/icons.json'
    }),
    AuthConfigModule,
    GraphQLModule,
    HttpClientModule,
    ComponentsModule,
    HeaderComponent,
    TranslocoRootModule,
    BottomSheetModule,
    FileUploadListModule,
    ConfirmationModalModule,
    StoreModule.forRoot({
      router: routerReducer
    }),
    EffectsModule.forRoot([]),
    !environment.production
      ? [
          StoreDevtoolsModule.instrument({
            logOnly: environment.production,
            connectInZone: true
          })
        ]
      : [],
    CurrentUserStoreModule,
    DragAndDropModule,
    StoreRouterConnectingModule.forRoot(),
    ToastModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
