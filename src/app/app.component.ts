import { Component, OnInit } from '@angular/core';

import { WalletProviderService } from './core/services/wallet-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private walletProviderService: WalletProviderService
  ) {
  }

  async ngOnInit() {
    await this.walletProviderService.recoverConnection();
    await this.walletProviderService.onNetworkChange();
  }

}
