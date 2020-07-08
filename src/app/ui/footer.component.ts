import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer-dark pt-3 ">
      <footer>
        <div class="container">
          <div class="row">

            <div class="col-sm-6 col-md-3 item">
              <h3>A Propos</h3>
              <ul>
                <li><a href="#">Qui sommes nous?</a></li>
                <li><a href="#">L'equipe</a></li>
                <li><a href="#">Devenir partenaire</a></li>
              </ul>
            </div>
            <div class="col-md-6 item text">
              <h3>La courgette</h3>
              <p>Vend troc ou partage ton surplus pour une consomation plus saine et responsable   </p>
            </div>
            <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
          </div>
          <p >La courgette © 2020</p>
        </div>
      </footer>
    </div>

  `,
  styles: [
    `.footer-dark {
      padding: 50px 0;
      color: #f0f9ff;

      background-color: rgba(0,87,14,0.7);
    }

    .footer-dark h3 {
      margin-top: 0;
      margin-bottom: 12px;
      font-weight: bold;
      font-size: 16px;
    }

    .footer-dark ul {
      padding: 0;
      list-style: none;
      line-height: 1.6;
      font-size: 14px;
      margin-bottom: 0;
    }

    .footer-dark ul a {
      color: inherit;
      text-decoration: none;
      opacity: 0.6;
    }

    .footer-dark ul a:hover {
      opacity: 0.8;
    }

    @media (max-width:767px) {
      .footer-dark .item:not(.social) {
        text-align: center;
        padding-bottom: 20px;
      }
    }

    .footer-dark .item.text {
      margin-bottom: 36px;
    }

    @media (max-width:767px) {
      .footer-dark .item.text {
        margin-bottom: 0;
      }
    }

    .footer-dark .item.text p {
      opacity: 0.6;
      margin-bottom: 0;
    }

    .footer-dark .item.social {
      text-align: center;
    }

    @media (max-width:991px) {
      .footer-dark .item.social {
        text-align: center;
        margin-top: 20px;
      }
    }

    .footer-dark .item.social > a {
      font-size: 20px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      display: inline-block;
      text-align: center;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.4);
      margin: 0 8px;
      color: #fff;
      opacity: 0.75;
    }

    .footer-dark .item.social > a:hover {
      opacity: 0.9;
    }

    .footer-dark .copyright {
      text-align: center;
      padding-top: 24px;
      opacity: 0.3;
      font-size: 13px;
      margin-bottom: 0;
    }
    `
  ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
