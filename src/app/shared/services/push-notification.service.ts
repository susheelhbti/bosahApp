import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Platform, AlertController, NavController } from '@ionic/angular';
import { PushDevice } from '../model/push-notification.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  private pushDevice = new BehaviorSubject<PushDevice>(null);

  constructor(
    private push: Push,
    private platform: Platform,
    private alertCtrl: AlertController,
    private navCtrl: NavController) {
    this.platform.ready().then(() => {
      this.initPushNotification();
    });
  }

  public getPushDevice(): Observable<PushDevice> {
    return this.pushDevice.asObservable();
  }

  private setPushDevice(data) {
    this.pushDevice.next(data);
  }

  private initPushNotification() {
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    // to initialize push notifications

    const options: PushOptions = {
      android: {
        senderID: '423137540298',
        sound: 'true',
        vibrate: 'true',
        icon: 'ic_launcher'
      },
      ios: {
        alert: 'true',
        badge: 'true',
        sound: 'true'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    // Delete a channel (Android O and above)
    // this.push.deleteChannel('bosahChannel').then(() => console.log('Channel deleted'));

    // Return a list of currently configured channels
    this.push.listChannels().then((channels) => {
      console.log('List of channels', channels);
    });

    this.push.createChannel({
      id: 'bosahChannel',
      description: 'bosah App Notification.',
      sound: 'pulse',
      vibration: true,
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 4
    }).then(() => console.log('Channel created'));

    pushObject.on('notification').subscribe((notification: any) => {
      // tslint:disable-next-line: no-debugger
      debugger;
      console.log('Received a notification', notification);
      // if(notification.additionalData.redirectAction.length>0) {
      //this.navCtrl.navigateRoot('/messaging', { animated: true, animationDirection: 'forward' });
     // this.navCtrl.push('messaging');
      this.navCtrl.navigateForward('./messaging/messaging.module#MessagingPageModule');

      // }
      // if (notification.additionalData.foreground) {
      // } 
      // else {
      // }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      this.setPushDevice(registration);
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}
