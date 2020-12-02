import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {ComponentLoaderDirective} from './component-loader.directive';
import {CompComponent} from './comp.component';
import {ComponentLoaderItem} from './componentLoader-item';
import {ComponentLoaderService} from './component-loader.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslationService} from '../service/translation.service';
import {Tools} from '../tools/function';

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
    private componentLoaderService: ComponentLoaderService,
    private router: Router, private tl: TranslationService,
    private tools: Tools
  ) {
    // this.tools.showTitle();
  }

  ngOnInit(): void {

    this.ads = this.componentLoaderService.getComponents();

    this.sub = this.route
      .data
      .subscribe(v => {
        this.title = v.text;
        if (v && v.component){
          this.componentName = v.component;
          this.activeComponent = this.componentLoaderService.getComponent(this.componentName);
          if(!this.activeComponent){
            // this.tools.hideTitle();
            this.activeComponent = this.componentLoaderService.getComponent('not_found');
          }
          this.loadComponent();
        }
});

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
