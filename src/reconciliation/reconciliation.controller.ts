import {
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReconciliationService } from './reconciliation.service';
import { ReconciliationResult } from './models/reconciliation-result.model';

@Controller('reconciliation')
export class ReconciliationController {
  constructor(private readonly reconciliationService: ReconciliationService) {}

  @Post('process')
  async processReconciliation(): Promise<ReconciliationResult> {
    try {
      return await this.reconciliationService.reconcileTransactions();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Reconciliation failed: ${message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('health')
  healthCheck(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'Reconciliation service is running',
    };
  }
}
