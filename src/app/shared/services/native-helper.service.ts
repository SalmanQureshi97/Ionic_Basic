import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
//import { Camera } from '@ionic-native/camera';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NativeHelperService {
  private imageSrc: string;
  cameraOptions4Gallery = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    encodingType: this.camera.EncodingType.JPEG,
    correctOrientation: true,
  };

  cameraOptions4Camera = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,

    targetWidth: 1000,
    targetHeight: 1000,
    correctOrientation: true,
  };
  constructor(
    private navCtrl: NavController,
    private camera: Camera,
    private webview: WebView
  ) {}

  public async addNewToGallery() {
    // Take a photo
    // const capturedPhoto = await Camera.getPhoto({
    //   resultType: CameraResultType.Uri,
    //   source: CameraSource.Camera,
    //   quality: 100,
    // });
  }

  openGallery() {
    return this.camera.getPicture(this.cameraOptions4Gallery).then(
      (file_uri) => {
        console.log('File Uri', file_uri);
        return this.webview.convertFileSrc(file_uri);
      },
      (err) => {
        return err;
      }
    );
  }

  openCamera() {
    return this.camera.getPicture(this.cameraOptions4Camera).then(
      (file_uri) => {
        return this.webview.convertFileSrc(file_uri);
      },
      (err) => {
        return err;
      }
    );
  }
}
