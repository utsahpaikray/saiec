import { TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router'
import { provideMockStore } from '@ngrx/store/testing'
import { SiteRouteSegments } from '@pages/site/site-route-segments.enum'
import { applicationFeature } from '@stores/application/application.state'
import { Applications } from '@stores/application/interfaces/application.interface'
import { ApplicationsGuard } from './appliactions.guard'

describe('ApplicationsGuard', () => {
  let guard: ApplicationsGuard
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplicationsGuard,
        provideMockStore({
          initialState: {
            [applicationFeature.name]: {
              availableApplications: {
                [Applications.Home]: {
                  enabled: true
                },
                [Applications.Settings]: {
                  enabled: false
                }
              }
            }
          }
        }),
        {
          provide: Router,
          useValue: {
            createUrlTree: jest.fn(() => new UrlTree())
          }
        }
      ]
    })

    guard = TestBed.inject(ApplicationsGuard)
    router = TestBed.inject(Router)
  })

  it('should return true when the application is enabled', () => {
    const route = {
      data: {
        module: Applications.Home
      }
    } as unknown as ActivatedRouteSnapshot

    guard.canActivate(route).subscribe((result) => {
      expect(result).toBe(true)
    })
  })

  it('should return a UrlTree when the application is disabled', () => {
    const route = {
      data: {
        module: Applications.Settings
      }
    } as unknown as ActivatedRouteSnapshot

    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeInstanceOf(UrlTree)
      expect(router.createUrlTree).toHaveBeenCalledWith([
        './',
        SiteRouteSegments.AccessDenied
      ])
    })
  })

  it('should throw an error when the module is not a valid application', () => {
    const route = {
      data: {
        module: 'invalidModule'
      }
    } as unknown as ActivatedRouteSnapshot

    expect(() => guard.canActivate(route)).toThrowError(
      'Invalid application module'
    )
  })
})
