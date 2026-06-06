# Scalability Note

## Current Architecture
- **Monolithic Backend**: Django 6.0.5 + Django REST Framework (DRF) handling all business logic, user management, and core API endpoints.
- **Frontend**: Single Page Application (SPA) built using React and Vite, hosted separately and communicating via RESTful APIs.
- **Relational Database**: PostgreSQL database storing user profiles, skills, reviews, offers, and requests.
- **Caching & Throttle Storage**: Single-node Redis cache (`django-redis`) utilized for key-value caching and tracking rate-limiting throttle states.
- **File-based Logging**: Standard Django loggers configured to write to a single file (`skillbridge.log`) on the server's disk.

---

## Potential Bottlenecks
1. **Database Contention**: Under high concurrent traffic, frequent write operations (such as creating skill requests, offers, and reviews) can lead to PostgreSQL lock contention and slow queries.
2. **N+1 Query Problems**: Inefficient Django ORM querying in DRF serializers can cause excessive roundtrips to the database when retrieving nested relationships (e.g. users and their associated skills).
3. **Synchronous Request Processing**: Heavy or long-running tasks executed synchronously in Django views block request threads, degrading overall application throughput.
4. **Single-Node Redis Caching**: Storing throttle states and cache in a single non-clustered Redis instance makes it a single point of failure (SPOF) and memory bottleneck.
5. **Disk I/O Logging**: Synchronously writing verbose `INFO` level logs to a local disk file (`skillbridge.log`) introduces substantial I/O latency under peak load and poses a disk space exhaustion risk.

---

## Future Improvements
1. **Query Optimization**:
   - Utilize `.select_related()` and `.prefetch_related()` in views and viewsets to eliminate N+1 queries.
   - Implement database indexing on frequently searched fields like `skills.name` and foreign keys.
2. **Database Scaling**:
   - Establish PostgreSQL read/write replication, routing read queries to replica databases and writes to the primary database.
   - Introduce connection pooling (e.g., via PgBouncer) to efficiently handle high connection spikes.
3. **Asynchronous Background Processing**:
   - Deploy a task queue like **Celery** with Redis or RabbitMQ as the message broker.
   - Offload non-blocking operations (e.g. sending notifications, processing reviews/ratings, email dispatches) from the main request-response cycle.
4. **Horizontal Scaling & Load Balancing**:
   - Containerize both backend and frontend applications using Docker.
   - Deploy multiple stateless container instances of the Django backend behind an Nginx or AWS Application Load Balancer (ALB).
5. **Centralized Logging**:
   - Migrate from local file-based logging (`FileHandler`) to a centralized logging system (e.g., ELK Stack, Grafana Loki, or AWS CloudWatch) to prevent local disk I/O bottlenecks.
