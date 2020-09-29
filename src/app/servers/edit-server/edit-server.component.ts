import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { canDeActivateComponent } from './can-deactivate.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, canDeActivateComponent {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute,
    private router: Router) { }
    
  canDeActivate(): boolean | Observable<boolean> | Promise<boolean>{
    if(!this.allowEdit)
      return true;
    else{
      if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved)
      {
        return confirm('Do you want to discard the changes?');
      }
      else return true;
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.allowEdit = params['allowEdit'] === 'true' ? true : false;
      }
    );

    this.route.fragment.subscribe(
      fragment => {
      }
    );

    this.route.params.subscribe(
      params => {
        this.server = this.serversService.getServer(params['id'] ? +params['id'] : 1);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
