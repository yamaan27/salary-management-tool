import { Express, Request, Response } from 'express';

interface EmployeeService {
  createEmployee(payload: unknown): Promise<unknown>;
  getEmployees(params: {
    page: number;
    limit: number;
    search?: string;
    country?: string;
  }): Promise<unknown>;
  getEmployeeById(id: string): Promise<unknown>;
  updateEmployee(id: string, payload: unknown): Promise<unknown>;
  deleteEmployee(id: string): Promise<void>;
}

export function registerEmployeeRoutes(
  app: Express,
  service: EmployeeService,
): void {
  app.post('/api/employees', async (req: Request, res: Response) => {
    const employee = await service.createEmployee(req.body);
    res.status(201).json(employee);
  });

  app.get('/api/employees', async (req: Request, res: Response) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);

    const result = await service.getEmployees({
      page,
      limit,
      search: req.query.search as string | undefined,
      country: req.query.country as string | undefined,
    });

    res.status(200).json(result);
  });

  app.get('/api/employees/:id', async (req: Request, res: Response) => {
const id = String(req.params.id);
const employee = await service.getEmployeeById(id);
    res.status(200).json(employee);
  });

  app.patch('/api/employees/:id', async (req: Request, res: Response) => {
const id = String(req.params.id);

const employee = await service.updateEmployee(id, req.body);

    res.status(200).json(employee);
  });

  app.delete('/api/employees/:id', async (req: Request, res: Response) => {
const id = String(req.params.id);
await service.deleteEmployee(id);
    res.status(204).send();
  });
}
