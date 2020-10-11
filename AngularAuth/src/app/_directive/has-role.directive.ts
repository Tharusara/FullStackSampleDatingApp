import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../_shared/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
@Input() appHasRole: string[];
isVisible = false;
  constructor(private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private auth: AuthService) { }
ngOnInit() {
  const userRoles = this.auth.decodedToken.role as Array<string>;
  // if no roles clear the view
  if (!userRoles) {
    this.viewContainer.clear();
  }

  // if user has roles need to render element
  if (this.auth.roleMatch(this.appHasRole)) {
    if (!this.isVisible) {
      this.isVisible = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.isVisible = false;
      this.viewContainer.clear();
    }
  }
}
}
