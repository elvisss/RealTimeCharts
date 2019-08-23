import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { ChartModel } from "../_interfaces/ChartModel";

@Injectable({
  providedIn: "root"
})
export class SignalRService {
  public data: ChartModel[];

  private hubConnection: HubConnection;

  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5001/chart")
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch(err => console.log("Error while starting connection: " + err));
  };

  public addTransferChartDataListener = () => {
    this.hubConnection.on("transferchartdata", data => {
      this.data = data;
      console.log(data);
    });
  };
}
