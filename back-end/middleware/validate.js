import { z } from 'zod';

export const registerSchema = z.object({
    nome: z.string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(40, 'Nome deve ter no máximo 40 caracteres')
        .optional(),
    email: z.string()
        .email('Email inválido')
        .max(100, 'Email deve ter no máximo 100 caracteres'),
    senha: z.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .max(100, 'Senha deve ter no máximo 100 caracteres'),
    tema: z.string()
        .max(10, 'Tema deve ter no máximo 10 caracteres')
        .optional(),
    notificacoes: z.string()
        .max(1, 'Notificações deve ter no máximo 1 caractere')
        .optional(),
    hora_notificacao: z.string()
        .max(10, 'Hora de notificação deve ter no máximo 10 caracteres')
        .optional()
});

export const loginSchema = z.object({
    email: z.string()
        .email('Email inválido'),
    senha: z.string()
        .min(1, 'Senha é obrigatória')
});

export const updateUserSchema = z.object({
    nome: z.string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(40, 'Nome deve ter no máximo 40 caracteres')
        .optional(),
    email: z.string()
        .email('Email inválido')
        .max(100, 'Email deve ter no máximo 100 caracteres')
        .optional(),
    senha: z.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .max(100, 'Senha deve ter no máximo 100 caracteres')
        .optional(),
    tema: z.string()
        .max(10, 'Tema deve ter no máximo 10 caracteres')
        .optional(),
    notificacoes: z.string()
        .max(1, 'Notificações deve ter no máximo 1 caractere')
        .optional(),
    hora_notificacao: z.string()
        .max(10, 'Hora de notificação deve ter no máximo 10 caracteres')
        .optional()
});

export const createTaskSchema = z.object({
    nome: z.string()
        .min(1, 'Nome é obrigatório')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .optional(),
    descricao: z.string()
        .min(1, 'Descrição é obrigatória'),
    status: z.string()
        .max(20, 'Status deve ter no máximo 20 caracteres')
        .optional(),
    concluida: z.boolean()
        .optional()
        .default(false),
    data: z.string()
        .datetime({ message: 'Data inválida' })
        .or(z.date())
        .optional(),
    lembrete: z.string()
        .max(100, 'Lembrete deve ter no máximo 100 caracteres')
        .optional(),
    FK_USUARIO_id: z.number()
        .int('ID do usuário deve ser um número inteiro')
        .positive('ID do usuário deve ser positivo')
        .optional() 
});

export const updateTaskSchema = z.object({
    id: z.number()
        .int('ID deve ser um número inteiro')
        .positive('ID deve ser positivo'),
    nome: z.string()
        .min(1, 'Nome não pode estar vazio')
        .max(100, 'Nome deve ter no máximo 100 caracteres')
        .optional(),
    descricao: z.string()
        .min(1, 'Descrição não pode estar vazia')
        .optional(),
    status: z.string()
        .max(20, 'Status deve ter no máximo 20 caracteres')
        .optional(),
    concluida: z.boolean()
        .optional(),
    data: z.string()
        .datetime({ message: 'Data inválida' })
        .or(z.date())
        .optional(),
    lembrete: z.string()
        .max(100, 'Lembrete deve ter no máximo 100 caracteres')
        .optional()
});

export const createListSchema = z.object({
    nome: z.string()
        .min(1, 'Nome é obrigatório')
        .max(40, 'Nome deve ter no máximo 40 caracteres'),
    itens: z.string()
        .max(255, 'Itens deve ter no máximo 255 caracteres')
        .optional(),
    FK_USUARIO_id: z.number()
        .int('ID do usuário deve ser um número inteiro')
        .positive('ID do usuário deve ser positivo')
        .optional(), 
    FK_TAREFA_id: z.number()
        .int('ID da tarefa deve ser um número inteiro')
        .positive('ID da tarefa deve ser positivo')
        .optional()
        .nullable()
});

export const updateListSchema = z.object({
    id: z.number()
        .int('ID deve ser um número inteiro')
        .positive('ID deve ser positivo'),
    nome: z.string()
        .min(1, 'Nome não pode estar vazio')
        .max(40, 'Nome deve ter no máximo 40 caracteres')
        .optional(),
    itens: z.string()
        .max(255, 'Itens deve ter no máximo 255 caracteres')
        .optional(),
    FK_TAREFA_id: z.number()
        .int('ID da tarefa deve ser um número inteiro')
        .positive('ID da tarefa deve ser positivo')
        .optional()
        .nullable()
});

export const idParamSchema = z.object({
    id: z.string()
        .regex(/^\d+$/, 'ID deve ser um número')
        .transform(Number)
});

export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            console.log('Validando body:', req.body);
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log('Erro de validação Zod:', error.errors);
                return res.status(400).json({
                    error: 'Dados inválidos',
                    message: 'Os dados fornecidos não são válidos',
                    details: error.errors?.map(err => ({
                        campo: err.path.join('.'),
                        mensagem: err.message
                    })) || []
                });
            }
            console.error('Erro na validação do body:', error);
            return res.status(500).json({
                error: 'Erro na validação',
                message: 'Erro ao processar os dados'
            });
        }
    };
};

export const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse(req.params);
            req.params = validatedData;
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: 'Parâmetros inválidos',
                    message: 'Os parâmetros fornecidos não são válidos',
                    details: error.errors?.map(err => ({
                        campo: err.path.join('.'),
                        mensagem: err.message
                    })) || []
                });
            }
            console.error('Erro na validação dos parâmetros:', error);
            return res.status(500).json({
                error: 'Erro na validação',
                message: 'Erro ao processar os parâmetros'
            });
        }
    };
};

export const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse(req.query);
            req.query = validatedData;
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: 'Query inválida',
                    message: 'Os parâmetros de query fornecidos não são válidos',
                    details: error.errors?.map(err => ({
                        campo: err.path.join('.'),
                        mensagem: err.message
                    })) || []
                });
            }
            console.error('Erro na validação da query:', error);
            return res.status(500).json({
                error: 'Erro na validação',
                message: 'Erro ao processar a query'
            });
        }
    };
};
