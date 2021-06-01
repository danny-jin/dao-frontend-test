import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';

import { ToastrService } from './toastr.service';
import { AuthState } from '../models/auth';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WalletProviderService {

  metamaskLabel = 'metamask';
  kovanChainId = 42;
  provider: ethers.providers.Web3Provider | null = null;
  signer: ethers.Signer | null = null;
  activeWallet = '';

  authState: AuthState | null = null;
  authState$: BehaviorSubject<AuthState | null> = new BehaviorSubject<AuthState | null>(this.authState);

  constructor(
    private toastr: ToastrService
  ) {
  }

  setAuthState(authState: any): void {
    this.authState = authState;
    this.authState$.next(this.authState);
  }

  balanceFormat(amount: string, digitLengh: number): string {
    if (amount.includes('.')) {
      const parts = amount.split('.');
      return parts[0] + '.' + parts[1].slice(0, digitLengh);
    }
    return amount;
  }

  async recoverConnection(): Promise<void> {
    const providerType = localStorage.getItem('providerType');
    if (providerType === this.metamaskLabel) {
      await this.injectMetamaskWallet();
    }
  }

  async injectMetamaskWallet(): Promise<void> {
    if (typeof window.ethereum !== undefined) {
      await window.ethereum.enable()
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      await this.setProvider(this.provider)
    }
  }

  async onNetworkChange() {
    window.ethereum.on('close', () => this.setAuthState(null));
    window.ethereum.on('networkChanged', async (chainId: any) => {
      if (Number(chainId) !== this.kovanChainId) {
        this.toastr.danger('Please switch kovan network!', 'Warning');
        this.setAuthState(null);
        return;
      } else {
        await this.injectMetamaskWallet();
      }
    });
    window.ethereum.on('accountsChanged', async (accounts: any) => {
      if (accounts) {
        await this.injectMetamaskWallet();
      }
    });
  }

  async setProvider(web3Provider: any) {
    this.signer = web3Provider.getSigner();
    if (!this.signer) {
      return;
    }
    const activeWallet = await this.signer.getAddress();
    const network = await web3Provider.getNetwork();
    const rawBalance = await this.signer.getBalance();
    const balance = this.balanceFormat(ethers.utils.formatUnits(rawBalance), 6);
    if (network.chainId !== this.kovanChainId) {
      this.toastr.danger('Please switch kovan network!', 'Warning');
      return;
    }
    localStorage.setItem('providerType', this.metamaskLabel);
    this.toastr.success('Metamask Wallet connected!', 'Success');
    this.setAuthState({
      wallet: this.activeWallet,
      signer: this.signer,
      balance,
      chainId: network.chainId,
      chainName: (network.name == 'homestead') ? 'Mainnet' : network.name,
      provider: web3Provider,
    });
  }

}
