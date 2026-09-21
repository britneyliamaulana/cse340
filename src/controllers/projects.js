import {
  getUpcomingProjects,
  getProjectDetails,
} from "../models/projects.js";

import { getProjectCategories } from "../models/categories.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

  res.render("projects", {
    title: "Upcoming Service Projects",
    projects,
  });
};

const showProjectDetailsPage = async (req, res) => {
  const id = req.params.id;

  const project = await getProjectDetails(id);
  const categories = await getProjectCategories(id);

  res.render("project", {
    title: project.title,
    project,
    categories,
  });
};

export {
  showProjectsPage,
  showProjectDetailsPage,
};