/* eslint-disable */
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Directive, Signal, ViewContainerRef, computed, effect, inject, input, signal } from '@angular/core';
import { environment } from '@environments/environment';

export type ModuleConfig = { [key: string]: unknown };
export interface LoadRemoteComponentDirectiveConfig {
  type: keyof typeof remoteModuleRegistry
  data?: ModuleConfig
}

const remoteModuleRegistry = environment.microFrontends
const isComponentEntry = (config: ModuleConfig): config is { componentName: string } => config?.hasOwnProperty('componentName') || false;
const remoteModuleSignal = <T>(remoteModuleEntry$: Signal<{ exposedModule: string, remoteEntry: string } | null >): Signal<T|null> => {
  const result = signal<T|null>(null);

  effect(() => {
    const remoteModuleEntry = remoteModuleEntry$()
    if (!remoteModuleEntry) {
      return;
    }
    loadRemoteModule<T>({
      type: 'module',
      exposedModule: remoteModuleEntry.exposedModule,
      remoteEntry: remoteModuleEntry.remoteEntry,
    }).then(module => result.set(module))
  })

  return result;
}

@Directive({
  standalone: true,
  selector: '[loadRemoteComponent]'
})
export class LoadRemoteComponentDirective {
  private readonly viewContainerRef = inject(ViewContainerRef);
  
  public config = input<LoadRemoteComponentDirectiveConfig | null>(null);
  private remoteModuleEntry$ = computed(() => {
    const config = this.config();
    if (!config) {
      return null;
    }
    return remoteModuleRegistry[config.type] ?? null;
  })
  public remoteModule$ = remoteModuleSignal<any>(this.remoteModuleEntry$);
  public componentRef$ = computed(() => {
    const remoteModule = this.remoteModule$();
    const remoteModuleEntry = this.remoteModuleEntry$();
    if (!remoteModule || !remoteModuleEntry) {
      return null;
    }
    if (!isComponentEntry(remoteModuleEntry)) {
      throw new Error('Only components can be loaded');
    }
    this.viewContainerRef.clear();
    return this.viewContainerRef.createComponent(remoteModule[remoteModuleEntry.componentName]);
  })

  protected setIntupts = effect(() => {
    const componentRef = this.componentRef$();
    const config = this.config();
    if (!componentRef) {
      return;
    }
    if (!config?.data) {
      return;
    }
    Object.entries(config.data).forEach((entry) => {
      componentRef.setInput(...entry);
    })
  })

}