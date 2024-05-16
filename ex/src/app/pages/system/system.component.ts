import { Component, inject } from '@angular/core'
import {
  BaseMapStrategy,
  GraphNodeElement,
  GraphRouteElement,
  MapManagerService,
  PointerSelectionStrategy,
  RectangleSelectionElement,
  RectangleSelectionStrategy,
  TopologySelectors
} from '@map-features'
import { SVGMapReadyEvent } from '@vanderlande-gravity/components'
import { Store, select } from '@ngrx/store'
import { TopologyActions } from '@map-features'
import { ActivatedRoute } from '@angular/router'
import { filter, map, switchMap } from 'rxjs'
import { SitesService } from '@core/sites/sites.service'

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent {
  private readonly baseMapStrategy = inject(BaseMapStrategy)
  private readonly pointerSelectionStrategy = inject(PointerSelectionStrategy)
  private readonly rectangleSelectionStrategy = inject(
    RectangleSelectionStrategy
  )
  private readonly mapManagerService = inject(MapManagerService)
  private readonly store = inject(Store)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly sitesService = inject(SitesService)

  private readonly siteId$ = this.activatedRoute.params.pipe(
    map((params) => params.siteId),
    filter(Boolean)
  )

  public readonly sourceId$ = this.siteId$.pipe(
    switchMap((siteId) => this.sitesService.getSourceIdById(siteId)),
    map((id) => parseInt(id, 10)),
    filter((id) => !isNaN(id))
  )

  public readonly topologyError$ = this.store.pipe(
    select(TopologySelectors.selectTopologyError),
    map((error) => error?.message)
  )

  public initializeMap(event: SVGMapReadyEvent, siteId: number) {
    const map = event.detail.element
    this.mapManagerService.connectMap(map)
    this.mapManagerService.registerElement(GraphNodeElement)
    this.mapManagerService.registerElement(GraphRouteElement)
    this.mapManagerService.registerElement(RectangleSelectionElement)
    this.mapManagerService.registerStrategy(this.baseMapStrategy)
    this.mapManagerService.registerStrategy(this.pointerSelectionStrategy)
    this.mapManagerService.registerStrategy(this.rectangleSelectionStrategy)
    this.mapManagerService.connectStrategy(this.baseMapStrategy.id)
    this.mapManagerService.connectStrategy(this.pointerSelectionStrategy.id)
    this.mapManagerService.connectStrategy(this.rectangleSelectionStrategy.id)
    this.store.dispatch(TopologyActions.getTopology({ id: siteId }))
  }
}
