import {
  Component, OnInit, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, Input
} from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';

@Component({
  selector: 'form-wizard',
  template:
  `<div class="card">
    <div class="card-header">
      <ul class="nav2 nav2-justified">
        <li class="nav2-item" *ngFor="let step of steps" [ngClass]="{'active': step.isActive, 'enabled': !step.isDisabled, 'disabled': step.isDisabled, 'completed': isCompleted}">
          <a (click)="goToStep(step)">{{step.title}}</a>
        </li>
      </ul>
    </div>
    <div class="card-block">
      <ng-content></ng-content>
    </div>
    <div class="card-footer" [hidden]="isCompleted">
        <button type="button" class="btn btn-default btn-lg float-left" (click)="previous()" [hidden]="!hasPrevStep || !activeStep.showPrev">{{prevText}}</button>
        <button type="button" class="btn btn-default btn-lg float-right" (click)="next()" [disabled]="!activeStep.isValid" [hidden]="!hasNextStep || !activeStep.showNext">{{nextText}}</button>        <button type="button" class="btn btn-default btn-lg float-right" (click)="complete()" [disabled]="!activeStep.isValid" [hidden]="hasNextStep">{{doneText}}</button>
    </div>
  </div>`
  ,
  styles: [
`
[hidden] {
    display: none!important;
}

.float-left {
    float: left!important;
}

.float-right {
    float: right!important;
}

/* nav */

.nav2 a:not([href]):not([tabindex]), a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {
    color: inherit;
    text-decoration: none;
}
.nav2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav2-justified .nav2-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 100%;
      -ms-flex: 1 1 100%;
          flex: 1 1 100%;
  text-align: center;
}
/* card */
.card {
  position: relative;
  display: block;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.card-block {
  padding: 15px;
}
.card-block:before, .card-block:after {
  content: "";
  display: table;
}
.card-block:after {
  clear: both;
}

.card-title {
  margin-top: 0;
  margin-bottom: 10px;
}

.card-subtitle {
  margin-top: -10px;
  margin-bottom: 0;
}

.card-text:last-child {
  margin-bottom: 0;
}

.card-link:hover {
  text-decoration: none;
}
.card-link + .card-link {
  margin-left: 15px;
}

.card > .list-group:first-child .list-group-item:first-child {
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}
.card > .list-group:last-child .list-group-item:last-child {
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.card-header {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
.card-header:before, .card-header:after {
  content: "";
  display: table;
}
.card-header:after {
  clear: both;
}
.card-header:first-child {
  border-radius: 4px 4px 0 0;
}

.card-footer {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
}
.card-footer:before, .card-footer:after {
  content: "";
  display: table;
}
.card-footer:after {
  clear: both;
}
.card-footer:last-child {
  border-radius: 0 0 4px 4px;
}

.card-header-tabs {
  margin-right: -5px;
  margin-bottom: -10px;
  margin-left: -5px;
  border-bottom: 0;
}

.card-header-pills {
  margin-right: -5px;
  margin-left: -5px;
}

.card-primary {
  background-color: #337ab7;
  border-color: #337ab7;
}
.card-primary .card-header,
.card-primary .card-footer {
  background-color: transparent;
}

.card-success {
  background-color: #5cb85c;
  border-color: #5cb85c;
}
.card-success .card-header,
.card-success .card-footer {
  background-color: transparent;
}

.card-info {
  background-color: #5bc0de;
  border-color: #5bc0de;
}
.card-info .card-header,
.card-info .card-footer {
  background-color: transparent;
}

.card-warning {
  background-color: #f0ad4e;
  border-color: #f0ad4e;
}
.card-warning .card-header,
.card-warning .card-footer {
  background-color: transparent;
}

.card-danger {
  background-color: #d9534f;
  border-color: #d9534f;
}
.card-danger .card-header,
.card-danger .card-footer {
  background-color: transparent;
}

.card-outline-primary {
  background-color: transparent;
  border-color: #337ab7;
}

.card-outline-secondary {
  background-color: transparent;
  border-color: #ccc;
}

.card-outline-info {
  background-color: transparent;
  border-color: #5bc0de;
}

.card-outline-success {
  background-color: transparent;
  border-color: #5cb85c;
}

.card-outline-warning {
  background-color: transparent;
  border-color: #f0ad4e;
}

.card-outline-danger {
  background-color: transparent;
  border-color: #d9534f;
}

.card-inverse .card-header,
.card-inverse .card-footer {
  border-color: rgba(255, 255, 255, 0.2);
}
.card-inverse .card-header,
.card-inverse .card-footer,
.card-inverse .card-title,
.card-inverse .card-blockquote {
  color: #fff;
}
.card-inverse .card-link,
.card-inverse .card-text,
.card-inverse .card-subtitle,
.card-inverse .card-blockquote .blockquote-footer {
  color: rgba(255, 255, 255, 0.65);
}
.card-inverse .card-link:hover, .card-inverse .card-link:focus {
  color: #fff;
}

.card-blockquote {
  padding: 0;
  margin-bottom: 0;
  border-left: 0;
}

.card-img {
  border-radius: .25em;
}

.card-img-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 15px;
}

.card-img-top {
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}

.card-img-bottom {
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
`,
    '.card { height: 100%; }',
    '.card-header { background-color: #fff; padding: 0; font-size: 18px; line-height:1.5 }',
    '.card-block { overflow-y: auto; }',
    '.card-footer { background-color: #fff; border-top: 0 none; }',
    '.nav2-item { padding: 12px 0px; border-bottom: 8px solid #ccc; }',
    '.active { font-weight: bold; color: black; border-bottom-color: #1976D2 !important; }',
    '.enabled { cursor: pointer; border-bottom-color: rgb(88, 162, 234); }',
    '.disabled { color: #ccc; }',
    '.completed { cursor: default; }'
  ]
})
export class WizardComponent implements OnInit, AfterContentInit {
  @ContentChildren(WizardStepComponent)
  wizardSteps: QueryList<WizardStepComponent>;

