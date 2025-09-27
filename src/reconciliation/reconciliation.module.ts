import { Module } from '@nestjs/common';
import { ReconciliationController } from './reconciliation.controller';
import { ReconciliationService } from './reconciliation.service';
import { CsvReaderService } from './services/csv-reader.service';
import { ReconcilerService } from './services/reconciler.service';

@Module({
  controllers: [ReconciliationController],
  providers: [ReconciliationService, CsvReaderService, ReconcilerService],
  exports: [ReconciliationService], // Export if needed by other modules
})
export class ReconciliationModule {}
