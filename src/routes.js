import express from "express";

import { checkLogin } from "./middleware/auth.js";
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
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
} from "./controllers/categories.js";

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
} from "./controllers/users.js";


import { testErrorPage } from "./controllers/errors.js";



const router = express.Router();

router.get("/", showHomePage);

router.get("/organizations", checkLogin, showOrganizationsPage);
router.get("/projects", checkLogin, showProjectsPage);

router.get("/dashboard", requireLogin, showDashboard);

router.get("/project/:id", showProjectDetailsPage);


router.get(
    "/assign-categories/:projectId",
    requireRole("admin"),
    showAssignCategoriesForm
);

router.post(
    "/assign-categories/:projectId",
    requireRole("admin"),
    processAssignCategoriesForm
);





router.get("/categories", checkLogin, showCategoriesPage);


router.get(
    "/edit-category/:id",
    requireRole("admin"),
    showEditCategoryForm
);

router.post(
    "/edit-category/:id",
    requireRole("admin"),
    categoryValidation,
    processEditCategoryForm
);

// Routes to edit a project


router.get("/register", showUserRegistrationForm);
router.post("/register", processUserRegistrationForm);
router.get("/login", showLoginForm);
router.post("/login", processLoginForm);
router.get("/logout", processLogout);





// Error testing route
router.get("/test-error", testErrorPage);

router.get("/organization/:id", showOrganizationDetailsPage);

// Route to display the edit organization form


router.get("/new-organization", requireRole("admin"), showNewOrganizationForm);

router.post(
    "/new-organization",
    requireRole("admin"),
    organizationValidation,
    processNewOrganizationForm
);


router.get(
    "/edit-organization/:id",
    requireRole("admin"),
    showEditOrganizationForm
);

router.post(
    "/edit-organization/:id",
    requireRole("admin"),
    organizationValidation,
    processEditOrganizationForm
);

router.get(
    "/edit-project/:id",
    requireRole("admin"),
    showEditProjectForm
);

router.post(
    "/edit-project/:id",
    requireRole("admin"),
    projectValidation,
    processEditProjectForm
);

router.get(
    "/new-category",
    requireRole("admin"),
    showNewCategoryForm
);

router.post(
    "/new-category",
    requireRole("admin"),
    categoryValidation,
    processNewCategoryForm
);

// Route to handle the edit organization form submission




router.get(
    "/new-project",
    requireRole("admin"),
    showNewProjectForm
);

router.post(
    "/new-project",
    requireRole("admin"),
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