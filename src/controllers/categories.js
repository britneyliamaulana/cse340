import {
  getAllCategories,
  getCategoryById,
  getCategoryProjects,
  getProjectCategories,
  updateCategoryAssignments
} from "../models/categories.js";

import { getProjectDetails } from "../models/projects.js";

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = "Service Categories";

  res.render("categories", { title, categories });
};


const showCategoryDetailsPage = async (req, res) => {
  const id = req.params.id;

  const category = await getCategoryById(id);
  const projects = await getCategoryProjects(id);

  res.render("category", {
    title: category.name,
    category,
    projects,
  });
};

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getProjectCategories(projectId);

  const title = "Assign Categories to Project";

  res.render("assign-categories", {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories
  });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const selectedCategoryIds = req.body.categoryIds || [];

  const categoryIdsArray = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];

  await updateCategoryAssignments(projectId, categoryIdsArray);

  req.flash("success", "Categories updated successfully.");

  res.redirect(`/project/${projectId}`);
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
};