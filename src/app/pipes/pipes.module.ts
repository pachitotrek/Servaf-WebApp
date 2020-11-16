import { NgModule } from '@angular/core';
import { ImagenPipe } from './images.pipe';
import { SafePipe } from './safe.pipe';
import { DownloadPipe } from './download.pipe';




@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    SafePipe,
    DownloadPipe
  ],
  exports: [
    ImagenPipe,
    SafePipe
  ]
})
export class PipesModule { }