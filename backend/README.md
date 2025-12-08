# daily-achievements-tracker
Modern Web Technologies course project

Phase 2:
1. Created data folder with sample data for entities
2. Made an outline for modular architecture in "modules" folder 
3. Applied application-level middleware in server.js
4. Added validation error check middleware (shared/middlewares/check-validation.js), which later implemented in middlewares in all modules
5. Added Schema models for entities and connected the database
6. Wrote routes logic and mounted them to the server

Phase 4 and 5:
1. Steamlined some routes (fetching a random cookie now automatically adds the fetched fortune cookie to user's collectedCookies, added a post route for fetching all fortune cookied based on userId)
2. Created React appliaction for frontend
3. Added home page which displays navbar and tasks fetched from backend
4.