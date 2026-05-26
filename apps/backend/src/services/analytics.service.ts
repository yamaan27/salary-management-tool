import { AnalyticsRepository } from '../repositories/analytics.repository';

export class AnalyticsService {
  constructor(private readonly repository: AnalyticsRepository) {}
}
