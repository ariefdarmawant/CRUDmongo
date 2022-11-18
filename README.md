# CRUD Mongo

Built using express and mongodb.

## Features

1. User CRUD
2. Login
3. Refresh Token

Detailed API implementation can be seen at `/api-docs`

Step to run this app:

1. Clone this repository
2. Run `docker-compose up` on the cloned directory
3. Go to `kubernetes` directory and run `kubectl apply -f express-deployment.yaml,express-service.yaml,mongodb-deployment.yaml,mongodb-service.yaml` **FIXED and working**

## Architecture Diagram:

![Architecture Diagram](/Architecture%20Diagram.drawio.png)]

## Kubernetes Running:

![Kubernetes Running](/running%20kubernetes.png)]
