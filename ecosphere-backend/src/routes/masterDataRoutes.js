import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { createOne, getAll, getOne, updateOne, deleteOne } from '../controllers/handlerFactory.js';

// Models
import { Department } from '../models/Department.js';
import { Category } from '../models/Category.js';
import { EmissionFactor } from '../models/EmissionFactor.js';
import { ProductEsgProfile } from '../models/ProductEsgProfile.js';
import { EnvironmentalGoal } from '../models/EnvironmentalGoal.js';
import { EsgPolicy } from '../models/EsgPolicy.js';
import { Badge } from '../models/Badge.js';
import { Reward } from '../models/Reward.js';

// Setup generic router factory mapping
const setupCrudRoutes = (router, path, Model) => {
    // GET all and POST (create) => require at least employee for getting, esg_manager for creating
    router.route(path)
        .get(protect, getAll(Model))
        .post(protect, authorize(['super_admin', 'esg_manager']), createOne(Model));

    // GET one, PUT, DELETE => strict protections
    router.route(`${path}/:id`)
        .get(protect, getOne(Model))
        .put(protect, authorize(['super_admin', 'esg_manager']), updateOne(Model))
        .delete(protect, authorize(['super_admin']), deleteOne(Model));
};

const router = express.Router();

setupCrudRoutes(router, '/departments', Department);
setupCrudRoutes(router, '/categories', Category);
setupCrudRoutes(router, '/emission-factors', EmissionFactor);
setupCrudRoutes(router, '/product-profiles', ProductEsgProfile);
setupCrudRoutes(router, '/environmental-goals', EnvironmentalGoal);
setupCrudRoutes(router, '/policies', EsgPolicy);
setupCrudRoutes(router, '/badges', Badge);
setupCrudRoutes(router, '/rewards', Reward);

export default router;
