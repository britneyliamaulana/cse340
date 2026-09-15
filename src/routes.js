import express from "express";

import { showHomePage } from "./controllers/index.js";
import { showProjectsPage } from "./controllers/projects.js";
import { showCategoriesPage } from "./controllers/categories.js";
import { testErrorPage } from "./controllers/errors.js";
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
} from "./controllers/organizations.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", showProjectsPage);
router.get("/categories", showCategoriesPage);

// Error testing route
router.get("/test-error", testErrorPage);

router.get("/organization/:id", showOrganizationDetailsPage);

export default router;