import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {ComponentLoaderDirective} from './component-loader.directive';
import {CompComponent} from './comp.component';
import {ComponentLoaderItem} from './componentLoader-item';
import {ComponentLoaderService} from './component-loader.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-component-loader',
  templateUrl: './component-loader.component.html',
  styleUrls: ['./component-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentLoaderComponent implements OnInit, OnDestroy {
  // @Input() ads: ComponentLoaderItem[];
  private sub;
  private componentName;
  private title;
  ads: ComponentLoaderItem[];
  activeComponent: ComponentLoaderItem;
  currentAdIndex = -1;
  @ViewChild(ComponentLoaderDirective, {static: true}) componentHost: ComponentLoaderDirective;
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentLoaderService: ComponentLoaderService
  ) { }

  ngOnInit(): void {


    this.ads = this.componentLoaderService.getComponents();

    this.sub = this.route
      .data
      .subscribe(v => {
        this.componentName = v.component;
        this.title = v.text;
        this.activeComponent = this.componentLoaderService.getComponent(this.componentName);
        this.loadComponent(); });

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  loadComponent(): void {

    const componentLoaderItem = this.activeComponent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentLoaderItem.component);
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    // @ts-ignore
    const componentRef = viewContainerRef.createComponent<CompComponent>(componentFactory);
    componentRef.instance.data = componentLoaderItem.data;
  }
}
