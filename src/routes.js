import express from "express";

import { showHomePage } from "./controllers/index.js";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showEditOrganizationForm,
  processEditOrganizationForm,
  
} from "./controllers/organizations.js";

import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation,
  showEditProjectForm,
  processEditProjectForm,
} from "./controllers/projects.js";

import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
} from "./controllers/categories.js";

import { testErrorPage } from "./controllers/errors.js";



const router = express.Router();

router.get("/", showHomePage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", showProjectsPage);
router.get("/new-project", showNewProjectForm);
router.get("/project/:id", showProjectDetailsPage);
router.get(
  "/assign-categories/:projectId",
  showAssignCategoriesForm
);
router.post(
  "/assign-categories/:projectId",
  processAssignCategoriesForm
);
router.get("/categories", showCategoriesPage);

// Routes to edit a project
router.get("/edit-project/:id", showEditProjectForm);

router.post("/edit-project/:id", processEditProjectForm);



// Error testing route
router.get("/test-error", testErrorPage);

router.get("/organization/:id", showOrganizationDetailsPage);

// Route to display the edit organization form
router.get("/edit-organization/:id", showEditOrganizationForm);

router.get("/new-organization", showNewOrganizationForm);

// Route to handle the edit organization form submission

router.post(
  "/edit-organization/:id",
  organizationValidation,
  processEditOrganizationForm
);

router.post(
  "/new-organization",
  organizationValidation,
  processNewOrganizationForm
);

router.post(
  "/new-project",
  projectValidation,
  processNewProjectForm
);

router.get("/category/:id", showCategoryDetailsPage);

router.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
  });
});

export default router;