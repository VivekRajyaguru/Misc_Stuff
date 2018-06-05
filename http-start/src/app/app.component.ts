import { Component } from '@angular/core';
import { ServerService } from './server.sevice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serverSerice.getAppName();
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(private serverSerice: ServerService) {

  }

  onSave() {
    this.serverSerice.storeServers(this.servers).subscribe(
      (data) => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('completed');
      }
    );
  }

  onGetServer() {
    this.serverSerice.getServer().subscribe(
      (data) => {
        console.log(data);
        this.servers = data; 
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('getCall Completed');
      }
    );
  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
