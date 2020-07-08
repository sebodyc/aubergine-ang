import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UiService } from './ui/ui.service';
import {ToastrService} from "ngx-toastr";

import Swal from "sweetalert2";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'aubergine';
  flash = null;
  loading = false;

  constructor(
    public ui : UiService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit() {


    Swal.fire({
      title: 'Bienvenu sur la courgette.fr',
      imageUrl: '../../assets/images/la courgette.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      timer: 2000
    })

    // this.toastr.success('Bienvenue sur notre site');
    // this.ui.flash.subscribe((flash) => {
    //   this.flash = flash;
    //   window.setTimeout(() => (this.flash = null), 3000);
    // });

    this.ui.loadingSubject.subscribe((value) => {
      this.loading = value;
      this.chRef.detectChanges();
    });
  }



}