  private _steps: Array<WizardStepComponent> = [];
  private _isCompleted: boolean = false;

  @Input() nextText: string = "Next";
  @Input() prevText: string = "Previous";
  @Input() doneText: string = "Done";

  @Output()
  onStepChanged: EventEmitter<WizardStepComponent> = new EventEmitter<WizardStepComponent>();

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.wizardSteps.forEach(step => this._steps.push(step));
    this.steps[0].isActive = true;
  }

  private get steps(): Array<WizardStepComponent> {
    return this._steps.filter(step => !step.hidden);
  }

  private get isCompleted(): boolean {
    return this._isCompleted;
  }

  private get activeStep(): WizardStepComponent {
    return this.steps.find(step => step.isActive);
  }

  private set activeStep(step: WizardStepComponent) {
    if (step !== this.activeStep && !step.isDisabled) {
      this.activeStep.isActive = false;
      step.isActive = true;
      this.onStepChanged.emit(step);
    }
  }

  private get activeStepIndex(): number {
    return this.steps.indexOf(this.activeStep);
  }

  private get hasNextStep(): boolean {
    return this.activeStepIndex < this.steps.length - 1;
  }

  private get hasPrevStep(): boolean {
    return this.activeStepIndex > 0;
  }

  goToStep(step: WizardStepComponent) {
    if (!this.isCompleted) {
      this.activeStep = step;
    }
  }

  next() {
    if (this.hasNextStep) {
      let nextStep: WizardStepComponent = this.steps[this.activeStepIndex + 1];
      this.activeStep.onNext.emit();
      nextStep.isDisabled = false;
      this.activeStep = nextStep;
    }
  }

  previous() {
    if (this.hasPrevStep) {
      let prevStep: WizardStepComponent = this.steps[this.activeStepIndex - 1];
      this.activeStep.onPrev.emit();
      prevStep.isDisabled = false;
      this.activeStep = prevStep;
    }
  }

  complete() {
    this.activeStep.onComplete.emit();
    this._isCompleted = true;
  }

}
