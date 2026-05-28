import { Express, Request, Response } from 'express';

interface AnalyticsService {
  getCountryInsights(country: string): Promise<unknown>;
  getAverageSalaryByJobTitle(params: {
    country: string;
    jobTitle: string;
  }): Promise<unknown>;
}

export function registerAnalyticsRoutes(
  app: Express,
  service: AnalyticsService,
): void {
  app.get(
    '/api/analytics/country/:country',
    async (req: Request, res: Response) => {
      const country = String(req.params.country);

      const insights = await service.getCountryInsights(country);

      res.status(200).json(insights);
    },
  );
  app.get('/api/analytics/country', async (_req: Request, res: Response) => {
    const insights = await service.getCountryInsights('');

    res.status(200).json(insights);
  });

  app.get('/api/analytics/job-title', async (req: Request, res: Response) => {
    const country = String(req.query.country);
    const jobTitle = String(req.query.jobTitle);

    const result = await service.getAverageSalaryByJobTitle({
      country,
      jobTitle,
    });

    res.status(200).json(result);
  });
}
