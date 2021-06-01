import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ethers, utils } from 'ethers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommonService } from '../core/services/common.service';
import { WalletProviderService } from '../core/services/wallet-provider.service';
import { contractForm } from '../core/data/form-label';
import { AuthState } from '../core/models/auth';
import { ToastrService } from '../core/services/toastr.service';
import { testContractAddress, testContractAbi, minTestContractGasLimit } from '../core/data/contract';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  prefix = contractForm.prefix;
  authState: AuthState | null = null;
  form: FormGroup = this.fb.group({
    gasLimit: [minTestContractGasLimit, [Validators.required, Validators.min(minTestContractGasLimit)]],
    amount: [0.1, Validators.required],
  });

  private unsubscribeAll$: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private walletProviderService: WalletProviderService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.walletProviderService.authState$.pipe(takeUntil(this.unsubscribeAll$)).subscribe(async (authState: AuthState | null) => {
      this.authState = authState;
    });
  }

  async payMe(): Promise<void> {
    if (!this.authState) {
      this.toastr.danger('Please connect wallet!', 'Warning');
    }
    if (this.form.invalid) {
      this.commonService.findInvalidField(this.form, contractForm, this.prefix);
      return;
    }
    const amount = this.form.value.amount;
    const overrides = {
      from: this.authState?.wallet,
      gasLimit: this.form.value?.gasLimit,
      value: utils.parseUnits(String(amount),'ether').toHexString(),
    };
    try {
      let contract = new ethers.Contract(testContractAddress, testContractAbi, this.authState?.signer);
      await contract.payMe(overrides);
    } catch (e) {
      this.toastr.danger(e.message, 'Error');
    }
  }

  async connectMetamask(): Promise<void> {
    await this.walletProviderService.injectMetamaskWallet();
  }

}
