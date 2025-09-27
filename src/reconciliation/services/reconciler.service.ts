import { Injectable } from '@nestjs/common';
import {
  SourceTransaction,
  SystemTransaction,
} from '../../types/transaction.types';
import { ReconciliationResult } from '../models/reconciliation-result.model';

@Injectable()
export class ReconcilerService {
  reconcile(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _sourceTransactions: SourceTransaction[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _systemTransactions: SystemTransaction[],
  ): ReconciliationResult {
    // TODO: Implement reconciliation logic
    // 1. Find missing transactions in internal system
    // 2. Find missing transactions in source
    // 3. Find mismatched amounts/statuses
    throw new Error('Not implemented yet');
  }
}
