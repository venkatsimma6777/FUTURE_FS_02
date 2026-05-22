const express = require("express");

const router = express.Router();

const {
  createLead,
  getLeads,
  updateLeadStatus,
} = require("../controllers/leadController");

// GET all leads
router.get("/", getLeads);

// CREATE lead
router.post("/", createLead);

// UPDATE lead status
router.put("/:id", updateLeadStatus);

module.exports = router;