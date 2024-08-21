import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';

export const initialData = {
  projects: [
    {
      id: '5d19f8a0-91c7-4c25-857e-ff51c82c3a73',
      name: 'Sistema de Gestión de Inventarios',
      description:
        'Proyecto para desarrollar un sistema de gestión de inventarios para empresas tecnológicas.',
      createdAt: new Date('2024-08-01T10:00:00Z'),
      updatedAt: new Date('2024-08-18T11:30:00Z'),
      createdBy: '1fbc2d10-8bdf-42c3-bf5f-15cd1b930b57',
    },
    {
      id: '7e61d8bb-0ec2-4e10-8f53-dc5b1e2a2ff5',
      name: 'Aplicación de Control de Proyectos',
      description:
        'Desarrollo de una aplicación para controlar y gestionar proyectos de desarrollo de software.',
      createdAt: new Date('2024-08-05T11:00:00Z'),
      updatedAt: null,
      createdBy: '5f3a4a67-f6a9-4b8f-9b56-76e5c67e9c7a',
    },
    {
      id: '94d24d38-3f2b-432f-8502-2e3c9cf9f85f',
      name: 'Plataforma de E-learning',
      description:
        'Plataforma para el aprendizaje en línea, enfocada en cursos de programación y tecnología.',
      createdAt: new Date('2024-08-10T12:00:00Z'),
      updatedAt: null,
      createdBy: '3c1b1fa9-13bb-4f3c-923d-6a6f7cf930c4',
    },
  ] as Project[],
  users: [
    {
      id: '1fbc2d10-8bdf-42c3-bf5f-15cd1b930b57',
      name: 'Mateo García',
      username: 'mateo.garcia',
      email: 'mateo.garcia@gmail.com',
      password: null,
      createdAt: new Date('2024-07-25T09:00:00Z'),
      updatedAt: null,
      project: undefined,
    },
    {
      id: 'f2f1482f-3439-4b08-8e60-32f6d7b97ef2',
      name: 'Sofía Martínez',
      username: 'sofia.martinez',
      email: 'sofia.martinez@gmail.com',
      password: null,
      createdAt: new Date('2024-07-26T09:00:00Z'),
      updatedAt: null,
      project: undefined,
    },
    {
      id: '5f3a4a67-f6a9-4b8f-9b56-76e5c67e9c7a',
      name: 'Javier Fernández',
      username: 'javier.fernandez',
      email: 'javier.fernandez@gmail.com',
      password: null,
      createdAt: new Date('2024-07-27T09:00:00Z'),
      updatedAt: null,
      project: undefined,
    },
    {
      id: 'ac4b7a2f-14a1-4f3c-a83e-5a312c14dba1',
      name: 'Valentina Rojas',
      username: 'valentina.rojas',
      email: 'valentina.rojas@gmail.com',
      password: null,
      createdAt: new Date('2024-07-28T09:00:00Z'),
      updatedAt: new Date('2024-08-18T11:30:00Z'),
      project: undefined,
    },
    {
      id: '3c1b1fa9-13bb-4f3c-923d-6a6f7cf930c4',
      name: 'Camilo Torres',
      username: 'camilo.torres',
      email: 'camilo.torres@gmail.com',
      password: null,
      createdAt: new Date('2024-07-29T09:00:00Z'),
      updatedAt: null,
      project: undefined,
    },
    {
      id: '7c872d82-c504-4b2d-a6e5-bd8fcbe0c9bb',
      name: 'Isabella Vega',
      username: 'isabella.vega',
      email: 'isabella.vega@gmail.com',
      password: null,
      createdAt: new Date('2024-07-30T09:00:00Z'),
      updatedAt: null,
      project: undefined,
    },
  ] as User[],
  tasks: [
    {
      id: '1f88f1a7-4b6e-4d7a-9671-bba2fca4b5b9',
      title: 'Diseño de base de datos',
      description: 'Crear el modelo de datos para la gestión de inventarios.',
      createdAt: new Date('2024-08-02T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-08-20'),
      isCompleted: true,
      user: undefined,
      project: undefined,
    },
    {
      id: '0a87b5c3-9050-4d4d-844e-ea4f5279fbed',
      title: 'Implementación del backend',
      description:
        'Desarrollar la API para el sistema de gestión de inventarios.',
      createdAt: new Date('2024-08-03T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-08-22'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: '30e93b47-76e4-4519-a1db-3ec5fbed28d5',
      title: 'Desarrollo del frontend',
      description:
        'Crear la interfaz de usuario para el sistema de gestión de inventarios.',
      createdAt: new Date('2024-08-04T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-08-25'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: '4c8d5f5c-2b6b-4912-8579-02c1d03098c1',
      title: 'Pruebas del sistema',
      description:
        'Realizar pruebas de integración y unitarias del sistema de inventarios.',
      createdAt: new Date('2024-08-05T09:00:00Z'),
      updatedAt: new Date('2024-10-11T11:30:00Z'),
      deadline: new Date('2024-08-28'),
      isCompleted: true,
      user: undefined,
      project: undefined,
    },
    {
      id: '78d7e4a7-4835-4238-8b16-8c0bfae1b3c3',
      title: 'Despliegue en producción',
      description: 'Configurar el sistema en el servidor de producción.',
      createdAt: new Date('2024-08-06T09:00:00Z'),
      updatedAt: new Date('2024-11-11T11:30:00Z'),
      deadline: new Date('2024-08-30'),
      isCompleted: true,
      user: undefined,
      project: undefined,
    },
    {
      id: '71b21328-e2fa-4bc2-b3d9-f88d8b28a85d',
      title: 'Configuración del entorno de desarrollo',
      description: 'Establecer el entorno para el desarrollo de la aplicación.',
      createdAt: new Date('2024-08-07T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-08-25'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: 'd5d282e5-0fcb-4739-9f78-ced62c191e59',
      title: 'Desarrollo de la lógica de negocio',
      description:
        'Implementar la lógica de negocio para la gestión de proyectos.',
      createdAt: new Date('2024-08-08T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-08-27'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: '9796c22e-fd41-4d2e-9e0e-3c5c8f4b23c9',
      title: 'Desarrollo del módulo de usuarios',
      description:
        'Crear el módulo para la gestión de usuarios en la aplicación.',
      createdAt: new Date('2024-08-09T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-08-28'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: '04c1a8b7-e2b5-4c99-8c84-638d85d72d69',
      title: 'Pruebas de la aplicación',
      description:
        'Realizar pruebas de integración y funcionales en la aplicación.',
      createdAt: new Date('2024-08-10T09:00:00Z'),
      updatedAt: new Date('2024-08-18T11:30:00Z'),
      deadline: new Date('2024-08-29'),
      isCompleted: true,
      user: undefined,
      project: undefined,
    },
    {
      id: 'f7c23169-76e8-4ff5-85ed-dc2b2a2a19d4',
      title: 'Implementación del módulo de cursos',
      description:
        'Desarrollar el módulo para la gestión de cursos en la plataforma.',
      createdAt: new Date('2024-08-11T09:00:00Z'),
      updatedAt: new Date('2024-08-18T11:30:00Z'),
      deadline: new Date('2024-09-01'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: 'b34585eb-4a5e-4f1f-9e4c-3cbe9c5eb7a5',
      title: 'Configuración del sistema de pagos',
      description:
        'Integrar un sistema de pagos en la plataforma de E-learning.',
      createdAt: new Date('2024-08-12T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-09-05'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: 'a0b8f5df-91a7-4383-bb85-80f2f04f8a5b',
      title: 'Diseño de la interfaz de usuario',
      description: 'Crear el diseño visual para la plataforma de E-learning.',
      createdAt: new Date('2024-08-13T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-09-03'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: 'f112d7b3-ea4b-41d6-8764-8f2d5ec2558f',
      title: 'Implementación del módulo de exámenes',
      description:
        'Desarrollar el módulo de exámenes para evaluar a los estudiantes.',
      createdAt: new Date('2024-08-14T09:00:00Z'),
      updatedAt: new Date('2024-08-18T11:30:00Z'),
      deadline: new Date('2024-09-07'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: 'e1e7b4f1-d8a9-41d5-bf35-e8a1cb2a7ff8',
      title: 'Despliegue de la plataforma',
      description:
        'Configurar y desplegar la plataforma en un entorno de producción.',
      createdAt: new Date('2024-08-15T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-09-10'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
    {
      id: '53b8f635-b907-4218-b048-74e2f5a8e51c',
      title: 'Documentación del proyecto',
      description:
        'Crear la documentación completa del proyecto de E-learning.',
      createdAt: new Date('2024-08-16T09:00:00Z'),
      updatedAt: null,
      deadline: new Date('2024-09-12'),
      isCompleted: false,
      user: undefined,
      project: undefined,
    },
  ] as Task[],
};
